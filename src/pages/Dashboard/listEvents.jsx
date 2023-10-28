import React, { useEffect } from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from "antd";
import ListEvent from "../../components/AddEvent/ListEvent";

const ListEvents = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><ListEvent /></Col>
      </Row >
    </>
  );
};

export default ListEvents;
