import { notification } from "antd";
import { requestBackend } from "../constands/api";
import styled from "styled-components";

export const createOrder = async (data) => {
  try {
    const res = await requestBackend({
      url: "/order",
      method: "POST",
      data: data,
    });
    notifications["success"]({
      message: "สั่งซื้อสำเร็จ",
      description:
        'สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official ',
      // duration: 0,
    });
    return res;

  } catch (error) {
    notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
    return undefined;
  }
};

export const notifications = styled(notification)`
  &.ant-notification {
    right: 474px  !important;
      top: 153px !important;
    
  }

  &.ant-notification .ant-notification-notice-wrapper {
    width: 600px !important;
    height: 300px !important;
  }

  &.ant-notification-notice-content {
    display: flex;
      justify-content: center;
  }

  &.ant-notification .ant-notification-notice-wrapper .ant-notification-notice-icon {
    margin-top: 50px !important;
    font-size: 80px;
    position: absolute;
  }

  &.ant-notification .ant-notification-notice-wrapper .ant-notification-notice-with-icon .ant-notification-notice-message {
    font-size: 30px !important;
    margin-top: 150px;
    position: absolute;
  }

  &.ant-notification .ant-notification-notice-wrapper .ant-notification-notice-with-icon .ant-notification-notice-description {
    margin-top: 200px;
    position: absolute;
  }
`;
