import { Modal, notification, Typography } from "antd";
import { requestBackend } from "../constands/api";
import styled from "styled-components";

const { Text } = Typography;

export const createOrder = async (data) => {
  try {
    const res = await requestBackend({
      url: "/order",
      method: "POST",
      data: data,
    });

    Modal.success({
      title: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>สั่งซื้อสำเร็จ</Text>,
      content: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official</Text>,
      okText: 'ตกลง',
      okButtonProps: {
        style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" },
      },
    });

    return res;
  } catch (error) {
    Modal.error({
      title: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>Error</Text>,
      content: error?.response?.data?.message || <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>กรุณาทำการ logIn ก่อนสั่งซื้อสินค้า</Text>,
      okText: 'ตกลง',
      okButtonProps: {
        style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" },
      },
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
      title: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>Error</Text>,
      content: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>{error?.response?.data?.message}</Text>,
      okText: 'ตกลง',
      okButtonProps: {
        style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" },
      },
    });
    return undefined;
  }
};