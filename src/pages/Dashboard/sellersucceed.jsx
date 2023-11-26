import React from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from 'antd';
import SellerSucceed from "../../components/AddEvent/SellerSucceed";

const Sellersucceed = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><SellerSucceed /></Col>
      </Row >
    </>
  );
};

export default Sellersucceed;