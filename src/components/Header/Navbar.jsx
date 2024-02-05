import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Image, Input } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  ExperimentOutlined,
  UserOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import LineLogin from "../../pages/Home/LineLogin";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";


const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { SearchStyle } = Input;
  // const onSearch = (value, _e, info) => {
  //   console.log(info?.source, value);

  //   const filteredProducts = products.filter(product =>
  //     product.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setProducts(filteredProducts);

  //   navigate('/listProduct')
  // };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = (value) => {
    // Set the search query in state before filtering
    setSearchQuery(value);

    navigate('/listProduct', { state: { searchQuery: value } });
  };

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
            <Image preview={false} width={100} src="/image/img/Logo.png" />
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
            <SearchInput
              placeholder="ค้นหาสินค้าในไหว้วาน"
              onSearch={onSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              enterButton
            />
          </Col>
          <Col xs={0} sm={0} md={1}>
            <LineLogin></LineLogin>
          </Col>
          <Col xs={0} sm={0} md={1} style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link to="/cart" style={{ color: "#000", fontSize: "20px" }}>
              {<ShoppingCartOutlined />}
            </Link>
          </Col>

          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer} style={{ background: "#bf9f64" }}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col xs={0} sm={20} md={8}>
            <Menus theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link
                  to="/"
                  style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}
                >
                  หน้าแรก
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/listProduct" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                  รายการสินค้า
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/experiment" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                  ทดลองจัดวางของไหว้เจ้า
                </Link>
              </Menu.Item>
            </Menus>
          </Col>
        </Row>

        <Drawer
          title="เมนู"
          placement="left"
          onClick={onClose}
          onClose={onClose}
          visible={visible}
        >
          <Menu mode="vertical">
            <Menu.Item key="7" icon={<HomeOutlined />}>
              <Link to="/" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                หน้าแรก
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<UnorderedListOutlined />}>
              <Link to="/listProduct" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                รายการสินค้า
              </Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<ExperimentOutlined />}>
              <Link to="/experiment" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                ทดลองจัดวาง
              </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<UserOutlined />} >
              <Link to="/stock" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }} >
                บัญชีผู้ใช้
              </Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<ContainerOutlined />} >
              <Link to="/stocklist" style={{ textDecoration: "none", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }} >
                รายการที่ต้องชำระ
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <LineLogin ></LineLogin>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header >
    </>
  );
};

export const Menus = styled(Menu)`
  justify-content: right;
  &.ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected {
    color: #a08155;
    /* background: #bf9f64; */
    text-decoration: none;
  }
  &.ant-menu-overflow-item .ant-menu-item .ant-menu-item-selected .ant-menu-item-only-child {
    color: #a08155;
    /* background: #bf9f64; */
    text-decoration: none;
  }
  &.ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected::after {
    border-bottom-color: #bf9f64;
  }
`;

export const SearchInput = styled(Search)`
  text-decoration: none;
  
  &.ant-input-search >.ant-input-group >.ant-input-group-addon:last-child .ant-input-search-button {
    color: white;
    background: #bf9f64;
    height: 34.74px;
    font-size: 18px;
  }
  &.css-dev-only-do-not-override-qgg3xn .ant-input-group >.ant-input:first-child{
    font-family: 'Chakra Petch', sans-serif;
    font-size: 16px;
}
`;


export default Navbar;

