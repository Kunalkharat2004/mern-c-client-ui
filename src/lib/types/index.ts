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