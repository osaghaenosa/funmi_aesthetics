import Product from '../models/Product.js';

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { category, gender, badge, search, featured, sort = '-createdAt', page = 1, limit = 12 } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (gender)   filter.gender = gender;
    if (badge)    filter.badge = badge;
    if (featured) filter.isFeatured = true;
    if (search)   filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('reviews.user', 'firstName lastName avatar');

    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// POST /api/products (admin)
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/products/:id (admin)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id (admin)
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Product removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/products/:id/reviews
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ success: false, message: 'Product already reviewed.' });

    product.reviews.push({ user: req.user._id, name: req.user.fullName, rating: Number(rating), comment });
    product.updateRating();
    await product.save();

    res.status(201).json({ success: true, message: 'Review added.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/products/:id/wishlist
export const toggleWishlist = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.id;
    const idx = user.wishlist.indexOf(productId);
    if (idx === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(idx, 1);
    }
    await user.save({ validateBeforeSave: false });
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
};
