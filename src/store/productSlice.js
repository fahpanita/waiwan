import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "product store",
    product: [],
    loading: false
};

export const productSlice = createSlice({
    name: 'productStore',
    initialState: initialState,
    reducers: {

    }
})

// export const { addProduct } = productSlice.actions

export default productSlice.reducer