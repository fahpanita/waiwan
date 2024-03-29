import { message, notification } from "antd";
import { requestBackend } from "../constands/api";

export const getProducts = async () => {
  try {
    const res = await requestBackend({
      url: "/product",
      method: "GET",
    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getSearch = async (params) => {
  try {
    const res = await requestBackend({
      url: "/getSearch",
      method: "GET",
      params,
    });
    return res.data;
  } catch (error) {
    console.error("Error in getCategory function:", error);
    throw error;
  }
};

export const getProductId = async (id) => {
  try {
    const res = await requestBackend({
      url: `/product/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const createProduts = async (data) => {
  try {
    const res = await requestBackend({
      url: "/products",
      method: "POST",
      data: data,
    });
    message.success("บันทึกสำเร็จ")
    return res;
  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};


export const deleteProduts = async (id) => {
  try {
    const res = await requestBackend({
      url: `/destroy-products/${id}`,
      method: "POST",
    });
    message.success("ลบสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};
