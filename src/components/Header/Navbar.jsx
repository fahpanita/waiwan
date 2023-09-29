import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Image } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import LineLogin from "../../pages/Home/LineLogin";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <Col xs={0} sm={20} md={8}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/" style={{ textDecoration: "none" }}>
                  หน้าแรก
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/listProduct" style={{ textDecoration: "none" }}>
                  รายการสินค้า
                </Link>
              </Menu.Item>
              <Menu.Item key="3">ทดลองจัดวาง</Menu.Item>
            </Menu>
          </Col>
          <Col xs={0} sm={0} md={8} align="center">
            <Image preview={false} width={88.61} src="image/img/Logo.png" />
          </Col>
          <Col xs={0} sm={0} md={8}>
            <Menus theme="light" mode="horizontal">
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
          <Menu mode="vertical">
            <Menu.Item key="8" icon={<HomeOutlined />}>
              <Link to="/" style={{ textDecoration: "none" }}>
                หน้าแรก
              </Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<UnorderedListOutlined />}>
              <Link to="/listProduct" style={{ textDecoration: "none" }}>
                รายการสินค้า
              </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<ExperimentOutlined />}>
              ทดลองจัดวาง
            </Menu.Item>
            <Menu.Item key="7" icon={<ShoppingCartOutlined />}>
              ตะกร้าสินค้า
            </Menu.Item>
            <Menu.Item key="6">
              <LineLogin></LineLogin>
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
