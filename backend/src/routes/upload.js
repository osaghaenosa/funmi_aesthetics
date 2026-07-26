import { Router } from 'express';
import ImageKit from '@imagekit/nodejs';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// Lazy-initialise so the server doesn't crash on startup if keys aren't set yet
function getImageKit() {
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    return null;
  }

  if (IMAGEKIT_PUBLIC_KEY.includes('your_') || IMAGEKIT_PRIVATE_KEY.includes('your_')) {
    return null;
  }

  return new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });
}

/**
 * GET /api/upload/auth
 * Returns a short-lived auth token so the browser can upload directly to ImageKit.
 * Admin-only — never expose your private key to the client.
 */
router.get('/auth', protect, adminOnly, (req, res) => {
  const ik = getImageKit();

  if (!ik) {
    return res.status(503).json({
      success: false,
      message:
        'ImageKit is not configured yet. Add IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT to your backend .env file.',
    });
  }

  try {
    const authParams = ik.helper.getAuthenticationParameters();
    res.json({
      success: true,
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (err) {
    console.error('ImageKit auth error:', err);
    res.status(500).json({ success: false, message: `Failed to generate ImageKit auth token: ${err.message}` });
  }
});

export default router;
