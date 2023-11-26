import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Button, Tag, Space, Collapse, Form, Divider } from "antd";
import Navbar from "../../components/Header/Navbar";
import { ShoppingCartOutlined } from "@ant-design/icons";
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
const { Title } = Typography;
const { Content } = Layout;
import Card from "react-bootstrap/Card";

const DetailProduct = (props) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);

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

  const btnNumber = {
    background: "#fff",
    borderRadius: "60px",
    border: "none",
    fontSize: "30px",
    width: "40px",
    height: "40px",
    color: "#C54142",
    filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.09))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  const textNumber = {
    width: "60px", minWidth: "auto", textAlign: "center",
    background: "none",
    border: "none",
    fontSize: "20px",
    fontWeight: "500",

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
          <Form >
            <Row
              justify="space-evenly"
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
              style={{
                marginTop: " 40px",
              }}
            >
              <Col className="gutter-row" span={10}>
                <Carousel axis="horizontal">
                  <div>
                    <img src={`${BASE_URL}/${product?.thumbnail}`} />
                    {/* <p className="legend">Legend 1</p> */}
                  </div>
                  <div>
                    <img src={`${BASE_URL}/${product?.thumbnail}`} />
                  </div>
                  <div>
                    <img src={`${BASE_URL}/${product?.thumbnail}`} />
                  </div>
                  <div>
                    <img src={`${BASE_URL}/${product?.thumbnail}`} />
                  </div>
                </Carousel>
              </Col>

              <Col span={14}>
                <Card style={{ border: "none", padding: "20px" }}>
                  <span style={{ fontSize: "36px", fontWeight: "600" }}>{product?.name}</span>
                  <div style={{ marginTop: "14px" }}>
                    <span style={{ fontSize: "18px", marginRight: "10px" }}>ประเภทสินค้า:</span>
                    {product?.typeProduct === 'สินค้าPreorder' && (
                      <Tag color="error" style={{ fontSize: "18px", padding: "8px", fontWeight: "500" }} > {product?.typeProduct}</Tag>
                    )}
                    {product?.typeProduct === 'สินค้าพร้อมส่ง' && (
                      <Tag color="green" style={{ fontSize: "18px", padding: "8px", fontWeight: "500" }} > {product?.typeProduct}</Tag>
                    )}

                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <span style={{ fontSize: "18px", marginRight: "10px" }}>ราคา</span>
                    <span style={{ fontSize: "24px", fontWeight: "500", color: "#c54142", }}>฿ {product?.price}</span>
                  </div>
                  <Divider />
                  <div style={{ fontSize: "20px", display: "flex", flexWrap: "nowrap" }}>
                    <span style={{ fontSize: "18px", marginRight: "15px", }}> จำนวน: </span>
                    {
                      <div className="col-xl-1">
                        <div class="input-group" style={{ display: "flex", flexWrap: "nowrap" }}>
                          <div class="input-group-prepend">
                            <button class="btn btn-outline-primary" style={btnNumber} type="button" shape="circle" onClick={decNum}>-</button>
                          </div>
                          <input type="text" class="form-control" name="amount" value={amount} onChange={handleChange} style={textNumber} />

                          <div class="input-group-prepend">
                            <button class="btn btn-outline-primary" style={btnNumber} type="button" shape="circle" onClick={incNum}>+</button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <Divider />
                  <Space wrap >
                    <Button danger shape="round" size="large"
                      icon={<ShoppingCartOutlined />}
                      style={{
                        fontSize: "20px", padding: "0 30px 0 30px", border: "1px solid #c54142", color: "#c54142", width: "220px"
                      }} htmlType="submit" onClick={() => {
                        handleAddProduct()
                        navigate(`/cart`)
                      }}>
                      เพิ่มไปยังตะกร้า
                    </Button>
                    <div>
                      <Button type="primary" shape="round" size="large"
                        style={{
                          fontSize: "20px", background: "#c54142", padding: "0 30px 0 30px", width: "220px"
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
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: " 16px",
            }}
          >
            <Col
              className="gutter-row"
              span={24}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                items={[
                  {
                    key: "1",
                    label: <Title level={4}>รายละเอียดสินค้า</Title>,
                    children: <p style={{ fontSize: "18px" }}>{product?.detailProduct}</p>,
                  },
                ]}
              />
            </Col>
          </Row>

          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: " 16px",
            }}
          >
            <Col
              span={24}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                items={[
                  {
                    key: "2",
                    label: <Title level={4}>รายละเอียดการจัดส่ง</Title>,
                    children: <p style={{ fontSize: "18px" }}>{product?.detailShipping}</p>,
                    Divider: "",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: "16px", marginBottom: "40px"
            }}
          >
            <Col
              span={24}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                items={[
                  {
                    key: "3",
                    label: <Title level={4}>เงื่อนไขอื่น ๆ</Title>,
                    children: <p style={{ fontSize: "18px" }}>{product?.condition}</p>,
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
