import React from "react";
import {
  Layout,
  Button,
  Drawer,
  Row,
  Col,
  Image,
  Input,
  Typography,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import BannerListProduct from "../../components/Slide/BannerListProduct";

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const ListProduct = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Layout>
        <Navbar />
        <BannerListProduct />
        <Row justify="space-evenly" style={{ marginTop: "-20px" }}>
          <Col span={22}>
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
        ></Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default ListProduct;
