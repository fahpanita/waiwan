import React, { useEffect } from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from "antd";
import AddCardEvent from "../../components/AddEvent/AddCardEvent";

const AddInfoEvent = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><AddCardEvent /></Col>
      </Row >
    </>
  );
};

export default AddInfoEvent;
