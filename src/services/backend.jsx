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
