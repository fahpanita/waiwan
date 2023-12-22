import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import { Tag, Button, Col, Row } from 'antd';
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
          style={{ border: "none", borderRadius: "10px" }}
        >

          <Card.Img variant="top" style={{ borderRadius: "10px 10px 0 0" }} src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>
          {data?.typeProduct === 'พรีออเดอร์' && (
            <Tag color="#c9c9c9" style={{ position: "absolute", margin: "14px 0 0 14px", borderRadius: "50px" }}>
              {data?.typeProduct}
            </Tag>
          )}
          {data?.typeProduct === 'พร้อมส่ง' && (
            <Tag color="#7eca72" style={{ position: "absolute", margin: "14px 0 0 14px", borderRadius: "50px" }}>
              {data?.typeProduct}
            </Tag>
          )}

          <Card.Body>
            <Card.Text style={{ fontSize: "18px", fontWeight: "400", height: "40px" }}>{data?.name}</Card.Text>

            <Row>
              <Col span={22}>
                <Card.Text style={{ fontSize: "20px", fontWeight: "600", }}>฿{data?.price}</Card.Text>
              </Col>
              <Col span={2} style={{ justifyContent: "right", display: "flex" }}>
                <Button shape="circle" size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    color: "#fff",
                    // background: "linear-gradient(0deg, rgba(223,155,21,1) 0%, rgba(235,194,57,1) 100%)", 
                    background: "#bf9f64", textDecoration: "none", border: "none", boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                  }}
                // onClick={() => {
                //   handleAddProduct()
                //   navigate(`/cart`)
                // }}
                >
                </Button>
              </Col>
            </Row>

          </Card.Body>
        </Card >
      </Link >

    </>
  );
};

export default CardProduct;
