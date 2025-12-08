import axios from 'axios';

// 1. Remove the direct import of 'store' to break the cycle.
// import store from '../app/store'; 

// 2. Create a variable to hold the store instance
let store;

// 3. Export a function to inject the store later
export const injectStore = (_store) => {
  store = _store;
};

// Define the base URL for the server (useful for static assets like images)
// export const API_BASE_URL = 'http://localhost:5000';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // 4. Use the injected store variable
    if (store) {
      const state = store.getState();
      const token = state.auth.user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;