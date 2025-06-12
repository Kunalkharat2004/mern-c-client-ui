import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItems } from "./store/feature/cart/cart-slice"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPayload = (payload: CartItems): string => {
  const hash = crypto.createHash("sha256").update(JSON.stringify({...payload, qty: undefined})).digest("hex");
  console.log("Hash of payload:", hash);
  return hash;
}