import { message } from "antd";
import { requestBackend } from "../constands/api";

export const getUser = async () => {
    try {
        const res = await requestBackend({
            url: "/user",
            method: "GET",

        });
        return res;
    } catch (error) {
        return undefined;
    }
};
