import Order from '../models/Order.js';
import Product from '../models/Product.js';

// POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, currency = 'USD' } = req.body;

    if (!orderItems?.length) {
      return res.status(400).json({ success: false, message: 'No order items provided.' });
    }

    // Verify prices from DB
    const itemsWithPrices = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product ${item.product} not found.`);
        return {
          product: product._id,
          name: product.name,
          image: product.images?.[0] || '',
          price: currency === 'NGN' ? product.priceNaira : product.price,
          qty: item.qty,
        };
      })
    );

    const itemsPrice = itemsWithPrices.reduce((acc, i) => acc + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // free shipping over $100
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: itemsWithPrices,
      shippingAddress,
      paymentMethod,
      currency,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/my
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    // Only owner or admin can see order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/orders/:id/pay
export const markOrderPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    order.isPaid = true;
    order.paidAt = new Date();
    order.status = 'processing';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.update_time,
      email: req.body.payer?.email_address,
    };

    const updated = await order.save();
    res.json({ success: true, order: updated });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/orders/:id/status (admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, ...(trackingNumber && { trackingNumber }), ...(status === 'delivered' && { isDelivered: true, deliveredAt: new Date() }) },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders (admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter).populate('user', 'firstName lastName email').sort('-createdAt').skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ success: true, orders, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};
