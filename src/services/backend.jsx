import { message, notification } from "antd";
import { requestBackend } from "../constands/api";
import axios from "axios";

export const getSeller = async (token, message) => {
  try {
    const res = await requestBackend({
      url: "/getSeller",
      method: "GET",

    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getConfirmOrder = async (data, record) => {
  try {
    const res = await requestBackend({
      url: "/getConfirmOrder",
      method: "POST",
      body: JSON.stringify({ orderId: record.id }),
    });
    message.success("บันทึกสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};