import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Free API functions
export const freeAPI = {
  getDemoPosts: () => api.get('/demo/posts'),
  getDemoUsers: () => api.get('/demo/users'),
  likePost: (postId) => {
    const likes = JSON.parse(localStorage.getItem('likes') || '{}');
    likes[postId] = !likes[postId];
    localStorage.setItem('likes', JSON.stringify(likes));
    return Promise.resolve({ liked: likes[postId] });
  },
  followUser: (userId) => {
    const follows = JSON.parse(localStorage.getItem('follows') || '{}');
    follows[userId] = !follows[userId];
    localStorage.setItem('follows', JSON.stringify(follows));
    return Promise.resolve({ following: follows[userId] });
  }
};

export default api;