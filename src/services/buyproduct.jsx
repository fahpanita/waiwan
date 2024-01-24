import { Modal, notification } from "antd";
import { requestBackend } from "../constands/api";
import styled from "styled-components";

export const createOrder = async (data) => {
  try {
    const res = await requestBackend({
      url: "/order",
      method: "POST",
      data: data,
    });

    Modal.success({
      title: "สั่งซื้อสำเร็จ",
      content: 'สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official',
    });

    return res;
  } catch (error) {
    Modal.error({
      title: "Error",
      content: error?.response?.data?.message || "กรุณาทำการ logIn ก่อนสั่งซื้อสินค้า",
    });
    return undefined;
  }
};

export const createAddress = async (data) => {
  try {
    const res = await requestBackend({
      url: "/address",
      method: "POST",
      data: data,
    });

    return res;
  } catch (error) {
    Modal.error({
      title: "Error",
      content: error?.response?.data?.message || "ที่อยู่ไม่ถูกต้อง",
    });
    return undefined;
  }
};