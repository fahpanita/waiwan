import React, { useEffect } from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from "antd";
import ListStocks from "../../components/AddEvent/ListStock";

const ListStock = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><ListStocks /></Col>
      </Row >
    </>
  );
};

export default ListStock;
