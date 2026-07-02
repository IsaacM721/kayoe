-- Kayoe Excursiones -- D1 schema
-- Already applied to the live kayoe-db database via the D1 console.
-- Kept here so the schema is reproducible, e.g.:
--   npx wrangler d1 execute kayoe-db --file=./migrations/001_initial.sql

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT UNIQUE NOT NULL,
    tour_id TEXT,
    tour_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    tour_date TEXT,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    language_pref TEXT,
    total_usd REAL,
    payment_status TEXT DEFAULT 'pending',
    paypal_order_id TEXT,
    special_requests TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tour_name TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    travel_date TEXT,
    group_size INTEGER,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference);
