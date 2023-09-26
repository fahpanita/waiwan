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

export const createProduts = async (data) => {
  try {
    const res = await requestBackend({
      url: "/products",
      method: "POST",
      data: data,
    });
    message.success("บันทึกสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};

export const deleteProduts = async (id) => {
  try {
    const res = await requestBackend({
      url: `/destroy-products/${id}`,
      method: "POST",
    });
    message.success("ลบสำเร็จ")
    return res;
  } catch (error) {
    return undefined;
  }
};
