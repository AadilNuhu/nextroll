-- Simple visitor tracking table
CREATE TABLE IF NOT EXISTS visitors (
    visitor_id UUID PRIMARY KEY,
    first_visit TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_visitors_first_visit ON visitors(first_visit DESC);
