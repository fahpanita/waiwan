import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: [],
};

export const AddCartProductSlice = createSlice({
    name: 'addCartStore',
    initialState: initialState,
    reducers: {

        addCartProduct: (state, action) => {
            state.product = [...state.product, action.payload];
        }

        // addCartProduct: (state, action) => {

        //     const newData = { id: action.payload.product.id, ...action.payload }
        //     state.product.push = [action.payload]
    }
})

// export const { addProduct } = productSlice.actions

export const { addCartProduct } = AddCartProductSlice.actions
export default AddCartProductSlice.reducer