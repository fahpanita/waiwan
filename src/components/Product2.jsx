import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from '../store/userSlice'

const Product2 = () => {

    const dispatch = useDispatch();

    const user = {
        username: "producttest",
        password: "1234"
    }

    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <div>
            <h1>Product2</h1>
            <br />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => dispatch(logout())}>Login</button>
        </div>

    )
}

export default Product2