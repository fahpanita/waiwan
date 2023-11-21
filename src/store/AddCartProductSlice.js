import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: "",
    product: [],
};

export const AddCartProductSlice = createSlice({
    name: 'addCartStore',
    initialState: initialState,
    reducers: {

        addCartProduct: (state, action) => {
            state.product = [...state.product, action.payload];
        },

        deleteCartProduct: (state, action) => {
            const productIdToDelete = action.payload;
            state.product = state.product.filter(product => product.id !== productIdToDelete);
        },

        // addCartProduct: (state, action) => {

        //     const newData = { id: action.payload.product.id, ...action.payload }
        //     state.product.push = [action.payload]
    }
})



// export const { addProduct } = productSlice.actions

export const { addCartProduct, deleteCartProduct } = AddCartProductSlice.actions
export default AddCartProductSlice.reducer