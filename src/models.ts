import { ReactNode } from "react";

export type CartProduct = {
  id: number;
  order: {
    quantity: number;
    note: string;
    [key: string]: any;
  };
};

export type Product = {
  id: number;
  title: string;
  price: number;
  sku: string;
  thumbnail: string;
};

export type HeaderType = {
  route?: string;
  hasLeftIcon?: boolean;
  title?: string;
  customTitle?: ReactNode;
  type?: "primary" | "secondary";
  rightIcon?: ReactNode;
};
