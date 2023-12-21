import React, { useState } from "react";
import { Layout, Typography, Row, Col, Table, Tabs, Button, Image, Divider, Space, Dropdown, } from "antd";
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
          <Button style={{ color: "#c54142", border: "1px solid #c54142" }} onClick={() => removeItem(record)}>ลบ</Button>
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
    color: "#000",
    position: "static",
  }
  const btnNumberR = {
    width: "40px",
    height: "40px",
    borderRadius: "0 6px 6px 0",
    background: "#fff",
    border: "1px solid rgb(232, 232, 232)",
    color: "#000",
    position: "static",
  }
  const textNumber = {
    height: "40px",
    minWidth: "auto",
    textAlign: "center",
    border: "1px solid rgb(232, 232, 232)",
    color: "#c54142",
    fontSize: "18px",
    fontWeight: "500",
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
            <div style={{ fontSize: "18px", }}>{p?.name}</div>
            <div style={{ fontSize: "18px", }}>฿{p?.amount * p?.price}</div>
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
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content style={{ margin: '24px 24px 0', }} >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center" style={{ display: "flex", alignItems: "flex-start" }}>
            <Col xs={24} sm={16} md={16} lg={16}>
              <CardBoxRadius>
                <Title level={5} style={{ textAlign: "left" }}>
                  <Tables
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                  />
                </Title>
              </CardBoxRadius>
            </Col>

            <Col xs={24} sm={8} md={8} lg={8} style={{ position: "sticky", bottom: "16px" }}>
              <CardBoxRadius >
                <Title level={5}>สรุปรายการสั่งซื้อ</Title>
                <Dividers />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวม</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>฿ {formattedTotalPrice}</div>
                  </Col>
                </Row>
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>ค่าจัดส่ง</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>฿ {shipping}</div>
                  </Col>
                </Row>
                <Dividers />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวมทั้งสิ้น</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "24px", fontWeight: "600", color: "#C54142" }}>฿ {formattedTotal}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Link to={"/buyProductCart"} >
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{
                          background: "#c54142",
                          width: "100%",
                          marginTop: "20px",
                          fontSize: "20px",
                          padding: "0 30px 0 30px"
                        }}
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

export const Tables = styled(Table)`
  &.ant-table-wrapper .ant-table-thead > tr > td {
    /* width: 100px; */
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
