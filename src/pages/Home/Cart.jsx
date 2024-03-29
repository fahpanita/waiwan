import React, { useState } from "react";
import { Layout, Typography, Row, Col, Table, Tabs, Button, Image, Divider, Space, Dropdown, Breadcrumb, } from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constands/api";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartProduct, updateAmountproduct } from "../../store/AddCartProductSlice";
import { useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const Cart = () => {

  const { addCartProduct } = useSelector((state) => ({ ...state }))


  const dispatch = useDispatch();

  const removeItem = (product) => {
    dispatch(deleteCartProduct(product.key));
  };

  const [amount, setAmount] = useState('');

  const handleClick = (id, type) => {
    dispatch(updateAmountproduct({ id, type }));
  };

  const columns = [
    {
      title: "สินค้า",
      dataIndex: "thumbnail",
    },
    // {
    //   dataIndex: "name",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "แก้ไข",
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", color: "#c54142", border: "1px solid #c54142", }} onClick={() => removeItem(record)}>ลบ</Button>
        </Space>
      ),
    },
  ];

  const btnNumberL = {
    width: "40px",
    height: "40px",
    borderRadius: "6px 0 0 6px",
    background: "#fff",
    border: "1px solid rgb(232, 232, 232)",
    color: "#a08155",
    position: "static",
  }
  const btnNumberR = {
    width: "40px",
    height: "40px",
    borderRadius: "0 6px 6px 0",
    background: "#fff",
    border: "1px solid rgb(232, 232, 232)",
    color: "#a08155",
    position: "static",
  }
  const textNumber = {
    height: "40px",
    minWidth: "auto",
    textAlign: "center",
    border: "1px solid rgb(232, 232, 232)",
    color: "#000",
    fontSize: "18px",
    fontWeight: "500",
    fontFamily: "'Chakra Petch', sans-serif",
  }
  const data = addCartProduct?.product?.map(p => {
    return {
      key: p?.id,
      thumbnail:
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col xs={24} sm={16} md={16} lg={6}>
            <img src={`${BASE_URL}/${p?.thumbnail}`} style={{ width: "70px" }} />
          </Col>
          <Col xs={24} sm={16} md={16} lg={8}>
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400" }}>{p?.name}</div>
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>฿{p?.amount * p?.price}</div>
          </Col>
          <Col xs={24} sm={16} md={16} lg={6}>
            <div class="input-group" style={{ display: "flex", flexWrap: "nowrap " }}>
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" style={btnNumberL} type="button" shape="circle" onClick={() => handleClick(p?.id, 'down')}><MinusOutlined /></button>
              </div>
              <input
                type="text"
                className="form-control"
                name="amount"
                value={p?.amount}
                style={textNumber}
              />
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" style={btnNumberR} type="button" shape="circle" onClick={() => handleClick(p?.id, 'up')}><PlusOutlined /></button>
              </div>
            </div>
          </Col>
        </Row>,
      // name: <div></div>,
    }
  });

  const totalPrice = addCartProduct?.product?.reduce((accumulator, product) => {
    return accumulator + Number(product?.price) * product?.amount;
  }, 0);

  const formattedTotalPrice = totalPrice.toFixed(2);

  const sortedProducts = addCartProduct?.product?.slice(); // Create a shallow copy
  sortedProducts.sort((a, b) => {
    return Number(b.typeShipping) - Number(a.typeShipping);
  });

  const shipping = sortedProducts[0]?.typeShipping;

  const totalWithShipping = Number(totalPrice) + Number(shipping);
  const formattedTotal = totalWithShipping.toFixed(2);

  return (
    <>
      <Layout style={{ background: "#F5F5F5", }}>
        <Navbar />

        <Content style={{ padding: "0 32px", marginBottom: "280px" }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>
            <Breadcrumb.Item>ตะกร้าสินค้า</Breadcrumb.Item>
          </Breadcrumb>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center" style={{ display: "flex", alignItems: "flex-start", marginBottom: "70px" }}>
            <Col xs={24} sm={16} md={16} lg={16}>
              <CardBoxRadius>
                <Title level={5} style={{ textAlign: "left" }}>
                  <TableCart
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                  />
                </Title>
              </CardBoxRadius>
            </Col>

            <Col xs={24} sm={8} md={8} lg={8} style={{ position: "sticky", bottom: "16px" }}>
              <CardBoxRadius >
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>สรุปรายการสั่งซื้อ</Text>
                <Dividers />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>ยอดรวม</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>฿{formattedTotalPrice}</div>
                  </Col>
                </Row>
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ค่าจัดส่ง</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>฿{shipping}</div>
                  </Col>
                </Row>
                <Dividers />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>ยอดรวมทั้งสิ้น</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "20px", fontWeight: "500", color: "#C54142" }}>฿{formattedTotal}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Link to={"/buyProductCart"} >
                      <Button type="primary" shape="round" size="large"
                        style={{ background: "#bf9f64", width: "100%", marginTop: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}
                      >
                        สั่งซื้อสินค้า
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardBoxRadius>

            </Col>
          </Row>

        </Content>
        <FooterPage />
      </Layout >
    </>
  );
};

export default Cart;

export const CardBoxAddress = styled.div`
  border-radius: 6px;
  border: 1px solid #bf9f64;
`;

export const CardBoxRadius = styled.div`
border-radius: 13px;
background: #FFF;
/* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09); */
box-shadow: 0 0 2px rgba(0,0,0,.15);
margin: 10px;
padding: 16px;
`;

export const TableCart = styled(Table)`

  &.ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    font-family: 'Chakra Petch', sans-serif;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const TabShipping = styled(Tabs)`
  &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active {
    color: white;
    border-radius: 50px;
    background: #bf9f64;
  }

  &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
  }

  &.ant-tabs .ant-tabs-tab:hover {
    color: white;
    background: #bf9f64;
  }

  &.ant-tabs .ant-tabs-tab {
    border-radius: 50px;
    border: 1px solid #bf9f64;
    background: #fff;
    padding: 6px 35px;
    font-size: 16px;
  }

  &.ant-tabs .ant-tabs-ink-bar {
    background: none;
  }
`;

export const Dividers = styled(Divider)`
&.ant-divider-horizontal {
  margin: 10px 0;
}
`;
