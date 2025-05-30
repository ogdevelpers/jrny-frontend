// src/api/strapi.js
import axios from 'axios';

const strapi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchCollection = async (collection: any, params = '') => {
  const res = await strapi.get(`/${collection}${params}`);
    return res.data;
};
