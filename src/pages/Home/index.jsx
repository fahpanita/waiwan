import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Input,
  Space,
  Image,
  Select,
  Card,
  Col,
  Row,
  Divider,
  Layout,
} from "antd";
import Banner from "../../components/Slide/Banner";
import Filter from "../../components/Tree/Filter";
import Navbars from "../../components/Header/ResponsiveNav";
import ResponsiveNav from "../../components/Header/ResponsiveNav";
import CardEvent from "../../components/CardKnowlage/CardEvent";
import CardProduct from "../../components/CardKnowlage/CardProduct";

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    // <AuthenticatedProvider>
    <Layout>
      <Content>
        <ResponsiveNav />
        <Banner />
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

        <Divider orientation="left">เทรนด์นิยมช่วงนี้</Divider>
        <Row justify="space-evenly">
          <Col span={3}>
            <CardEvent />
          </Col>
          <Col span={3}>
            <CardEvent />
          </Col>
          <Col span={3}>
            <CardEvent />
          </Col>
        </Row>

        <Divider orientation="left">สินค้ายอดนิยม</Divider>
        <Row justify="space-evenly">
          <Col span={3}>
            <CardProduct />
          </Col>
          <Col span={3}>
            <CardProduct />
          </Col>
          <Col span={3}>
            <CardProduct />
          </Col>
          <Col span={3}>
            <CardProduct />
          </Col>
          <Col span={3}>
            <CardProduct />
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
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
