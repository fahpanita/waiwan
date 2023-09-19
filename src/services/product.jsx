import { requestBackend } from "../constands/api";

export const getProducts = async () => {
  try {
    const res = await requestBackend({
      url: "/products",
      method: "GET",
    });
    console.log(res);
    return res;
  } catch (error) {
    return undefined;
  }
};
