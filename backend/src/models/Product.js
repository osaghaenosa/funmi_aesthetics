import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:    { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    priceNaira:  { type: Number, required: true, min: 0 },
    category:    {
      type: String,
      required: true,
      enum: ["women's-fashion", "men's-fashion", 'bags', 'footwear', 'home-decor', 'appliances', 'accessories'],
    },
    gender:      { type: String, enum: ['women', 'men', 'unisex'], default: 'unisex' },
    images:      [{ type: String }],
    badge:       { type: String, enum: ['New', 'Bestseller', 'Sale', ''], default: '' },
    stock:       { type: Number, required: true, default: 0 },
    sku:         { type: String, unique: true, sparse: true },
    tags:        [String],
    reviews:     [reviewSchema],
    rating:      { type: Number, default: 0 },
    numReviews:  { type: Number, default: 0 },
    isFeatured:  { type: Boolean, default: false },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Update rating on review save
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.rating = (total / this.reviews.length).toFixed(1);
    this.numReviews = this.reviews.length;
  }
};

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
