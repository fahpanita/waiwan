import React from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from 'antd';
import SellerCheck from "../../components/AddEvent/SellerCheck";

const Sellercheck = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><SellerCheck /></Col>
      </Row >
    </>
  );
};

export default Sellercheck;