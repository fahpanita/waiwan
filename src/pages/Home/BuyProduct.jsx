import React from "react";
import { Layout, Row, Col, Typography, Tabs } from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  ArrowLeftOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import FooterPage from "../../components/Footer/FooterPage";

const { Title } = Typography;
const { Content } = Layout;
const onChange = (key) => {
  console.log(key);
};

const BuyProduct = () => {
  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            การจัดส่ง
          </Title>
          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={20}>
              <div>
                <a
                  style={{
                    float: "left",
                    fontSize: "24px",
                    marginTop: "-40px",
                  }}
                  href="/detailProduct"
                >
                  <ArrowLeftOutlined />
                </a>
              </div>
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
          >
            <Col className="gutter-row" span={20}>
              <Tabs
                centered
                defaultActiveKey="1"
                items={[
                  {
                    label: (
                      <span>
                        <ShopOutlined />
                        รับที่หน้าร้าน
                      </span>
                    ),
                    key: "1",
                    children: (
                      <div>
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
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              ที่อยู่ร้านค้า
                            </Title>
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
                            backgroundColor: "#F2F0E6",
                            marginTop: "24px",
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              xcvbnm,./
                            </Title>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <span>
                        <HomeOutlined />
                        จัดส่งตามที่อยู่
                      </span>
                    ),
                    key: "2",
                    children: (
                      <div>
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
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              ที่อยู่ร้านค้า
                            </Title>
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
                            backgroundColor: "#F2F0E6",
                            marginTop: "24px",
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              กรุณากรอกที่อยู่จัดส่ง
                            </Title>
                          </Col>
                        </Row>
                      </div>
                    ),
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

export default BuyProduct;
