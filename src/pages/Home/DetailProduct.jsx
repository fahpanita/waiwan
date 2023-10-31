import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  InputNumber,
  Space,
  Collapse,
  Input,
  Form,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FooterPage from "../../components/Footer/FooterPage";
import { Link, useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";
import IncDecCounter from "../../components/Button/IncDecCounter";
const { Title } = Typography;
const { Content } = Layout;

const DetailProduct = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);

  const handleGetProduct = async (id) => {
    const res = await getProductId(id);
    setProduct(res?.data);
  };



  useEffect(() => {
    if (id) {
      handleGetProduct(id);
    }
  }, [id]);



  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              backgroundColor: "#F2F0E6",
              marginTop: " 50px",
              paddingTop: "40px",
            }}
          >
            <Col className="gutter-row" span={8}>
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

            <Col className="gutter-row" span={12}>
              <Title level={2}>{product?.name}</Title>
              <div style={{ fontSize: "20px" }}>ประเภทสินค้า: <Tag color="error" > {product?.typeProduct}</Tag></div>

              <div style={{ fontSize: "20px", marginTop: "6px" }}>ราคา {product?.price} บาท</div>
              <div style={{ fontSize: "20px", marginTop: "6px" }}>
                จำนวน: {
                  <IncDecCounter />
                }
              </div>


              <Space wrap style={{ marginTop: "16px" }}>
                <Button danger icon={<ShoppingCartOutlined />} size="large">
                  เพิ่มไปยังตะกร้า
                </Button>
                <div>
                  <Link to={`/buyProduct?id=${product?.id}`}>
                    <Button type="primary" danger size="large">
                      ซื้อสินค้า
                    </Button>
                  </Link>
                </div>
              </Space>
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
              className="gutter-row"
              span={24}
              style={{
                backgroundColor: "#F2F0E6",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                // collapsible="header"
                // defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: <Title level={5}>รายละเอียดสินค้า</Title>,
                    children: <p>{product?.detailProduct}</p>,
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
              className="gutter-row"
              span={24}
              style={{
                backgroundColor: "#F2F0E6",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                // collapsible="header"
                // defaultActiveKey={["2"]}
                items={[
                  {
                    key: "2",
                    label: <Title level={5}>รายละเอียดการจัดส่ง</Title>,
                    children: <p>{product?.detailShipping}</p>,
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
              marginTop: "16px",
            }}
          >
            <Col
              className="gutter-row"
              span={24}
              style={{
                backgroundColor: "#F2F0E6",
                padding: "30px",
              }}
            >
              <Collapse
                accordion
                ghost
                // collapsible="header"
                // defaultActiveKey={["3"]}
                items={[
                  {
                    key: "3",
                    label: <Title level={5}>เงื่อนไขอื่น ๆ</Title>,
                    children: <p>{product?.condition}</p>,
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
