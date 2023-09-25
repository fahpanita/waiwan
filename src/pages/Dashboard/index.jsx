import React from "react";
import Menubar from "../../components/Menu/Menubar";
import AddEvents from "../../components/AddEvent/AddEvents";
import { Layout, Typography, Col, Row } from 'antd';

const Dashboard = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><AddEvents /></Col>
      </Row >
    </>
  );
};

export default Dashboard;