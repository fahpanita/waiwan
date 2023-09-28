import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Image } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LineLogin from "../../pages/Home/LineLogin";
import styled from "styled-components";
import { Img } from "../Slide/Banner";

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <Header style={{ background: "white" }}>
        <Row justify="space-between" align="middle">
          <Col xs={20} sm={20} md={8}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">หน้าแรก</Menu.Item>
              <Menu.Item key="2">รายการสินค้า</Menu.Item>
              <Menu.Item key="3">ทดลองจัดวาง</Menu.Item>
            </Menu>
          </Col>
          <Col xs={0} sm={0} md={8} align="center">
            <div className="logo" style={{ paddingLeft: "20px" }}>
              <Image width={88.61} height={40} src="image/img/Logo.png" />
            </div>
          </Col>
          <Col xs={0} sm={0} md={8}>
            <Menus theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="4">
                <LineLogin></LineLogin>
              </Menu.Item>
              <Menu.Item key="5" icon={<ShoppingCartOutlined />}></Menu.Item>
            </Menus>
          </Col>
          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="left"
          onClick={onClose}
          onClose={onClose}
          visible={visible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]}>
            <Menu.Item key="4">
              <LineLogin></LineLogin>
            </Menu.Item>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              หน้าแรก
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              รายการสินค้า
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              ทดลองจัดวาง
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

const Menus = styled(Menu)`
  justify-content: right;
`;

export default Navbar;
