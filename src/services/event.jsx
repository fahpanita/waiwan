import { message } from "antd";
import { requestBackend } from "../constands/api";

export const createEvent = async (data) => {
    try {
        const res = await requestBackend({
            url: "/event",
            method: "POST",
            data: data,
        });
        message.success("บันทึกสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};

export const createSubEvent = async (data) => {
    try {
        const res = await requestBackend({
            url: "/subevent",
            method: "POST",
            data: data,
        });
        message.success("บันทึกสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};

export const getEvent = async () => {
    try {
        const res = await requestBackend({
            url: "/parent-event",
            method: "GET",

        });
        return res;
    } catch (error) {
        return undefined;
    }
};

export const deleteEvent = async (id) => {
    try {
        const res = await requestBackend({
            // url: "/destroy-event/" + id,
            url: `/destroy-event/${id}`,
            method: "POST",
        });
        return res;
    } catch (error) {
        return undefined;
    }
};
