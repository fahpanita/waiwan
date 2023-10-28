import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button } from "antd";
import FooterPage from "../../components/Footer/FooterPage";

const { Title } = Typography;
const { Content } = Layout;

const Experiment = () => {
  return (
    <>
      <Layout
        style={{
          background: "#FFFEF6",
        }}
      >
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวาง
          </Title>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default Experiment;
