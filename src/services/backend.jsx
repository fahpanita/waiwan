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

export const getShippingLocation = async (token, message) => {
  try {
    const res = await requestBackend({
      url: "/getShippingLocation",
      method: "GET",

    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getConfirmShippingLocation = async (data) => {
  try {
    const res = await requestBackend({
      url: "/getConfirmShippingLocation",
      method: "POST",
      data: data,

    });
    // console.log(data);
    message.success("ยืนยันการจัดส่งสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getConfirmShippingStore = async (data) => {
  try {
    const res = await requestBackend({
      url: "/getConfirmShippingStore",
      method: "POST",
      data: data,

    });
    // console.log(data);
    message.success("ยืนยันการจัดส่งสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getShippingStore = async (token, message) => {
  try {
    const res = await requestBackend({
      url: "/getShippingStore",
      method: "GET",

    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getShippingComplete = async (token, message) => {
  try {
    const res = await requestBackend({
      url: "/getShippingComplete",
      method: "GET",

    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getCategory = async (params) => {
  try {
    const res = await requestBackend({
      url: "/getCategory",
      method: "GET",
      params,
    });
    // console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.error("Error in getCategory function:", error);
    throw error;
  }
};

export const getEvents = async (params) => {
  try {
    const res = await requestBackend({
      url: "/getEvent",
      method: "GET",
      params,
    });
    console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.error("Error in getEvent function:", error);
    throw error;
  }
};
