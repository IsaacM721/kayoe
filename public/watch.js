/* Magna Watcher: counts visits, contact clicks, form sends and payments for the owner's panel (/panel). */
(function () {
  var ignore = false;
  try { ignore = localStorage.getItem("tw-ignore") === "1"; } catch (e) {}
  var lang = (document.documentElement.lang || "").slice(0, 2).toLowerCase() || (/(^|\/)es(\/|$)|-es(\.html)?$/.test(location.pathname) ? "es" : "");

  function refHost() {
    try {
      var h = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
      return h === location.hostname.replace(/^www\./, "") ? "" : h;
    } catch (e) { return ""; }
  }

  function send(t, x) {
    if (ignore) return;
    var body = JSON.stringify({ t: t, p: location.pathname, l: lang, r: refHost(), x: x });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon("/api/watch", body)) return;
    } catch (e) {}
    fetch("/api/watch", { method: "POST", body: body, keepalive: true }).catch(function () {});
  }

  window.twTrack = send;

  // Called from each tour page's PayPal onApprove, after the payment is captured.
  window.twPaypal = function (d) {
    try {
      var pu = (d.purchase_units || [])[0] || {};
      var cap = ((pu.payments || {}).captures || [])[0] || {};
      var amount = (cap.amount || pu.amount || {}).value || (typeof getBookingTotal === "function" ? getBookingTotal() : "");
      var payer = d.payer || {};
      var name = payer.name ? (payer.name.given_name || "") + " " + (payer.name.surname || "") : "";
      var val = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
      var h1 = document.querySelector("h1");
      send("paypal", {
        id: d.id, amount: amount, status: cap.status || d.status || "",
        tour: pu.description || (h1 ? h1.textContent.trim() : document.title),
        name: name.trim(), email: payer.email_address || "",
        date: val("date"), adults: val("adults"), kids: val("children") || val("kids"), hotel: val("hotel")
      });
    } catch (e) {}
  };

  send("view");

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href");
    if (/wa\.me|whatsapp/i.test(h)) send("whatsapp", { from: (a.textContent || "").trim().slice(0, 40) || "botón" });
    else if (/^mailto:/i.test(h)) send("email");
    else if (/^tel:/i.test(h)) send("call");
  }, true);

  // Any form send (booking, quote, contact). Search boxes and review forms are skipped.
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f || /review|search|buscar|newsletter|finder|filter|filtro/i.test((f.id || "") + " " + (f.className || "")) || f.getAttribute("role") === "search") return;
    var name = f.id || f.getAttribute("data-project") || f.getAttribute("name") || f.getAttribute("aria-label") ||
      ((f.getAttribute("onsubmit") || "").match(/^\s*(\w+)\s*\(/) || [])[1] || (f.classList && f.classList[0]) || "form";
    var x = { form: name };
    var about = f.getAttribute("data-tour-name") || f.getAttribute("data-service-name") || f.getAttribute("data-product");
    if (about) x.tour = about.slice(0, 80);
    // Keep a few useful, non-sensitive fields (dates, people, product, service). Never passwords, cards or messages.
    var n = 0;
    Array.prototype.forEach.call(f.elements || [], function (el) {
      var k = (el.name || el.id || "").toLowerCase();
      if (!k || !el.value || n >= 6 || /pass|card|tarjeta|cvv|cvc|ssn|cedula|message|mensaje|comment/i.test(k) || el.type === "hidden" || el.type === "password") return;
      if (/date|fecha|adult|people|personas|pax|hotel|tour|service|servicio|product|producto|vehic|modelo|model|plan|qty|cantidad|budget|presupuesto|interes/.test(k)) { x[k.slice(0, 20)] = String(el.value).slice(0, 80); n++; }
    });
    send("form", x);
  }, true);
})();
