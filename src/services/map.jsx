import { message, notification, Typography } from "antd";
import { requestBackend } from "../constands/api";

const key = import.meta.env.VITE_LONGDOMAP_API_KEY;
const { Text } = Typography;

export const getAddress = async (data) => {
  try {
    const res = await requestBackend({
      // baseURL: "https://api.longdo.com",
      // url: "https://api.longdo.com/map/services/address",
      url: "map/address",
      method: "GET",
      params: { ...data, key },

    });
    message.success(<Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>ปักหมุดสำเร็จ</Text>)
    return res;
  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>Something when wrong</Text> })
    return undefined;
  }
};

