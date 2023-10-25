import React from "react";
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
const { Title } = Typography;
const { Content } = Layout;
const onChange = (value) => {
  console.log("changed", value);
};

const text = `no data `;

const DetailProduct = () => {
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
                  <img src="image/img/product-01.png" />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                  <img src="image/img/product-01.png" />
                </div>
                <div>
                  <img src="image/img/product-01.png" />
                </div>
                <div>
                  <img src="image/img/product-01.png" />
                </div>
                <div>
                  <img src="image/img/product-01.png" />
                </div>
              </Carousel>
            </Col>

            <Col className="gutter-row" span={12}>
              <Title level={4}>ซาลาเปา 6 ลูก</Title>
              <div>
                ประเภทสินค้า<Tag color="error">{"สินค้าพรีออเดอร์"}</Tag>
              </div>
              <div>ราคา {"80.00"} บาท</div>
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
                <Button type="primary" danger to="/">
                  ซื้อสินค้า
                </Button>
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
                    children: <p>{text}</p>,
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
                    children: <p>{text}</p>,
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
                    children: <p>{text}</p>,
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
