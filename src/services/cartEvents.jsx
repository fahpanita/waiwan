import { message, notification } from "antd";
import { requestBackend } from "../constands/api"


export const getCartEvents = async () => {
    try {
        const res = await requestBackend({
            url: "/cardevent",
            method: "GET",
        });
        return res;
    } catch (error) {
        return undefined;
    }
};

export const getCartEventsId = async (id) => {
    try {
        const res = await requestBackend({
            url: `/cardevent/${id}`,
            method: "GET",
        });
        return res;
    } catch (error) {
        return undefined;
    }
};

export const createCartEvents = async (data) => {
    try {
        const res = await requestBackend({
            url: "/cardevent",
            method: "POST",
            data: data,
        })
        console.log(res)
        message.success("บันทึกสำเร็จ")
        return res.data;
    } catch (error) {
        notification["error"]({ message: error?.response?.data?.message || "Something when wrong" })
        return undefined;
    }

};

export const deleteCartEvents = async (id) => {
    try {
        const res = await requestBackend({
            url: `/destroy-cardevent/${id}`,
            method: "POST",
        });
        message.success("ลบสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};
