import { message, notification } from "antd";
import { requestBackend } from "../constands/api";
import axios from "axios";

export const notifyLine = async (token, message) => {
  try {
    const res = await requestBackend({
      method: "POST",
      url: 'notify',
      data: message,
    });
    console.log('notify res', res)

  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};
