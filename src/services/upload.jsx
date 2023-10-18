import axios from "axios";
import { BASE_URL, requestBackend } from "../constands/api";

export const uploadImages = async (file) => {

    const data = new FormData();
    data.append('image', file);

    try {
        const res = await axios.post(BASE_URL + "/image", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return res;
    } catch (error) {
        return undefined;
    }
};
