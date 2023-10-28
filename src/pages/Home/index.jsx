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
    console.log(res?.data)
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  return (
    // <AuthenticatedProvider>
    <Layout
      style={{
        background: "#FFFEF6",
      }}
    >
      <Navbar />
      <BannerHome />
      <Row justify="space-evenly" style={{ marginTop: "-20px" }}>
        <Col span={5}>
          <Filter />
        </Col>
        <Col span={17}>
          <Search
            placeholder="ค้นหาสินค้าที่่ต้องการ"
            onSearch={onSearch}
            enterButton
          />
        </Col>
      </Row>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Row style={{ marginTop: "50px" }}>
          <Col span={8}>
            <Title level={4}>การ์ดความรู้เทศกาล</Title>
          </Col>
          <Col span={8} offset={8}>
            <a style={{ float: "right" }} href="/allCardEvent">
              ดูทั้งหมด
            </a>
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
        // gutter={[8, 8]}
        >
          <Col className="gutter-row" span={5}>
            <div>
              <CardEvent />
            </div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div>
              <CardEvent />
            </div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div>
              <CardEvent />
            </div>
          </Col>
        </Row>
        <Title level={4} style={{ marginTop: "50px" }}>
          สินค้าทั้งหมด
        </Title>
        <Row
          justify="space-evenly"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        // gutter={[8, 8]}
        >
          {products?.map(p => (
            <Col className="gutter-row" span={4}>
              <div>
                <CardProduct data={p} />
              </div>
            </Col>))}


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
