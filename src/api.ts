import axios from 'axios';
import type { CreateUrlRequest, CreateUrlResponse } from './types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urlApi = {
  shortenUrl: async (request: CreateUrlRequest): Promise<CreateUrlResponse> => {
    const response = await api.post('/shorturls', request);
    return response.data;
  },
};
