import React, { useEffect, useState } from "react";
import Product1 from "./Product1";
import Product2 from "./Product2";

const Index = () => {

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const res = await getProducts()
    //     }
    // }, []);

    return (
        <>
            <Product1 tam="สินค้าพรีออเดอร์" />
            <hr />
            <hr />
            <Product2 /></>

    )
}

export default Index