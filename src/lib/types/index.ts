export interface Tenant {
    id: string;
    name: string;
    address: string;
}

export interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: Array<string> | Map<string, number>;
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
  priceConfiguration: IPriceConfiguration;
  attributeConfiguration: Array<IAttributeConfigurationValue>;
}

