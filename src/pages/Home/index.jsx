import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Col, Row, Layout, Typography, Divider } from "antd";
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

const Home = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const res = await getProducts()
    setProducts(res?.data)
  }

  const [cardevents, setCartEvents] = useState([]);

  const handleGetCartEvents = async () => {
    const res = await getCartEvents()
    setCartEvents(res?.data)
  }

  useEffect(() => {
    handleGetProducts(),
      handleGetCartEvents()
  }, [])

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
        <Row style={{
          marginTop: "32px"
        }}>
          <Col span={24}>
            <BannerHome />
          </Col>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Col span={24}>
            <Title level={3}>หมวดหมู่</Title>
          </Col>
          <Col span={24} offset={0} >
            <div style={{ backgroundColor: "#fff", height: "168px" }}>sdfghj</div>
          </Col>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Col span={8}>
            <Title level={3}>สินค้าเพื่อคุณโดยเฉพาะ</Title>
          </Col>
          <Col span={8} offset={8}>
            <a style={{ float: "right", textDecoration: "none", color: "#1D1D1F" }} href="/listProduct">
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>

        <Row
          justify="flex-start"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {products?.map(p => (
            <Col className="gutter-row" span={4}>
              <div style={{ marginTop: "10px", }}>
                <CardProduct data={p} />
              </div>
            </Col>
          ))}
        </Row>

        <Divider dashed style={{ marginTop: "50px" }} />

        <Row style={{ marginTop: "40px" }}>
          <Col span={8}>
            <Title level={4}>บทความเทศกาล</Title>
          </Col>
          <Col span={8} offset={8}>
            <a style={{ float: "right", textDecoration: "none", color: "#1D1D1F" }} href="/allCardEvent">
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>
        <Row
          justify="center"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          style={{ marginBottom: "40px" }}
        >
          {cardevents?.map(c => (
            <Col className="gutter-row" span={5} style={{ marginTop: "20px" }}>
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

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  .font-36 {
    font-family: "Athiti", sans-serif;
    font-size: 36px;
  }
`;

// export const Img = styled.img`
//   width: 100%;
// `;

// export const Card = styled.img`
//   width: 32%;
//   float: left;
// `;

// export const Icon = styled.img`
//   width: 36px;
//   float: left;
// `;

// export const Imgrounder = styled(Image)`
//   border-radius: 100px;

//   &.ant-image .ant-image-mask {
//     color: aqua !important;
//   }
// `;

export default Home;
