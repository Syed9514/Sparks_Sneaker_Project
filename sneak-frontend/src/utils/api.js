import axios from 'axios';

// 1. Remove the direct import of 'store' to break the cycle.
// import store from '../app/store'; 

// 2. Create a variable to hold the store instance
let store;

// 3. Export a function to inject the store later
export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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