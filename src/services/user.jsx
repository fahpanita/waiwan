import { message } from "antd";
import { requestBackend } from "../constands/api";

export const getUser = async () => {
    try {
        const res = await requestBackend({
            url: "/me",
            method: "GET",

        });
        return res;
    } catch (error) {
        return undefined;
    }
};

export const getAllUser = async () => {
    try {
        const res = await requestBackend({
            url: "/users",
            method: "GET",

        });
        return res;
    } catch (error) {
        return undefined;
    }
};
