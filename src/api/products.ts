import axios from "axios";
import { Product } from "models";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    // console.log(response.data); // Logs the array of products
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
