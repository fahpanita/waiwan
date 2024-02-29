import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Button, Tag, Space, Collapse, Form, Divider, Breadcrumb } from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FooterPage from "../../components/Footer/FooterPage";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";
// import { createBuyProduct } from "../../services/buyproduct";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/getProductSlice";
import { addCartProduct } from "../../store/AddCartProductSlice";
const { Title, Text } = Typography;
const { Content } = Layout;
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";


const DetailProduct = (props) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);
  // console.log(product)

  const [createBuyProductForm] = Form.useForm();
  const formDataBuyProduct = Form.useWatch([], createBuyProductForm);

  const dispatch = useDispatch();

  const handleBuyProduct = () => {
    dispatch(addProduct({ ...product, amount }))
  }

  const handleAddProduct = () => {
    dispatch(addCartProduct({ ...product, amount }))
  }

  const handleGetProduct = async (id) => {
    const res = await getProductId(id);
    setProduct(res?.data);
  };



  let [amount, setNum] = useState(1);

  let incNum = () => {
    if (amount < product?.stock) {
      setNum(Number(amount) + 1);
    }
  };
  let decNum = () => {
    if (amount > 1) {
      setNum(amount - 1);
    }
  }
  let handleChange = (e) => {
    setNum(e.target.value);
  }

  const btnNumberL = {
    width: "50px",
    height: "50px",
    borderRadius: "6px 0 0 6px",
    background: "#fff",
    border: "1px solid rgb(232, 232, 232)",
    color: "#a08155",
  }
  const btnNumberR = {
    width: "50px",
    height: "50px",
    borderRadius: "0 6px 6px 0",
    background: "#fff",
    border: "1px solid rgb(232, 232, 232)",
    color: "#a08155",
  }
  const textNumber = {
    width: "80px",
    height: "50px",
    minWidth: "auto",
    textAlign: "center",
    border: "1px solid rgb(232, 232, 232)",
    color: "#000",
    // border: "none",
    fontSize: "18px",
    fontWeight: "500",
    fontFamily: "'Chakra Petch', sans-serif",

  }

  useEffect(() => {
    if (id) {
      handleGetProduct(id);
    }
  }, [id]);

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Content
          style={{
            padding: "0 32px",
          }}
        >

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={'/listProduct'} style={{ textDecoration: "none" }}>รายการสินค้า</Link></Breadcrumb.Item>
            <Breadcrumb.Item>สินค้า</Breadcrumb.Item>
          </Breadcrumb>
          <Form >
            <Row
              justify="space-evenly"
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
              style={{ marginTop: " 30px", }}

            >
              <Col xs={24} sm={12} md={12} lg={10}>
                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" align="left">
                  <div class="carousel-inner">
                    <div class="carousel-item active"> <img src={`${BASE_URL}/${product?.thumbnail}`} class="rounded" /> </div>
                    <div class="carousel-item"> <img src={`${BASE_URL}/${product?.thumbnail}`} class="rounded" /> </div>
                    <div class="carousel-item"> <img src={`${BASE_URL}/${product?.thumbnail}`} class="rounded" /> </div>
                  </div>
                  <ol class="carousel-indicators list-inline" style={{ position: "static", marginTop: "5px" }}>
                    <li class="list-inline-item active"> <a id="carousel-selector-0" class="selected" data-bs-slide-to="0" data-bs-target="#myCarousel"> <Img src={`${BASE_URL}/${product?.thumbnail}`} class="img-fluid rounded" /> </a> </li>
                    <li class="list-inline-item"> <a id="carousel-selector-1" data-bs-slide-to="1" data-bs-target="#myCarousel"> <Img src={`${BASE_URL}/${product?.thumbnail}`} class="img-fluid rounded" /> </a> </li>
                    <li class="list-inline-item"> <a id="carousel-selector-2" data-bs-slide-to="2" data-bs-target="#myCarousel"> <Img src={`${BASE_URL}/${product?.thumbnail}`} class="img-fluid rounded" /> </a> </li>
                  </ol>
                </div>
              </Col>

              <Col xs={24} sm={12} md={12} lg={14} >
                <Card style={{ border: "none", padding: "20px", position: "sticky", top: "16px", boxShadow: "0 0 2px rgba(0,0,0,.15)" }}>
                  <span style={{ fontFamily: "'Athiti', sans-serif", fontSize: "34px", fontWeight: "500", marginBottom: "10px" }}>{product?.name}</span>
                  <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>{product?.detailProduct}</span>

                  <div style={{ marginTop: "14px" }}>
                    <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", marginRight: "10px" }}>ประเภทสินค้า:</span>
                    {product?.typeProduct === 'พรีออเดอร์' && (
                      <Tag color="#c9c9c9" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", padding: "4px 12px 4px 12px", borderRadius: "50px" }}
                      > {product?.typeProduct}</Tag>
                    )}
                    {product?.typeProduct === 'พร้อมส่ง' && (
                      <Tag color="#ebfed8" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", padding: "4px 12px 4px 12px", borderRadius: "50px", color: "#52c41a" }} > {product?.typeProduct}</Tag>
                    )}

                  </div>
                  <div>
                    {product.categories && product.categories.map(category => (
                      <Tag key={category.id} color="default">{category.name}</Tag>
                    ))}
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", marginRight: "10px" }}>ราคา:</span>
                    <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "24px", fontWeight: "500", }}>฿{Number(product?.price)?.toLocaleString() || "-"}</span>
                  </div>
                  <Divider />
                  <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", marginRight: "15px", }}> จำนวน: </span>
                    {
                      <div >
                        <div class="input-group" style={{ display: "flex", flexWrap: "nowrap" }}>
                          <div class="input-group-prepend">
                            <button class="btn btn-outline-primary" style={btnNumberL} type="button" shape="circle" onClick={decNum}><MinusOutlined /></button>
                          </div>
                          <input type="text" class="form-control" name="amount" value={amount} onChange={handleChange} style={textNumber} />

                          <div class="input-group-prepend">
                            <button class="btn btn-outline-primary" style={btnNumberR} type="button" shape="circle" onClick={incNum}><PlusOutlined /></button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <Divider />
                  <Space wrap >
                    <Button size="large" shape="round"
                      icon={<ShoppingCartOutlined />}
                      style={{
                        fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", color: "#A08155", border: "1px solid #A08155", width: "200px", textDecoration: "none",
                      }}
                      htmlType="submit" onClick={() => {
                        handleAddProduct()
                        navigate(`/cart`)
                      }}>
                      เพิ่มไปยังตะกร้า
                    </Button>
                    <div>
                      <Button type="primary" shape="round" size="large"
                        style={{
                          fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", background: "#bf9f64", width: "200px",
                        }}
                        htmlType="submit" onClick={() => {
                          handleBuyProduct()
                          navigate(`/buyProduct`)
                        }} >
                        ซื้อสินค้า
                      </Button>
                      {/* </Link> */}
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Form>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
            style={{ marginTop: " 16px", }}
          >
            <Col
              className="gutter-row"
              span={24}
              style={{ backgroundColor: "#fff", padding: "30px", }}
            >
              <Collapse accordion ghost
                items={[
                  {
                    key: "1",
                    label: <Text style={{ fontFamily: "'Athiti', sans-serif", fontSize: "24px", fontWeight: "500" }}>รายละเอียดสินค้า</Text>,
                    children: <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>{product?.detailProduct}</p>,
                  },
                ]}
              />
            </Col>
          </Row>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
            style={{ marginTop: " 16px", }}
          >
            <Col
              span={24}
              style={{ backgroundColor: "#fff", padding: "30px", }}
            >
              <Collapse accordion ghost
                items={[
                  {
                    key: "2",
                    label: <Text style={{ fontFamily: "'Athiti', sans-serif", fontSize: "24px", fontWeight: "500" }}>รายละเอียดการจัดส่ง</Text>,
                    children: <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>{product?.detailShipping}</p>,
                    Divider: "",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
            style={{ marginTop: "16px", marginBottom: "70px" }}
          >
            <Col
              span={24}
              style={{ backgroundColor: "#fff", padding: "30px", }}
            >
              <Collapse
                accordion
                ghost
                items={[
                  {
                    key: "3",
                    label: <Text style={{ fontFamily: "'Athiti', sans-serif", fontSize: "24px", fontWeight: "500" }}>เงื่อนไขอื่น ๆ</Text>,
                    children: <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>{product?.condition}</p>,
                  },
                ]}
              />
            </Col>
          </Row>

        </Content >
        <FooterPage />
      </Layout >
    </>
  );
};

export default DetailProduct;

export const Img = styled.img`
  
  /* height: 100px; */
  
`;
