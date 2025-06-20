import axios from 'axios';
import { AddAddressApi } from '../types';
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

export const addAddress = ({ address, id }: { address: AddAddressApi , id: string }) =>
  api.patch(`${ORDER_API_PREFIX}/api/customer/addresses/${id}`, address);