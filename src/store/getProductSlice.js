import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: "",
    type_shipping: "",
    product: [],
};

export const getProductSlice = createSlice({
    name: 'getProductStore',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.product = [action.payload];
            // state.address = action.payload.address;
            // state.type_shipping = action.payload.type_shipping;
        }

    }
})

export const { addProduct } = getProductSlice.actions
export const { removeFirstProduct } = getProductSlice.actions
export default getProductSlice.reducer