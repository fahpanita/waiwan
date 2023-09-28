import React, { useEffect } from "react";
import Menubar from "../../components/Menu/Menubar";
import { Col, Row } from "antd";
import InfoUser from "../../components/Users/InfoUser";

const InfoUsers = () => {
  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><InfoUser /></Col>
      </Row >
    </>
  );
};

export default InfoUsers;
