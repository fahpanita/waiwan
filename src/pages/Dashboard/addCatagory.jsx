import React, { useEffect } from "react";
import AddCatagories from "../../components/AddEvent/AddCatagories";
import { Col, Row } from "antd";
import Menubar from "../../components/Menu/Menubar";

const AddCatagorys = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><AddCatagories /></Col>
      </Row >
    </>
  );
};

export default AddCatagorys;
