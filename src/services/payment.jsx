import { notification } from "antd";
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

// export const createPayment = async (data) => {
//   try {
//     const res = await requestBackend({
//       url: "/payment",
//       method: "POST",
//       data: data,
//     });
//     message.success("บันทึกสำเร็จ")
//     return res;
//   } catch (error) {
//     notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
//     return undefined;
//   }
// };

export const createPayment = async (data) => {
  try {
    const formData = new FormData();
    formData.append('order_id', data.order_id);
    formData.append('price', data.price);
    formData.append('slip_img', data.slip_img[0]);

    const res = await requestBackend({
      url: "/payment",
      method: "POST",
      data: formData,
    });
    message.success("บันทึกสำเร็จ");
    return res;
  } catch (error) {
    notification.error({ message: error?.response?.data?.message || "Something went wrong" });
    return undefined;
  }
};
