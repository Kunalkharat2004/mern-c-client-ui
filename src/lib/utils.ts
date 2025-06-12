import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItems } from "./store/feature/cart/cart-slice"
import crypto from "crypto"
import { Product } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPayload = (payload: CartItems): string => {
  const hash = crypto.createHash("sha256").update(JSON.stringify({...payload, qty: undefined})).digest("hex");
  return hash;
}
 
export const getMinPrice = (product: Product): number =>{
  const minPrice = Object.entries(product.priceConfiguration)
    .filter(([, value]) => value.priceType === "base")
    .reduce((acc, [, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions))
      return acc + smallestPrice;
    }, 0)
  return minPrice;
}