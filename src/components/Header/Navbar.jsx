import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Image, Input } from "antd";
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

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <Header
        style={{
          background: "#fff",
          position: "sticky",
          height: "auto",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col xs={0} sm={0} md={2}>
            <Image preview={false} width={100} src="image/img/Logo.png" />
          </Col>
          <Col
            xs={0}
            sm={0}
            md={17}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              textDecoration: "none",
            }}
          >
            <Search
              placeholder="ค้นหาสินค้าในไหว้วาน"
              onSearch={onSearch}
              enterButton
            />
          </Col>
          <Col xs={0} sm={0} md={1}>
            <LineLogin></LineLogin>
          </Col>
          <Col xs={0} sm={0} md={1}>
            <Link to="/cart" style={{ color: "#000", fontSize: "16px" }}>
              {<ShoppingCartOutlined />}
            </Link>
          </Col>

          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col xs={0} sm={20} md={8}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    fontFamily: "Chakra Petch, sans- serif",
                  }}
                >
                  หน้าแรก
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/listProduct" style={{ textDecoration: "none" }}>
                  รายการสินค้า
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/experiment" style={{ textDecoration: "none" }}>
                  ทดลองจัดวางของไหว้เจ้า
                </Link>
              </Menu.Item>
            </Menu>
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
            <Menu.Item key="7" icon={<HomeOutlined />}>
              <Link to="/" style={{ textDecoration: "none" }}>
                หน้าแรก
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<UnorderedListOutlined />}>
              <Link to="/listProduct" style={{ textDecoration: "none" }}>
                รายการสินค้า
              </Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<ExperimentOutlined />}>
              <Link to="/experiment" style={{ textDecoration: "none" }}>
                ทดลองจัดวาง
              </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<ShoppingCartOutlined />}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                ตะกร้าสินค้า
              </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <LineLogin></LineLogin>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </>
  );
};

const Menus = styled(Menu)`
  justify-content: right;
`;

export default Navbar;
