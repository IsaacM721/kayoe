// Magna Watcher — server side. Works in Cloudflare Pages Functions and Workers.
//
// Needs two bindings on the site:
//   WATCH_KV        a KV namespace (events are stored as "w:YYYY-MM-DD")
//   PANEL_PASSWORD  a secret; the panel sends it as a Bearer token
// Optional vars:
//   WATCH_TZ_OFFSET    hours from UTC for "days" (default -4, Dominican Republic)
//   WATCH_REVIEW_KEYS  comma list of KV keys holding JSON review arrays to show in the panel
//
// Workers: at the top of fetch(), add
//   const w = await handleWatch(request, env, ctx); if (w) return w;
// Pages: functions/api/watch.js and functions/api/watch-stats.js re-export the handlers below.

const DAY_TTL = 60 * 60 * 24 * 400; // ~13 months
const MAX_PER_DAY = 3000;
const TYPES = ["view", "whatsapp", "email", "call", "form", "paypal", "review"];
const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|monitor/i;

function kv(env) {
  return env.WATCH_KV || env.REVIEWS_KV; // REVIEWS_KV: older installs (turisteandord.com)
}

function tzOffset(env) {
  const n = parseFloat(env.WATCH_TZ_OFFSET);
  return Number.isFinite(n) ? n : -4;
}

function dayKey(env, date) {
  return "w:" + new Date(date.getTime() + tzOffset(env) * 3600000).toISOString().slice(0, 10);
}

const clip = (v, n) => (typeof v === "string" ? v.slice(0, n) : v);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function addEvent(env, request, ev) {
  const store = kv(env);
  if (ev && ev.t === "booking") ev.t = "form"; // older watch.js name
  if (!store || !ev || !TYPES.includes(ev.t)) return;
  const ua = request.headers.get("user-agent") || "";
  if (BOTS.test(ua)) return;

  const now = new Date();
  const ip = request.headers.get("cf-connecting-ip") || "";
  // Anonymous visitor id per day: hash of ip + browser + day. No IP is stored.
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip + ua + now.toISOString().slice(0, 10))
  );
  const vid = [...new Uint8Array(hash).slice(0, 5)].map((b) => b.toString(16).padStart(2, "0")).join("");

  const row = {
    t: ev.t,
    ts: now.getTime(),
    p: clip(ev.p || "/", 120),
    l: clip(ev.l || "", 5),
    c: (request.cf && request.cf.country) || "",
    r: clip(ev.r || "", 80),
    v: vid,
    d: /mobile|android|iphone/i.test(ua) ? "m" : "d",
  };
  if (ev.x && typeof ev.x === "object") {
    const x = {};
    for (const [k, v] of Object.entries(ev.x).slice(0, 12)) x[clip(k, 20)] = clip(String(v), 120);
    row.x = x;
  }

  const key = dayKey(env, now);
  const list = (await store.get(key, "json")) || [];
  if (list.length >= MAX_PER_DAY) return;
  list.push(row);
  await store.put(key, JSON.stringify(list), { expirationTtl: DAY_TTL });
}

async function readDays(env, days) {
  const store = kv(env);
  const keys = [];
  const now = Date.now();
  for (let i = 0; i < days; i++) keys.push(dayKey(env, new Date(now - i * 86400000)));
  const lists = await Promise.all(keys.map((k) => store.get(k, "json")));
  return keys.map((k, i) => ({ day: k.slice(2), events: lists[i] || [] })).reverse();
}

function count(map, key, n = 1) {
  if (key) map[key] = (map[key] || 0) + n;
}
const top = (map, n = 8) =>
  Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ k, v }));

function summarize(list) {
  const s = { views: 0, visitors: 0, contacts: 0, whatsapp: 0, email: 0, call: 0, form: 0, paypal: 0, paypalTotal: 0, reviews: 0 };
  const seen = new Set();
  for (const { events } of list) {
    for (const e of events) {
      const t = e.t === "booking" ? "form" : e.t;
      if (t === "view") { s.views++; seen.add(e.v); }
      else if (t === "paypal") { s.paypal++; s.paypalTotal += parseFloat(e.x && e.x.amount) || 0; }
      else if (t === "review") s.reviews++;
      else if (t === "form") s.form++;
      else if (s[t] !== undefined) { s[t]++; s.contacts++; }
    }
  }
  s.visitors = seen.size;
  return s;
}

export async function onWatchPost({ request, env, waitUntil }) {
  try {
    const ev = JSON.parse(await request.text());
    waitUntil(addEvent(env, request, ev));
  } catch (_) {
    // ignore malformed beacons
  }
  return new Response(null, { status: 204 });
}

export async function onStatsGet({ request, env }) {
  const pass = env.PANEL_PASSWORD;
  const auth = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!pass || auth !== pass) return json({ error: "unauthorized" }, 401);
  if (!kv(env)) return json({ error: "WATCH_KV binding missing" }, 500);

  const url = new URL(request.url);
  const days = Math.min(Math.max(parseInt(url.searchParams.get("days")) || 30, 1), 90);
  const data = await readDays(env, days * 2); // this period + the one before, for comparison
  const current = data.slice(days);

  const pages = {}, countries = {}, refs = {}, devices = {}, langs = {};
  const series = [];
  const recent = [];
  for (const { day, events } of current) {
    const vs = new Set();
    let contacts = 0;
    const firstByVisitor = new Map();
    for (const e of events) {
      if (e.t === "view") {
        vs.add(e.v);
        count(pages, e.p.replace(/\.html$/, "").replace(/\/$/, "") || "/");
        count(refs, e.r || "directo");
        count(langs, e.l || "?");
        if (!firstByVisitor.has(e.v)) firstByVisitor.set(e.v, e);
      } else {
        if (e.t !== "review") contacts++;
        recent.push(e);
      }
    }
    for (const e of firstByVisitor.values()) { count(countries, e.c || "??"); count(devices, e.d); }
    series.push({ day, visitors: vs.size, contacts });
  }

  let reviews = [];
  const reviewKeys = (env.WATCH_REVIEW_KEYS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (reviewKeys.length) {
    const lists = await Promise.all(reviewKeys.map((k) => kv(env).get(k, "json")));
    reviews = lists.flatMap((l) => (Array.isArray(l) ? l : [])).slice(0, 12);
  }

  return json({
    days,
    now: Date.now(),
    totals: summarize(current),
    previous: summarize(data.slice(0, days)),
    series,
    pages: top(pages),
    countries: top(countries),
    refs: top(refs),
    devices,
    langs,
    recent: recent.sort((a, b) => b.ts - a.ts).slice(0, 40),
    reviews,
  });
}

// For Workers: returns a Response for watcher routes, or null to let the site handle the request.
export async function handleWatch(request, env, ctx) {
  const { pathname } = new URL(request.url);
  const waitUntil = (p) => (ctx && ctx.waitUntil ? ctx.waitUntil(p) : p);
  if (pathname === "/api/watch" && request.method === "POST") return onWatchPost({ request, env, waitUntil });
  if (pathname === "/api/watch-stats" && request.method === "GET") return onStatsGet({ request, env });
  return null;
}
