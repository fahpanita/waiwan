import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LineLogin from "../../pages/Home/LineLogin";
import styled from "styled-components";
const { Header } = Layout;

export const Img = styled.img`
  width: 100%;
`;

const ResponsiveNav = () => {
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
        <Row justify="center">
          <Col xs={0} sm={18} md={18}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">หน้าแรก</Menu.Item>
              <Menu.Item key="2">รายการสินค้า</Menu.Item>
              <Menu.Item key="3">ทดลองจัดวาง</Menu.Item>
            </Menu>
          </Col>
          <Col xs={0} sm={4} md={4}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="4">
                <LineLogin></LineLogin>
              </Menu.Item>
              <Menu.Item key="5" icon={<ShoppingCartOutlined />}></Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
          <Col span={2} offset={18}>
            <ShoppingCartOutlined />
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="left"
          onClick={onClose}
          onClose={onClose}
          // visible={visible}
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

export default ResponsiveNav;
