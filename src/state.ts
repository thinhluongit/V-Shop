import { atom, selector } from "recoil";
import { Product } from "./models";
import { getUserInfo } from "zmp-sdk";
import { products } from "data/products";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const productState = selector<Product[]>({
  key: "products",
  get: () => {
    return products;
  },
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});
