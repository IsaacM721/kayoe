-- Kayoe Excursiones -- PayPal reliability hardening
-- Apply with:
--   npx wrangler d1 execute kayoe-db --remote --file=./migrations/002_paypal_hardening.sql

-- Holds the tour/party details for a PayPal order between "create-order"
-- (before the customer pays) and "capture-order" (right after they approve).
-- The webhook (functions/api/paypal/webhook.ts) reads this table so that if
-- the customer's browser never calls capture-order back (closed tab, lost
-- connection, etc.), we can still reconstruct and save the booking once
-- PayPal confirms the payment actually completed -- instead of silently
-- losing a paid booking.
CREATE TABLE IF NOT EXISTS pending_orders (
    paypal_order_id TEXT PRIMARY KEY,
    tour_slug TEXT NOT NULL,
    tour_name TEXT NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1,
    children INTEGER NOT NULL DEFAULT 0,
    total_usd REAL,
    processed INTEGER NOT NULL DEFAULT 0, -- set to 1 once a booking row exists for this order
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Prevents two different code paths (the client's own capture-order call and
-- the webhook safety net) from ever inserting two booking rows for the same
-- PayPal order. NULLs (e.g. quote-only rows, if any ever exist here) are not
-- constrained by a partial unique index.
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_paypal_order_id
    ON bookings(paypal_order_id)
    WHERE paypal_order_id IS NOT NULL;
