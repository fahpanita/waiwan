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

export const getallSeller = async (token, message) => {
  try {
    const res = await requestBackend({
      url: "/getallSeller",
      method: "GET",

    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getConfirmOrder = async (data) => {
  try {
    const res = await requestBackend({
      url: "/getConfirmOrder",
      method: "POST",
      data: data,

    });
    // console.log(data);
    message.success("ยืนยันการชำระเงินสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getDataDashboard = async (data) => {
  try {
    const res = await requestBackend({
      url: "/getDataDashboard",
      method: "GET",
      data: data,
    });
    return res;
  } catch (error) {
    return undefined;
  }
};