import React from "react";
import Menubar from "../../components/Menu/Menubar";
import AddEvents from "../../components/AddEvent/AddEvents";
import { Col, Row } from 'antd';
import Dashboards from "../../components/AddEvent/Dashboards";

const Dashboard = () => {

  return (
    <>
      <Row >
        <Col span={4}><Menubar /></Col>
        <Col span={20}><Dashboards /></Col>
      </Row >
    </>
  );
};

export default Dashboard;