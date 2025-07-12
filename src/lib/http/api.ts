import axios from 'axios';
import { AddAddressApi, Coupon, OrderData } from '../types';
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

export const verifyCouponCode = (data: Coupon) => api.post(`${ORDER_API_PREFIX}/api/coupon/verify`, data);

export const addAddress = ({ address, id }: { address: AddAddressApi, id: string }) =>
  api.patch(`${ORDER_API_PREFIX}/api/customer/addresses/${id}`, address);

/**
 * 
 * @param orderData - The order data to be sent to the server.
 * @param idempotencyKey - A unique key to ensure the request is processed only once
 */
export const createOrder = ({ orderData, idempotencyKey }: { orderData: OrderData, idempotencyKey: string }) =>
  api.post(`${ORDER_API_PREFIX}/api/order`, orderData,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      }
    }
  );