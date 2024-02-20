import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import { Tag, Button, Col, Row, Skeleton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/AddCartProductSlice";

const CardProduct = (prop) => {
  const { data, loading = false } = prop

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const amount = 1;

  const handleAddProduct = () => {
    dispatch(addCartProduct({ product, amount }))
  }


  return (
    <>

      <Link to={`/detailProduct?id=${data?.id}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
          style={{ border: "none", borderRadius: "10px" }}
        >

          {loading ? <Skeleton.Image active={true} style={{ width: "100%", height: "240px" }} /> : <Card.Img variant="top"
            style={{ borderRadius: "10px 10px 0 0", height: "240px", objectFit: "contain" }} src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>}
          {data?.typeProduct === 'พรีออเดอร์' && (
            <Tag color="#c9c9c9" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "14px", position: "absolute", margin: "14px 0 0 14px", borderRadius: "50px" }}>
              {data?.typeProduct}
            </Tag>
          )}
          {data?.typeProduct === 'พร้อมส่ง' && (
            <Tag color="#52c41a" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "14px", position: "absolute", margin: "14px 0 0 14px", borderRadius: "50px" }}>
              {data?.typeProduct}
            </Tag>
          )}

          <Card.Body>
            <marquee class="css1" scrollamount="5">
              <div>
                {data?.event_names && data.event_names.map((n, index) => (
                  <Tag key={index} color="gold" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400", marginBottom: "4px", padding: "6px" }}>{n}</Tag>
                ))}
              </div>
            </marquee>
            <Card.Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "400", height: "40px" }}>{loading ? <Skeleton paragraph={{ rows: 1 }} title={false} /> : data?.name}</Card.Text>

            <Row>
              <Col span={22}>
                <Card.Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "20px", fontWeight: "500", }}>
                  {loading ? <Skeleton paragraph={{ rows: 1 }} title={false} /> : "฿" + (Number(data?.price)?.toLocaleString() || "-")}
                </Card.Text>
              </Col>
              <Col span={2} style={{ justifyContent: "right", display: "flex" }}>
                {/* <Button shape="circle" size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    color: "#fff", background: "#bf9f64", textDecoration: "none", border: "none", boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                  }}
                  htmlType="submit" onClick={() => {
                    handleAddProduct()
                    navigate(`/cart`)
                  }}
                >
                </Button> */}
              </Col>
            </Row>

          </Card.Body>
        </Card >
      </Link >

    </>
  );
};

export default CardProduct;
