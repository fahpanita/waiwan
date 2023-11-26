import { message, notification } from "antd";
import { requestBackend } from "../constands/api";
import axios from "axios";

export const notifyLine = async (token, message) => {
  try {
    const res = await axios({
      method: "POST",
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      },
      data: 'message=' + message,
    });
    console.log('notify res', res)

  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};
