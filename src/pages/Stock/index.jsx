import React, { useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import { Input, Col, Row, Divider, Layout, Typography } from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";

const { Content } = Layout;
const { Title } = Typography;

const boxSum = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Stock = () => {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <>
      <Layout style={{
        background: "#F5F5F5",
      }}>
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            บัญชีของฉัน
          </Title>
          <Row style={{ marginTop: "50px" }}>
            <Col span={10} style={boxSum}>
              <Image width={200} src={profile?.picture} />
              <div className="abc mb-3">ชื่อผู้ใช้: {profile?.name}</div>
            </Col>
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default Stock;
