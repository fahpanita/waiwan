import { Modal, notification } from "antd";
import { requestBackend } from "../constands/api";
import styled from "styled-components";

export const payment = async (data) => {
  try {
    const res = await requestBackend({
      url: "/getPromptPay",
      method: "GET",
      data: data,
    });
    notification["success"]({
      message: "คิวอาร์สำเร็จ",
      // duration: 0,
    });
    return res;

  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};

export const createPayment = async (data) => {
  try {
    const res = await requestBackend({
      url: "/payment",
      method: "POST",
      data: data,
    });

    // Modal.success({
    //   title: "ชำระเงินสำเร็จ",
    //   content: 'สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official',
    // });

    return res;
  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};
