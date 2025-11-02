// src/services/newsApi.js
import axios from 'axios';

const API_TOKEN = 'CpHpaKkZsJpzktuCOlcQhkaRto1myyKbieJ9SPJO';
const BASE_URL = 'https://api.thenewsapi.com/v1/news';

// Konfigurasi axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_TOKEN,
    language: 'en',
  },
});

export const CATEGORIES = [
  { id: 'general', name: 'General', icon: 'newspaper' },
  { id: 'business', name: 'Business', icon: 'briefcase' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film' },
  { id: 'health', name: 'Health', icon: 'heart' },
  { id: 'science', name: 'Science', icon: 'flask' },
  { id: 'sports', name: 'Sports', icon: 'basketball' },
  { id: 'tech', name: 'Technology', icon: 'cpu' },
];

export const newsAPI = {
  // Get all news (latest)
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/all', {
        params: {
          limit: 10,
          ...params,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw error;
    }
  },

  // Get top news
  getTop: async (params = {}) => {
    try {
      const response = await apiClient.get('/top', {
        params: {
          limit: 5,
          ...params,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching top news:', error);
      throw error;
    }
  },

  // Get news by category
  getByCategory: async (category, params = {}) => {
    try {
      const response = await apiClient.get('/all', {
        params: {
          categories: category,
          limit: 20,
          ...params,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching category news:', error);
      throw error;
    }
  },

  // Get news by UUID
  getByUuid: async (uuid) => {
    try {
      const response = await apiClient.get('/all', {
        params: {
          uuid: uuid,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching news detail:', error);
      throw error;
    }
  },

  // Search news
  search: async (query, params = {}) => {
    try {
      const response = await apiClient.get('/all', {
        params: {
          search: query,
          limit: 20,
          ...params,
        },
      });
      return response;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
};

export default newsAPI;