import axios from 'axios';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://londis-production.up.railway.app/api'
    : 'http://localhost:5000/api');

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

export const CLIENT_URL =
  import.meta.env.VITE_CLIENT_URL ||
  (import.meta.env.PROD
    ? 'https://londis-frontend.vercel.app'
    : 'http://localhost:5173');

export const ADMIN_URL =
  import.meta.env.VITE_ADMIN_URL ||
  (import.meta.env.PROD
    ? 'https://londis-admin.vercel.app'
    : 'http://localhost:5174');

export const getAssetUrl = (path) => {
  if (!path || path === 'none') return '';
  if (typeof path !== 'string' || path.trim() === '') return '';
  const cleanPath = path.trim();
  if (cleanPath.startsWith('data:') || cleanPath.startsWith('blob:')) return cleanPath;
  if (import.meta.env.PROD && (cleanPath.startsWith('http://localhost') || cleanPath.startsWith('http://127.0.0.1'))) {
    try {
      const parsed = new URL(cleanPath);
      return `${API_ORIGIN}${parsed.pathname}${parsed.search}`;
    } catch {
      // fallback
    }
  }
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) return cleanPath;
  return `${API_ORIGIN}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (!original || !error.response) {
      return Promise.reject(error);
    }

    // Do not attempt token refresh for auth routes (login, register, refresh)
    const url = original.url || '';
    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/refresh') ||
      url.includes('/auth/register');

    if (error.response.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      // Deduplicate concurrent refresh requests across parallel API calls
      if (!refreshPromise) {
        refreshPromise = api
          .post('/auth/refresh', null, { _retry: true })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        return api(original);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

