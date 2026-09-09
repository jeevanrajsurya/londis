import axios from 'axios';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://londis-production.up.railway.app/api'
    : 'http://localhost:5000/api');

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send httpOnly cookies
});

let refreshPromise = null;

// If an access token expires, try a silent refresh once, then retry the request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (!original || !error.response) {
      return Promise.reject(error);
    }

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
