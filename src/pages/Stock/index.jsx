import React, { useEffect } from "react";
import { Container } from "../Home";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import { getProducts } from "../../services/product";
import { Input, Col, Row, Divider, Layout, Typography } from "antd";
import ResponsiveNav from "../../components/Header/ResponsiveNav";
import Navbar from "../../components/Header/Navbar";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const Stock = () => {
  const { profile } = useAuth();
  console.log(profile);

  const handleGetProduct = async () => {
    const res = await getProducts();
    console.log(res.data);
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Title level={4} style={{ marginTop: "50px" }}>
            บัญชีของฉัน
          </Title>
          <Row style={{ marginTop: "50px" }}>
            <Col span={10}>
              <Image width={200} src={profile?.picture} />
              <div className="abc mb-3">ชื่อผู้ใช้: {profile?.name}</div>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default Stock;
