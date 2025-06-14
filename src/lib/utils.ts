import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItems } from "./store/feature/cart/cart-slice";
import crypto from "crypto";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPayload = (payload: CartItems): string => {
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ ...payload, qty: undefined }))
    .digest("hex");
  return hash;
};

export const getMinPrice = (product: Product): number => {
  const minPrice = Object.entries(product.priceConfiguration)
    .filter(([, value]) => value.priceType === "base")
    .reduce((acc, [, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);
  return minPrice;
};

export const getProductPrice = (
  product: Product,
  configKey: string,
  option: string
): number => {
  // Check if the configKey exists in the product's priceConfiguration
  if (product.priceConfiguration.hasOwnProperty(configKey)) {
    const config = product.priceConfiguration[configKey];
    // Check if availableOptions exist and is an object, and if the option exists within it
    if (
      config.availableOptions &&
      typeof config.availableOptions === "object" &&
      config.availableOptions.hasOwnProperty(option)
    ) {
      return config.availableOptions[option];
    }
  }
  // Return 0 or throw an error if the price isn't found, depending on your error handling preference
  return 0;
};