import React from "react";
import {
  Layout,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import FooterPage from "../../components/Footer/FooterPage";

const { Content } = Layout;

const BuyProduct = () => {
  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Content>
          123456
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default BuyProduct;
