import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography } from "antd";

const { Title } = Typography;
const { Footer, Content } = Layout;

const DetailCardEvent = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        ></Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default DetailCardEvent;
