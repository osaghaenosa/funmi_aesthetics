# Funmi's Aesthetics — Full Stack E-Commerce

> Premium fashion, shoes, bags, and home essentials. Curated for everyone. Delivered worldwide.

Built with **Next.js 14** (App Router) + **Node.js / Express** + **MongoDB**.

---

## Project Structure

```
funmis/
├── backend/          ← Node.js + Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           MongoDB connection
│   │   │   └── seed.js         Seed products + admin user
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   ├── auth.js         JWT protect + adminOnly
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── orders.js
│   │   └── server.js           Entry point
│   └── .env.example
│
└── frontend/         ← Next.js 14 App Router
    └── src/
        ├── app/
        │   ├── page.tsx          Home
        │   ├── shop/             Shop + filter
        │   ├── about/            Brand story
        │   ├── shipping/         Shipping info
        │   ├── contact/          Contact form
        │   └── account/          User dashboard
        ├── components/
        │   ├── layout/           Navbar, Footer
        │   ├── home/             Hero, Marquee, Categories, etc.
        │   ├── shop/             ProductCard, CartDrawer
        │   └── auth/             AuthModal (login + register)
        ├── store/
        │   ├── authStore.ts      Zustand auth (persisted)
        │   └── cartStore.ts      Zustand cart (persisted)
        ├── lib/
        │   └── api.ts            Axios instance + API helpers
        └── types/
            └── index.ts          TypeScript interfaces
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

---

### 1. Backend

```bash
cd backend

# Copy env file and fill in your values
cp .env.example .env

# Install dependencies
npm install

# Seed the database (products + admin user)
node src/config/seed.js

# Start development server
npm run dev
# → http://localhost:5000
```

**Default Admin credentials (after seed):**
- Email: `admin@funmisaesthetics.com`
- Password: `Admin@12345`

---

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create env file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
# → http://localhost:3000
```

---

## API Reference

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Sign in |
| POST | `/api/auth/logout` | Public | Sign out |
| POST | `/api/auth/refresh` | Public | Refresh access token |
| GET  | `/api/auth/me` | Auth | Get current user |
| PATCH| `/api/auth/update-profile` | Auth | Update profile |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | List products (filter, sort, paginate) |
| GET | `/api/products/:slug` | Public | Single product |
| POST | `/api/products` | Admin | Create product |
| PATCH| `/api/products/:id` | Admin | Update product |
| DELETE| `/api/products/:id` | Admin | Soft-delete product |
| POST | `/api/products/:id/reviews` | Auth | Add review |
| POST | `/api/products/:id/wishlist` | Auth | Toggle wishlist |

**Query params for GET /api/products:**
- `category` — filter by category slug
- `gender` — women | men | unisex
- `badge` — New | Bestseller | Sale
- `featured` — true
- `search` — full-text search
- `sort` — field name (prefix `-` for desc)
- `page`, `limit` — pagination

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | Auth | Create order |
| GET  | `/api/orders/my` | Auth | My orders |
| GET  | `/api/orders/:id` | Auth | Order detail |
| PATCH| `/api/orders/:id/pay` | Auth | Mark paid |
| GET  | `/api/orders` | Admin | All orders |
| PATCH| `/api/orders/:id/status` | Admin | Update status |

---

## Environment Variables

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/funmis_aesthetics
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
CLIENT_URL=http://localhost:3000
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `ink` | `#0F0E0C` | Primary text, buttons |
| `sage-deep` | `#3E5240` | Brand primary, hover states |
| `champagne` | `#C9A96E` | Accents, highlights |
| `cream` | `#F9F6F1` | Card backgrounds |
| `charcoal` | `#1C1B19` | Footer, dark sections |

Fonts: **Cormorant Garamond** (display) + **DM Sans** (body) + **DM Mono** (labels)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 App Router, TypeScript, Tailwind CSS |
| State | Zustand (persisted auth + cart) |
| HTTP | Axios (with auto-refresh interceptor) |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh tokens, httpOnly cookies) |
| Security | Helmet, CORS, express-rate-limit, bcryptjs |
| Toast | react-hot-toast |

---

## Deployment

**Backend** → Railway, Render, or any Node.js host  
**Frontend** → Vercel (recommended for Next.js)  
**Database** → MongoDB Atlas (free tier)

Update `NEXT_PUBLIC_API_URL` and `CLIENT_URL` to your production URLs.

---

*Made with love for Funmi's Aesthetics ✨*
