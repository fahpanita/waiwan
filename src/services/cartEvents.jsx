import { notification } from "antd";
import { requestBackend } from "../constands/api";

export const createCartEvents = async (data) => {
    try {
        const res = await requestBackend({
            url: "/cardevent",
            method: "POST",
            data: data,
        });
        message.success("บันทึกสำเร็จ")
        return res;
    } catch (error) {
        notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
        return undefined;
    }
};

