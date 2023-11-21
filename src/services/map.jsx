import { message, notification } from "antd";
import { requestBackend } from "../constands/api";

const key = import.meta.env.VITE_LONGDOMAP_API_KEY;

export const getAddress = async (data) => {
  try {
    const res = await requestBackend({
      // baseURL: "https://api.longdo.com",
      // url: "https://api.longdo.com/map/services/address",
      url: "map/address",
      method: "GET",
      params: { ...data, key },

    });
    message.success("ปักหมุดสำเร็จ")
    return res;
  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};

