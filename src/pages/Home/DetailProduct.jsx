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
} from "antd";
import Navbar from "../../components/Header/Navbar";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FooterPage from "../../components/Footer/FooterPage";
import { useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";
const { Title } = Typography;
const { Content } = Layout;
const onChange = (value) => {
  console.log("changed", value);
};

const DetailProduct = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);
  // console.log(id)

  const handleGetProduct = async (id) => {
    const res = await getProductId(id);
    setProduct(res?.data);
    console.log(res?.data);
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
                  <img src="image/img/product-01.png" />
                </div>
              </Carousel>
            </Col>

            <Col className="gutter-row" span={12}>
              <Title level={4}>{product?.name}</Title>
              <div>
                ประเภทสินค้า<Tag color="error">{product?.typeProduct}</Tag>
              </div>
              <div>ราคา {product?.price} บาท</div>
              <div>
                จำนวน
                {
                  <InputNumber
                    min={1}
                    max={1000}
                    defaultValue={1}
                    onChange={onChange}
                  />
                }
              </div>

              <Space wrap>
                <Button danger icon={<ShoppingCartOutlined />}>
                  เพิ่มไปยังตะกร้า
                </Button>
                <div>
                  <a href="/buyProduct">
                    <Button type="primary" danger>
                      ซื้อสินค้า
                    </Button>
                  </a>
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
                    label: "รายละเอียดสินค้า",
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
                    label: "รายละเอียดการจัดส่ง",
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
                    label: "เงื่อนไขอื่น ๆ",
                    children: <p>{product?.condition}</p>,
                  },
                ]}
              />
            </Col>
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default DetailProduct;
