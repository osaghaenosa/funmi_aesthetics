import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  { name: 'Drape Midi Dress', slug: 'drape-midi-dress', description: 'An effortlessly elegant midi dress with a fluid drape silhouette. Perfect for day-to-evening transitions.', price: 29, priceNaira: 45000, category: "women's-fashion", gender: 'women', badge: 'New', stock: 35, isFeatured: true, images: ['/images/drape-midi.jpg'], tags: ['dress', 'midi', 'women'] },
  { name: 'Structured Tote Bag', slug: 'structured-tote-bag', description: 'A premium structured tote in vegan leather. Spacious, chic, and built to last.', price: 40, priceNaira: 62000, category: 'bags', gender: 'unisex', badge: 'Bestseller', stock: 20, isFeatured: true, images: ['/images/tote-bag.jpg'], tags: ['bag', 'tote', 'unisex'] },
  { name: 'Clean Leather Sneakers', slug: 'clean-leather-sneakers', description: 'Minimalist white leather sneakers with a cushioned sole. The perfect everyday canvas shoe.', price: 50, priceNaira: 78000, category: 'footwear', gender: 'unisex', badge: '', stock: 42, isFeatured: true, images: ['/images/leather-sneakers.jpg'], tags: ['shoes', 'sneakers', 'unisex'] },
  { name: 'Ceramic Table Lamp', slug: 'ceramic-table-lamp', description: 'Hand-thrown ceramic lamp with warm Edison bulb. Adds a sculptural focal point to any room.', price: 24, priceNaira: 38000, category: 'home-decor', gender: 'unisex', badge: '', stock: 15, isFeatured: true, images: ['/images/ceramic-lamp.jpg'], tags: ['lamp', 'home', 'decor'] },
  { name: 'Merino Knit Scarf', slug: 'merino-knit-scarf', description: 'Ultra-soft 100% merino wool scarf. Warm, lightweight, and available in earthy tones.', price: 14, priceNaira: 22000, category: 'accessories', gender: 'unisex', badge: 'Sale', stock: 60, isFeatured: false, images: ['/images/merino-scarf.jpg'], tags: ['scarf', 'knit', 'winter'] },
  { name: 'Linen Throw Pillow Set', slug: 'linen-throw-pillow-set', description: 'Set of 2 stone-washed linen pillow covers. Breathable, durable, and naturally beautiful.', price: 12, priceNaira: 19500, category: 'home-decor', gender: 'unisex', badge: '', stock: 50, isFeatured: false, images: ['/images/linen-pillows.jpg'], tags: ['pillow', 'linen', 'home'] },
  { name: 'Oxford Derby Shoes', slug: 'oxford-derby-shoes', description: 'Classic full-grain leather Oxford Derbies. Handcrafted with a Goodyear welt for lasting comfort.', price: 55, priceNaira: 85000, category: 'footwear', gender: 'men', badge: '', stock: 22, isFeatured: false, images: ['/images/oxford-derby.jpg'], tags: ['shoes', 'oxford', 'men', 'formal'] },
  { name: 'Terracotta Planter Trio', slug: 'terracotta-planter-trio', description: 'Set of 3 hand-painted terracotta planters in graduating sizes. Perfect for indoor plants.', price: 10, priceNaira: 16000, category: 'home-decor', gender: 'unisex', badge: 'New', stock: 30, isFeatured: false, images: ['/images/terracotta-planters.jpg'], tags: ['planter', 'terracotta', 'home', 'plant'] },
  { name: 'Gold Cuff Bracelet', slug: 'gold-cuff-bracelet', description: 'Adjustable 18k gold-plated brass cuff. A statement piece that works for every wrist.', price: 18, priceNaira: 28000, category: 'accessories', gender: 'unisex', badge: '', stock: 40, isFeatured: false, images: ['/images/gold-cuff.jpg'], tags: ['bracelet', 'gold', 'jewellery'] },
  { name: 'Relaxed Linen Trousers', slug: 'relaxed-linen-trousers', description: 'Wide-leg linen trousers with an elasticated waistband. Cool, breezy, and endlessly versatile.', price: 32, priceNaira: 50000, category: "men's-fashion", gender: 'men', badge: '', stock: 28, isFeatured: false, images: ['/images/linen-trousers.jpg'], tags: ['trousers', 'linen', 'men'] },
  { name: 'Woven Rattan Mirror', slug: 'woven-rattan-mirror', description: 'Artisan-woven rattan frame circular mirror. Adds texture and warmth to any wall.', price: 35, priceNaira: 54000, category: 'home-decor', gender: 'unisex', badge: 'New', stock: 12, isFeatured: true, images: ['/images/rattan-mirror.jpg'], tags: ['mirror', 'rattan', 'home', 'wall'] },
  { name: 'Mini Crossbody Bag', slug: 'mini-crossbody-bag', description: 'Compact leather crossbody with adjustable strap and gold-tone hardware. Essentials-only chic.', price: 28, priceNaira: 43000, category: 'bags', gender: 'women', badge: 'Bestseller', stock: 18, isFeatured: true, images: ['/images/crossbody-bag.jpg'], tags: ['bag', 'crossbody', 'women'] },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Products cleared');

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    // Seed admin user
    const existing = await User.findOne({ email: 'admin@funmisaesthetics.com' });
    if (!existing) {
      await User.create({
        firstName: 'Funmilola',
        lastName: 'Alade',
        email: 'admin@funmisaesthetics.com',
        password: 'Admin@12345',
        role: 'admin',
      });
      console.log('✅ Admin user seeded — email: admin@funmisaesthetics.com  pass: Admin@12345');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
