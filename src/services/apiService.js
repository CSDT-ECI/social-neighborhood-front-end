import axios from 'axios';
import API_BASE_URL from '../config/api';

const api = axios.create({ baseURL: API_BASE_URL });

export const fetchData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postData = async (endpoint, body) => {
  const response = await api.post(endpoint, body);
  return response;
};

export default api;
