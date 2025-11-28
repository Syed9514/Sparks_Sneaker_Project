import axios from 'axios';
import store from '../app/store'; // Import the actual Redux store

// Create a single axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Centralized URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTOR ---
// Before every request, check Redux for a token and add it.
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;