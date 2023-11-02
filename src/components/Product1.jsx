import React from "react";
import { useSelector } from "react-redux";


const Product1 = ({ tam }) => {

    const { user } = useSelector((state) => ({ ...state }))
    console.log(user);

    return (
        <>
            <div>Product 1</div>
            <br />
            store: {user.value}
            <br />
            prop: {tam}
            <br />
            {user.loading ? <p> loading... </p> : <p>accept </p>}
        </>


    );

};

export default Product1