import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // always send cookies (accessToken, refreshToken)
  headers: { 'Content-Type': 'application/json' },
});

// ── Auto-refresh on 401 ─────────────────────────────────────
// The backend already validates the httpOnly cookie on every request.
// If the access token cookie expires, we call /auth/refresh (which uses the
// refreshToken cookie) to get a fresh one, then replay the original request.
let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Queue the request while a refresh is already in-flight
        return new Promise((resolve) => {
          refreshQueue.push(() => resolve(api(original)));
        });
      }

      isRefreshing = true;
      try {
        // refreshToken cookie is sent automatically via withCredentials
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // Flush queued requests
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];
        return api(original);
      } catch {
        // Refresh failed — session truly expired; open login modal
        refreshQueue = [];
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ── Auth ───────────────────────────────────────────────────
export const authApi = {
  register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  refresh: () => api.post('/auth/refresh'),
  updateProfile: (data: Partial<{ firstName: string; lastName: string; phone: string; avatar: string }>) =>
    api.patch('/auth/update-profile', data),
  getUsers: () => api.get('/auth/users'),
};

// ── Products ───────────────────────────────────────────────
export const productApi = {
  getAll: (params?: Record<string, string | number | boolean>) => api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  toggleWishlist: (id: string) => api.post(`/products/${id}/wishlist`),
  addReview: (id: string, data: { rating: number; comment: string }) =>
    api.post(`/products/${id}/reviews`, data),
  create: (data: unknown) => api.post('/products', data),
  update: (id: string, data: unknown) => api.patch(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// ── Orders ─────────────────────────────────────────────────
export const orderApi = {
  create: (data: unknown) => api.post('/orders', data),
  myOrders: () => api.get('/orders/my'),
  getById: (id: string) => api.get(`/orders/${id}`),
  pay: (id: string, paymentResult: unknown) => api.patch(`/orders/${id}/pay`, paymentResult),
  getAll: () => api.get('/orders'),
  updateStatus: (id: string, data: { status: string; trackingNumber?: string }) =>
    api.patch(`/orders/${id}/status`, data),
};

// ── Upload (ImageKit) ──────────────────────────────────────
export const uploadApi = {
  /** Fetches a short-lived ImageKit auth token from the backend (admin only). */
  getAuthToken: () =>
    api.get<{
      success: boolean;
      token: string;
      expire: number;
      signature: string;
      publicKey: string;
      urlEndpoint: string;
    }>('/upload/auth'),
};
