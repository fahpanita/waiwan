import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "1234567",
    product: [],
    loading: false
};

export const getProductSlice = createSlice({
    name: 'getProductStore',
    initialState: initialState,
    reducers: {
        // buyproduct: (state, action) => {
        //     state.value = "buyproduct success";
        //     state.product = action.payload
        //     state.loading = true
        // },
        addProduct: (state, action) => {
            //console.log(action.payload)
            const newData = { id: action.payload.product.id, ...action.payload }
            // state.product.push(newData) สำหรับแอดหลายๆอัน
            state.product = [newData]

        }
    }
})

// export const { addProduct } = productSlice.actions

export const { addProduct } = getProductSlice.actions
export default getProductSlice.reducer