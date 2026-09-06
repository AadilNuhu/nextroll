# Visitor Tracking Setup Guide

## Overview
Your web app now has anonymous visitor tracking. It tracks unique browsers/people using a random UUID stored locally.

**Important**: This system fails silently when offline. The app will work perfectly whether or not visitor tracking succeeds.

---

## Setup Steps

### 1. Create a Neon Database (Free)

1. **Sign up** at [neon.tech](https://neon.tech) (free tier available)
2. **Create a new project**
3. **Copy your connection string** (looks like: `postgresql://username:password@host/database`)
4. **Keep this safe** - you'll need it for the next step

### 2. Add DATABASE_URL to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. **Add a new variable**:
   - Name: `DATABASE_URL`
   - Value: (paste your Neon connection string from Step 1)
   - Environments: Select **All** (Production, Preview, Development)
4. **Save and redeploy** your application

### 3. Run the Database Migration

Once DATABASE_URL is set, run this SQL in your Neon dashboard (or any SQL client):

```sql
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL UNIQUE,
    first_visit TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitors_first_visit ON visitors(first_visit);
```

Or use the migration file: `migrations/01_create_visitors_table.sql`

### 4. Install Dependencies (Local Development)

If developing locally:
```bash
cd client
npm install
```

The package.json has been updated with `@neondatabase/serverless` which is required for the API.

### 5. Deploy

Push your changes to GitHub:
```bash
git add .
git commit -m "Add anonymous visitor tracking"
git push
```

Vercel will auto-deploy. Once deployed, the tracking will start automatically.

---

## How It Works

### Browser Side
- When the app loads, `trackVisitor()` runs in `src/main.tsx`
- If visitor has never been to your site:
  - Generates a random UUID using `crypto.randomUUID()`
  - Saves it to `localStorage` with key `visitor_id`
  - Sends it to `/api/track-visitor`
- If visitor already has a UUID in localStorage:
  - Just sends the existing UUID to the API
  - The API's UNIQUE constraint prevents duplicate records

### Server Side
- API endpoint: `api/track-visitor.ts`
- Receives the UUID
- Inserts into `visitors` table
- If UUID already exists (UNIQUE constraint), silently ignores it
- Always returns `200 OK` (never breaks the app)

### Offline Behavior
- If no internet: `fetch()` fails silently, app continues normally
- No error messages shown to users
- No blocking of app functionality
- If user comes online later, their first visit (from offline) won't be tracked, but they will be tracked on their next visit

---

## Verify It's Working

### Check Your Database

Run these queries in Neon:

**Total unique visitors:**
```sql
SELECT COUNT(*) AS unique_visitors FROM visitors;
```

**All visitors with timestamp:**
```sql
SELECT visitor_id, first_visit 
FROM visitors 
ORDER BY first_visit DESC;
```

**Visitors in the last 7 days:**
```sql
SELECT COUNT(*) 
FROM visitors 
WHERE first_visit >= NOW() - INTERVAL '7 days';
```

### Check Browser Storage (Dev Tools)

1. Open your app in a browser
2. Press `F12` to open Developer Tools
3. Go to **Application → Local Storage**
4. Look for key `visitor_id` - should show a UUID like `a1b2c3d4-e5f6-4abc-9def-0123456789ab`

### Test Offline

1. Open your app
2. Check DevTools → Application → Local Storage (should have `visitor_id`)
3. Go to DevTools → Network tab
4. Check "Offline" checkbox
5. Refresh the page
6. The app should load normally (as it's a PWA)
7. Uncheck "Offline" and refresh
8. The visitor tracking request will succeed

---

## Files Changed

### Frontend
- `src/main.tsx` - Added `trackVisitor()` call
- `src/services/visitor.ts` - New service for visitor tracking
- `client/package.json` - Added `@neondatabase/serverless` dependency

### Backend
- `api/track-visitor.ts` - New Vercel serverless function

### Database
- `migrations/01_create_visitors_table.sql` - Migration for `visitors` table

---

## Privacy Notes

What IS tracked:
- Random anonymous UUID
- First visit timestamp

What is NOT tracked:
- User identity
- IP address
- Email or personal info
- Browsing behavior
- User activity
- Device fingerprints
- Location
- Analytics

The only identifier is a random UUID that tells you "this browser visited", nothing more.

---

## Troubleshooting

### Visitors not being recorded?

1. **Check DATABASE_URL is set** in Vercel settings
2. **Check the migration was run** - query `SELECT * FROM visitors LIMIT 1;` in Neon
3. **Check browser has localStorage** - DevTools → Application → Local Storage
4. **Check API is responding** - DevTools → Network tab → look for `track-visitor` request
5. **Check logs** - Vercel dashboard → Functions logs

### Getting "Connection refused" errors in Vercel logs?

- Make sure DATABASE_URL is in Vercel environment variables
- Make sure it's a valid Neon connection string
- Try reconnecting in Neon dashboard

### Offline visitors not being tracked?

This is by design. When offline:
- Visitor ID is saved to localStorage ✓
- API request fails silently (no internet) ✓
- App continues working ✓
- When they come online later and revisit, they'll be tracked ✓

---

## Query Examples

```sql
-- Total unique visitors
SELECT COUNT(*) FROM visitors;

-- Visitors per day
SELECT DATE(first_visit) as date, COUNT(*) as visitors
FROM visitors
GROUP BY DATE(first_visit)
ORDER BY date DESC;

-- Most recent visitors
SELECT visitor_id, first_visit
FROM visitors
ORDER BY first_visit DESC
LIMIT 10;

-- Visitor timeline
SELECT 
  first_visit,
  COUNT(*) OVER (ORDER BY first_visit) as cumulative_visitors
FROM visitors
ORDER BY first_visit;
```

---

## Next Steps

1. Set up Neon account and get DATABASE_URL ✓
2. Add DATABASE_URL to Vercel ✓
3. Run the SQL migration in Neon ✓
4. Push code to GitHub (auto-deploys to Vercel) ✓
5. Check Neon dashboard for visitor records ✓

That's it! No admin dashboard, no complex setup, just pure visitor counts.
