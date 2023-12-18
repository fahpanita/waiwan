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
            const nextCartItems = state.product.filter(
                (product) => product.id !== productIdToDelete
            );

            return { ...state, product: nextCartItems };
        },

        updateAmountproduct: (state, action) => {
            const { id, type, amount } = action.payload;

            const updatedProduct = state.product.map(product => {
                if (product.id === id) {
                    return { ...product, amount: type === 'up' ? product.amount + 1 : product.amount - 1 };
                }
                return product;
            });

            return { ...state, product: updatedProduct };
        },
    }
})



// export const { addProduct } = productSlice.actions

export const { addCartProduct, deleteCartProduct, updateAmountproduct } = AddCartProductSlice.actions
export default AddCartProductSlice.reducer