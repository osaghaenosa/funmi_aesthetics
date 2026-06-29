import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  markOrderPaid,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.use(protect); // all order routes require auth

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/:id', getOrderById);
router.patch('/:id/pay', markOrderPaid);

// Admin
router.get('/', protect, adminOnly, getAllOrders);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
