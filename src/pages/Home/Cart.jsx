import React from "react";
import { Layout, Typography } from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";

const { Title } = Typography;
const { Content } = Layout;

const Cart = () => {
  return (
    <>
      <Layout
        style={{
          background: "#FFFEF6",
        }}
      >
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
        <FooterPage />
      </Layout>
    </>
  );
};

export default Cart;
