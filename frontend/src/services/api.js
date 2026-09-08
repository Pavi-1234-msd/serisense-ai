import axios from 'axios';
import { auth } from '../firebase';

// Determine and normalize API base URL (strips trailing slashes)
const rawBaseUrl = process.env.REACT_APP_API_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor to dynamically attach Firebase ID Token or legacy JWT
api.interceptors.request.use(
  async (config) => {
    try {
      if (auth.currentUser) {
        // Fetch fresh Firebase ID Token directly from Firebase Auth SDK
        const idToken = await auth.currentUser.getIdToken();
        if (idToken) {
          config.headers.Authorization = `Bearer ${idToken}`;
          return config;
        }
      }
    } catch (e) {
      console.warn("Could not retrieve Firebase ID token:", e);
    }

    // Fallback to legacy JWT token if present
    const legacyToken = localStorage.getItem('serisense_token');
    if (legacyToken) {
      config.headers.Authorization = `Bearer ${legacyToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token expiration redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear legacy tokens on 401 Unauthorized
      localStorage.removeItem('serisense_token');
      localStorage.removeItem('serisense_user');
    }
    return Promise.reject(error);
  }
);

// --- Firebase Verified User Endpoint ---
export const getFirebaseMe = async () => {
  const res = await api.get('/auth/firebase/me');
  return res.data;
};

// --- Auth APIs ---
export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  if (res.data.token) {
    localStorage.setItem('serisense_token', res.data.token);
    localStorage.setItem('serisense_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  if (res.data.token) {
    localStorage.setItem('serisense_token', res.data.token);
    localStorage.setItem('serisense_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/auth/me');
  if (res.data.user) {
    localStorage.setItem('serisense_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await api.put('/auth/profile', profileData);
  if (res.data.user) {
    localStorage.setItem('serisense_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('serisense_token');
  localStorage.removeItem('serisense_user');
};

// --- Leaf Detection APIs ---
export const predictLeafDisease = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/leaf/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const getLeafHistory = async () => {
  const res = await api.get('/leaf/history');
  return res.data;
};

// --- Climate Advisory APIs ---
export const checkClimateStatus = async (climateData) => {
  const res = await api.post('/climate/check', climateData);
  return res.data;
};

export const getClimateHistory = async () => {
  const res = await api.get('/climate/history');
  return res.data;
};

// --- Silkworm Disease Diagnosis APIs ---
export const getSilkwormSymptoms = async () => {
  const res = await api.get('/silkworm/symptoms');
  return res.data;
};

export const diagnoseSilkwormDisease = async (symptomsArray) => {
  const res = await api.post('/silkworm/diagnose', { symptoms: symptomsArray });
  return res.data;
};

export const getSilkwormHistory = async () => {
  const res = await api.get('/silkworm/history');
  return res.data;
};

// --- Dashboard Summary ---
export const getDashboardSummary = async () => {
  const res = await api.get('/dashboard/summary');
  return res.data;
};

// --- Admin & ML Metrics ---
export const getAdminStats = async () => {
  const res = await api.get('/admin/stats');
  return res.data;
};

export const getModelMetrics = async () => {
  const res = await api.get('/admin/model-metrics');
  return res.data;
};

// --- Health Check ---
export const checkApiHealth = async () => {
  const res = await api.get('/health', { timeout: 6000 });
  return res.data;
};

export default api;