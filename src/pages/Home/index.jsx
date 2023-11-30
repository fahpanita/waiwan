import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Input,
  Col,
  Row,
  Layout,
  Typography,
  Divider,
  Card,
  Statistic,
  Image,
} from "antd";
import Filter from "../../components/Tree/Filter";
import CardEvent from "../../components/CardKnowlage/CardEvent";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import Navbar from "../../components/Header/Navbar";
import BannerHome from "../../components/Slide/BannerHome";
import FooterPage from "../../components/Footer/FooterPage";
import { getProducts } from "../../services/product";
import { getCartEvents } from "../../services/cartEvents";
import { RightCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;
export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const Home = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const res = await getProducts();
    setProducts(res?.data);
  };

  const [cardevents, setCartEvents] = useState([]);

  const handleGetCartEvents = async () => {
    const res = await getCartEvents();
    setCartEvents(res?.data);
  };

  useEffect(() => {
    handleGetProducts(), handleGetCartEvents();
  }, []);

  return (
    // <AuthenticatedProvider>
    <Layout
      style={{
        background: "#F5F5F5",
      }}
    >
      <Navbar />
      <Content
        style={{
          padding: "0 32px",
        }}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
          justify="space-evenly"
          style={{ marginTop: "32px" }}
        >
          <Col className="gutter-row" span={15}>
            <BannerHome />
          </Col>
          <Col className="gutter-row" span={9} style={{ display: "flex" }}>
            <Row justify="space-between">
              <Col >
                <Img src="image/img/frame-1.png" />
              </Col>
              <Col style={{ display: "flex" }}>
                <Img src="image/img/frame-2.png" />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Col span={24}>
            <Title level={3}>หมวดหมู่</Title>
          </Col>
          <Col span={24} offset={0}>
            <div
              style={{
                backgroundColor: "#fff",
                height: "auto",
                padding: "20px 0",
              }}
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Col span={24} className="gutter-row" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-start" }}>
                  <Row span={6} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
                    <Col >
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image src="image/img/image 136.png" preview={false} />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>อาหารสด</div>
                    </Col>
                  </Row>

                  <Row span={6} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
                    <Col >
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image src="image/img/image 135.png" preview={false} />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>ขนมหวาน</div>
                    </Col>
                  </Row>

                  <Row span={6} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
                    <Col >
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image src="image/img/image 134.png" preview={false} />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>ผลไม้</div>
                    </Col>
                  </Row>

                  <Row span={6} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
                    <Col>
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image src="image/img/image 133.png" preview={false} />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>อื่น ๆ</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "40px", marginBottom: "10px" }}>
          <Col span={8}>
            <Title level={3}>สินค้าสำหรับคุณ</Title>
          </Col>
          <Col span={8} offset={8}>
            <a
              style={{
                float: "right",
                textDecoration: "none",
                color: "#1D1D1F",
              }}
              href="/listProduct"
            >
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>

        <Row
          justify="flex-start"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
        >
          {products?.map((p) => (
            <Col className="gutter-row" span={4} style={{ marginBottom: "20px" }}>
              <CardProduct data={p} />
            </Col>
          ))}
        </Row>

        <Divider dashed style={{ marginTop: "40px" }} />

        <Row style={{ marginTop: "40px", marginBottom: "10px" }}>
          <Col span={8}>
            <Title level={3}>บทความเทศกาล</Title>
          </Col>
          <Col span={8} offset={8}>
            <a
              style={{
                float: "right",
                textDecoration: "none",
                color: "#1D1D1F",
              }}
              href="/allCardEvent"
            >
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>

        <Row
          justify="flex-start"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
        // style={{ marginBottom: "40px" }}
        >
          {cardevents?.map((c) => (
            <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <div>
                <CardEvent datacard={c} />
              </div>
            </Col>
          ))}
        </Row>
      </Content>
      <FooterPage />
    </Layout>
    // </AuthenticatedProvider>
  );
};

export const Cardcatagory = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Home;
