/**
 * Anonymous visitor tracking service
 * 
 * Generates a unique UUID for each browser and sends it to the backend.
 * This function fails silently if there's no internet connection,
 * ensuring the app works fully offline without blocking.
 */

const VISITOR_ID_KEY = 'visitor_id';
const API_ENDPOINT = '/api/track-visitor';

/**
 * Get or create a visitor ID and send it to the tracking API.
 * This fails silently if offline - no user-facing errors.
 */
export const trackVisitor = async (): Promise<void> => {
  try {
    // Get existing visitor ID or create a new one
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      // Generate new UUID for this browser
      visitorId = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    // Send visitor ID to backend (fire and forget)
    // We don't wait for the response or handle errors
    // This ensures the app works fully offline
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitor_id: visitorId }),
    }).catch(() => {
      // Silently ignore errors (offline, network issues, etc.)
      // This is intentional - we never block the app
    });
  } catch (error) {
    // Silently ignore any errors (localStorage issues, crypto issues, etc.)
    console.debug('Visitor tracking error (ignored):', error);
  }
};

/**
 * Get the current visitor ID (for debugging only)
 */
export const getVisitorId = (): string | null => {
  return localStorage.getItem(VISITOR_ID_KEY);
};
