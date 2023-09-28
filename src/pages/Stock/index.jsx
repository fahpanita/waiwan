import React, { useEffect } from "react";
import { Container } from "../Home";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import { getProducts } from "../../services/product";
import { Input, Col, Row, Divider, Layout } from "antd";
import ResponsiveNav from "../../components/Header/ResponsiveNav";
import Navbar from "../../components/Header/Navbar";

const { Header, Footer, Sider, Content } = Layout;

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
        <Content>
          <Navbar />
          <Row justify="center">
            <div className="">บัญชีของฉัน</div>
            <div className="abc">ชื่อผู้ใช้ {profile?.displayName}</div>
            <Image width={200} src={profile?.pictureUrl} />
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Stock;
