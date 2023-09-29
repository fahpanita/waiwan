import React from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Image } from "antd";
import Navbar from "../../components/Header/Navbar";
import BannerHome from "../../components/Slide/BannerHome";

const { Header, Footer, Sider, Content } = Layout;

const ListProduct = () => {
  return (
    <>
      <Layout>
        <Content>
          <Navbar />
          <BannerHome />
          {/* <Row justify="space-evenly" style={{ marginTop: "-20px" }}>
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
          </Row> */}
        </Content>
      </Layout>
    </>
  );
};

export default ListProduct;
