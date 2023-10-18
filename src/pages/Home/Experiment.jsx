import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button } from "antd";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const Experiment = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวาง
          </Title>
        </Content>
      </Layout>
    </>
  );
};

export default Experiment;
