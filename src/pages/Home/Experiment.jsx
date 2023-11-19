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
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวางของไหว้เจ้า
          </Title>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default Experiment;
