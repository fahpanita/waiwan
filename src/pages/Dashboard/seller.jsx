import React from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from 'antd';
import SellerHome from "../../components/AddEvent/SellerHome";

const Seller = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><SellerHome /></Col>
      </Row >
    </>
  );
};

export default Seller;