import React from "react";
import { Layout, Typography } from "antd";
import Navbar from "../../components/Header/Navbar";
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const Cart = () => {
  return (
    <>
      <Layout>
        <Navbar />

        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ตะกร้าสินค้า
          </Title>
        </Content>
      </Layout>
    </>
  );
};

export default Cart;
