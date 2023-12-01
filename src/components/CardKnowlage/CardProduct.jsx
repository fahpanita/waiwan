import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import { Tag, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/AddCartProductSlice";

const CardProduct = (prop) => {
  const { data } = prop

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleAddProduct = () => {
  //   dispatch(addCartProduct({ ...product, amount }))
  // }
  return (
    <>
      <Link to={`/detailProduct?id=${data?.id}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
          style={{ border: "none" }}
        >
          <Card.Img variant="top" src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>
          {data?.typeProduct === 'สินค้าพรีออเดอร์' && (
            <Tag color="#C54142" style={{ position: "absolute", marginTop: "14px", borderRadius: "0px 50px 50px 0px" }}>
              {data?.typeProduct}
            </Tag>
          )}
          {data?.typeProduct === 'สินค้าพร้อมส่ง' && (
            <Tag color="#389E0D" style={{ position: "absolute", marginTop: "14px", borderRadius: "0px 50px 50px 0px" }}>
              {data?.typeProduct}
            </Tag>
          )}
          <Card.Body>
            <Card.Text style={{ fontSize: "18px", fontWeight: "400", height: "40px" }}>{data?.name}</Card.Text>
            <Card.Text style={{ fontSize: "24px", fontWeight: "500", color: "#C54142" }}>฿{data?.price}</Card.Text>
            <Button shape="circle" size="large"
              icon={<ShoppingCartOutlined />}
              style={{
                color: "#fff", backgroundColor: "#A08155", textDecoration: "none", border: "none"
              }}
            // onClick={() => {
            //   handleAddProduct()
            //   navigate(`/cart`)
            // }}
            >
            </Button>
          </Card.Body>
        </Card >
      </Link>

    </>
  );
};

export default CardProduct;
