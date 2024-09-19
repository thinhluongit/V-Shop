import { atom, selector } from "recoil";
import { Product } from "./models";
import { getUserInfo } from "zmp-sdk";
import { getAllProducts } from "api/products";
import axios from "axios";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const productsState = selector({
  key: "products",
  get: async () => {
    return getAllProducts();
  },
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});
