import React, { useEffect } from "react";
import AddProduct from "../../components/AddEvent/AddProduct";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from "antd";

const AddProducts = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><AddProduct /></Col>
      </Row >
    </>
  );
};

export default AddProducts;
