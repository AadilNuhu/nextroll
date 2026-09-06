import { Pool } from '@neondatabase/serverless';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { visitor_id } = req.body;

  // Validate visitor_id is a valid UUID
  if (!visitor_id || typeof visitor_id !== 'string') {
    return res.status(400).json({ error: 'Invalid visitor_id' });
  }

  // UUID v4 format validation (simple check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(visitor_id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const DATABASE_URL = process.env.DATABASE_URL;

    if (!DATABASE_URL) {
      console.error('DATABASE_URL not configured');
      // Don't expose error to client, just silently fail
      return res.status(200).json({ success: false });
    }

    // Create a connection pool for this request
    const pool = new Pool({ connectionString: DATABASE_URL });

    // Insert visitor, silently ignore if already exists (UNIQUE constraint)
    await pool.query(
      'INSERT INTO visitors (visitor_id) VALUES ($1) ON CONFLICT (visitor_id) DO NOTHING;',
      [visitor_id]
    );

    // Close the connection
    await pool.end();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    // Silently fail - don't block the user or show errors
    return res.status(200).json({ success: false });
  }
}
