import { CartItems } from "../store/feature/cart/cart-slice";

export interface Tenant {
    id: string;
    name: string;
    address: string;
}

export interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: Array<string>;
  };
}

export interface IProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface IAttributeConfiguration {
  name: string;
  widgetType: "radio" | "switch";
  defaultValue: string;
  availableOptions: Array<string>;
}

export interface ICategory {
  _id: string;
  name: string;
  priceConfiguration: IPriceConfiguration;
  attributeConfiguration: Array<IAttributeConfiguration>;
  hasToppings: boolean;
}

export interface IAttributeConfigurationValue {
  name: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: ICategory;
  isPublished: boolean;
  tenantId: string;
  categoryId: string;
  priceConfiguration: IProductPriceConfiguration;
  attributeConfiguration: Array<IAttributeConfigurationValue>;
}


export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
  tenantId: string;
  isPublished: boolean;
  createdAt: Date;
};

export type ToppingProps = {
  toppings: Topping[];
};

export type ParsedCookie = {
  accessToken?: string;
  refreshToken?: string;
  "Max-Age"?: string;
  Path?: string;
  Domain?: string;
  SameSite?: "strict" | "lax" | "none";
};
export type SetCookiesParams = {
  parsedAccessToken: ParsedCookie;
  parsedRefreshToken: ParsedCookie;
};

export type SearchParamsProps = {
  searchParams: Promise<{ 
    restaurantId?: string
    tenantId?: string;
    orderId?: string;
    success?: string;
  }>;
};

export interface SearchParamsPropsHeader {
  searchParams: {
    restaurantId?: string
  }
}


export interface Address {
  _id?: string;
  label: "Home" | "Work" | "Other"; // e.g. “Home” or “Work”
  text: string; // full address line
  city: string; // city name
  postalCode: string; // ZIP / PIN
  phone: string; // phone number
  isDefault: boolean; // mark your primary address
}

export interface AddAddressApi{
  // diselect _id from address
  address: Omit<Address, "_id">; 
}

export interface Customer {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
}

export interface Coupon {
  code: string;
  tenantId: string;
}

export type CouponResponse = {
  valid: boolean;
  exp: boolean;
  discount: number;
}

export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export interface OrderData {
  cart: CartItems[];
  customerId: string;
  couponCode: string;
  address: Address;
  tenantId: string;
  comment?: string;
  paymentMode: "card" | "cod";
}

export enum PaymentMode {
  CASH = "cod",
  CARD = "card",
}

export interface OrderType {
  _id?: string;
  cart: CartItems[];
  customerId: string;
  total: number;
  discount: number;
  taxes: number;
  deliveryCharges: number;
  address: Address;
  tenantId: string;
  comment?: string;
  paymentMode: PaymentMode;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  receiptUrl?: string;
  createdAt: Date;
}