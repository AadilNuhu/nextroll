-- Create visitors table for anonymous visitor tracking
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL UNIQUE,
    first_visit TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitors_first_visit ON visitors(first_visit);
