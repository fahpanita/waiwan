import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "1234567",
    user: [],
    loading: false
};

export const userSlice = createSlice({
    name: 'userStore',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.value = "login";
            state.user = action.payload
            state.loading = true
        },
        logout: (state, action) => {
            state.value = "logout";
            state.user = action.payload
            state.loading = false
        },
    }
})

// export const { addProduct } = productSlice.actions

export const { login, logout } = userSlice.actions
export default userSlice.reducer