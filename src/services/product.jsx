import axios from "axios";
import { BASE_URL } from "../constands/api";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    return res;
  } catch (error) {}
};
