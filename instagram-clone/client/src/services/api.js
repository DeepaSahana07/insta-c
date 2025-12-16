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

// API functions
export const apiService = {
  // Posts
  createPost: (postData) => api.post('/posts', postData),
  getPosts: () => api.get('/posts/feed'),
  getExplorePosts: () => api.get('/posts/explore'),
  likePost: (postId) => api.post(`/posts/${postId}/like`),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
  commentOnPost: (postId, text) => api.post(`/posts/${postId}/comment`, { text }),
  
  // Users
  followUser: (userId) => api.post(`/users/follow/${userId}`),
  getUserProfile: (username) => api.get(`/users/profile/${username}`),
  getSuggestedUsers: () => api.get('/users/suggested'),
  searchUsers: (query = '') => api.get(`/users/search?query=${query}`),
  deleteAccount: () => api.delete('/users/account'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  
  // Demo data
  getDemoPosts: () => api.get('/demo/posts'),
  getDemoUsers: () => api.get('/demo/users')
};

// Legacy free API functions for backward compatibility
export const freeAPI = {
  getDemoPosts: () => api.get('/demo/posts'),
  getDemoUsers: () => api.get('/demo/users'),
  likePost: (postId) => apiService.likePost(postId),
  followUser: (userId) => apiService.followUser(userId)
};

export default api;