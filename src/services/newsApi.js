import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://api.thenewsapi.com/v1/news';

export const newsApi = {
  getTopNews: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/top`, {
        params: {
          api_token: API_KEY,
          language: 'id',
          limit: 10,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top news:', error);
      throw error;
    }
  },

  getNewsByCategory: async (category, params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        params: {
          api_token: API_KEY,
          categories: category,
          language: 'id',
          limit: 10,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category news:', error);
      throw error;
    }
  },

  searchNews: async (query, params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        params: {
          api_token: API_KEY,
          search: query,
          language: 'id',
          limit: 20,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
};