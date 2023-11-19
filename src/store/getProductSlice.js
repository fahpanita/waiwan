import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: "",
    product: [],
};

export const getProductSlice = createSlice({
    name: 'getProductStore',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.product = [action.payload]
        }


    }
})

export const { addProduct } = getProductSlice.actions
export const { removeFirstProduct } = getProductSlice.actions
export default getProductSlice.reducer