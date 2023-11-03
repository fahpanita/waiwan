import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: [],
    loading: false
};

export const AddCartProductSlice = createSlice({
    name: 'addCartStore',
    initialState: initialState,
    reducers: {

        addCartProduct: (state, action) => {
            const newData = { id: action.payload.product.id, ...action.payload }
            state.product.push(newData)

        }
    }
})

// export const { addProduct } = productSlice.actions

export const { addCartProduct } = AddCartProductSlice.actions
export default AddCartProductSlice.reducer