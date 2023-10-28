import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button } from "antd";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const Payment = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            แจ้งชำระเงิน
          </Title>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default Payment;
