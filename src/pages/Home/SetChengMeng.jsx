import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Card } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import ImageDropZone from "../../components/game/ImageDropZone";

const { Title } = Typography;
const { Content } = Layout;

const SetChengMeng = () => {


  return (
    <>
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center", marginBottom: "20px" }}>
            ชุดไหว้เช้งเม้ง
          </Title>
          <ImageDropZone />
        </Content>
        <FooterPage />


      </Layout>
    </>
  );
};

export default SetChengMeng;
