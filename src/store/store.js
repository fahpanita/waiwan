import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import getProductSlice from "./getProductSlice";
import AddCartProductSlice from "./AddCartProductSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        getProduct: getProductSlice,
        addCartProduct: AddCartProductSlice,
    }
})