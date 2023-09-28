import React from "react";
import Menubar from "../../components/Menu/Menubar";
import AddEvents from "../../components/AddEvent/AddEvents";
import { Col, Row } from "antd";


const AddEvent = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><AddEvents /></Col>
      </Row >
    </>
  );
};

export default AddEvent;
