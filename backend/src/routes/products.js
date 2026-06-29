import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  toggleWishlist,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

router.post('/', protect, adminOnly, createProduct);
router.patch('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

router.post('/:id/reviews', protect, addReview);
router.post('/:id/wishlist', protect, toggleWishlist);

export default router;
