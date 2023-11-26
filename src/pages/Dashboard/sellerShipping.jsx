import React from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from 'antd';
import SellerCheck from "../../components/AddEvent/SellerCheck";
import SellerShipping from "../../components/AddEvent/SellerShipping";

const Sellershipping = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><SellerShipping /></Col>
      </Row >
    </>
  );
};

export default Sellershipping;