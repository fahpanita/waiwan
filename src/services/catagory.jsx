import { message } from "antd";
import { requestBackend } from "../constands/api";

export const createCatagory = async (data) => {
    try {
        const res = await requestBackend({
            url: "/catagories",
            method: "POST",
            data: data,
        });
        message.success("บันทึกสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};

export const createSubCatagory = async (data) => {
    try {
        const res = await requestBackend({
            url: "/subcatagories",
            method: "POST",
            data: data,
        });
        message.success("บันทึกสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};

export const getCatagory = async () => {
    try {
        const res = await requestBackend({
            url: "/parent-catagories",
            method: "GET",

        });
        return res;
    } catch (error) {
        return undefined;
    }
};

export const deleteCatagory = async (id) => {
    try {
        const res = await requestBackend({
            // url: "/destroy-event/" + id,
            url: `/destroy-catagories/${id}`,
            method: "POST",
        });
        message.success("ลบสำเร็จ")
        return res;
    } catch (error) {
        return undefined;
    }
};
