export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  wishlist?: string[];
  addresses?: Address[];
  createdAt?: string;
}

export interface Address {
  _id?: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceNaira: number;
  category: string;
  gender: 'women' | 'men' | 'unisex';
  images: string[];
  badge?: 'New' | 'Bestseller' | 'Sale' | '';
  stock: number;
  tags: string[];
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  reviews?: Review[];
  createdAt?: string;
}

export interface Review {
  _id: string;
  user: string | User;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Order {
  _id: string;
  user: string | User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  currency: 'USD' | 'NGN';
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image?: string;
  price: number;
  qty: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  pages: number;
}
