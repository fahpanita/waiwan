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
      dataIndex: "thumbnail",
    },
    {
      title: "สินค้า",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "จำนวน",
      dataIndex: "amount",
    },
    {
      title: "ราคา",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button danger onClick={() => removeItem(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const btnNumber = {
    background: "#fff",
    borderRadius: "60px",
    border: "none",
    fontSize: "30px",
    width: "40px",
    height: "40px",
    color: "#C54142",
    filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.09))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  const textNumber = {
    width: "60px", minWidth: "auto", textAlign: "center",
    background: "none",
    border: "none",
    fontSize: "20px",
    fontWeight: "500",

  }


  const data = addCartProduct?.product?.map(p => {
    return {
      key: p?.id,
      thumbnail: <img src={`${BASE_URL}/${p?.thumbnail}`} style={{ width: "70px" }} />,
      name: p?.name,
      amount: <div class="input-group" style={{ display: "flex", flexWrap: "nowrap" }}>
        <div class="input-group-prepend">
          <button class="btn btn-outline-primary" style={btnNumber} type="button" shape="circle" onClick={() => handleClick(p?.id, 'down')}>-</button>
        </div>
        <input
          type="text"
          className="form-control"
          name="amount"
          value={p?.amount}
          style={textNumber}
        />
        <div class="input-group-prepend">
          <button class="btn btn-outline-primary" style={btnNumber} type="button" shape="circle" onClick={() => handleClick(p?.id, 'up')}>+</button>
        </div>
      </div>,
      price: <div>{p?.amount * p?.price}</div>,
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

        <Content style={{ margin: '24px 24px 0', }}>
          <Row>
            <Col span={16}>

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
            <Col span={8}>

              <CardBoxRadius>
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
                    <div style={{ fontSize: "24px", fontWeight: "400", color: "#C54142" }}>฿ {formattedTotal}</div>
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
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
padding: 16px;
`;

export const Tables = styled(Table)`
  &.ant-table-wrapper .ant-table-thead > tr > td {
    width: 100px;
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
