import axios from 'axios';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const ORDER_API_PREFIX = "/api/order";

export const getCustomer = () => api.get(`${ORDER_API_PREFIX}/api/customer`);