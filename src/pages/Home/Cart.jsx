import React, { useState } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Table,
  Tabs,
  Button,
  Image,
  Divider,
  Space,
  Dropdown,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import IncDecCounter from "../../components/Button/IncDecCounter";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constands/api";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/buyproduct";
import { addProduct, getProductSlice } from "../../store/getProductSlice";

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
];
const { Title, Text } = Typography;
const { Content } = Layout;
const items = [
  {
    key: "3",
    label: "สัปดาห์นี้",
  },
  {
    key: "4",
    label: "เดือนนี้",
  },
  {
    key: "5",
    label: "ปีนี้",
  },
];
const boxSum = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
};

const headFitler = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  marginTop: "30px",
};

const Cart = () => {

  const { addCartProduct } = useSelector((state) => ({ ...state }))

  console.log(addCartProduct, "1234")

  const data = addCartProduct?.product?.map(p => {
    return {
      key: "1",
      thumbnail: <img src={`${BASE_URL}/${p?.thumbnail}`} style={{ width: "70px" }} />,
      name: p?.name,
      amount: <div>{p?.amount}</div>,
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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleBuyProduct = () => {

    dispatch(addProduct(addCartProduct?.product))
  }
  return (
    <>
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content
          style={{
            padding: "0 32px",
          }}
        >
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ตะกร้าสินค้า
          </Title>
          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col span={20}>
              <a
                style={{
                  float: "left",
                  fontSize: "24px",
                  marginTop: "-40px",
                }}
              >
                <ArrowLeftOutlined />
              </a>
            </Col>
          </Row>

          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: "30px",
            }}
          >
            <Col span={20}>
              <TabShipping
                centered
                defaultActiveKey="1"
                items={[
                  {
                    label: <span>สั่งซื้อสินค้า</span>,
                    key: "1",
                    children: (

                      <div >
                        <Row
                          justify="space-evenly"
                          gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                          }}
                          style={{
                            backgroundColor: "#F2F0E6",
                            marginTop: "24px",
                            padding: "20px 0",
                          }}
                        >
                          <Col span={23}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              <Tables
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                              />
                            </Title>
                          </Col>
                          <Divider dashed />
                          <Col span={23} style={boxSum}>
                            <div>ยอดรวมสินค้า</div>
                            <div style={{ fontSize: "20px", fontWeight: "400" }}>฿ {formattedTotalPrice}</div>

                          </Col>
                          <Divider dashed />
                          <Col span={23} style={boxSum}>
                            <div>ค่าจัดส่ง</div>
                            <div style={{ fontSize: "20px", fontWeight: "400" }}>฿ {shipping}</div>
                          </Col>

                          <Divider dashed />
                          <Col span={23} style={boxSum}>
                            <div>การชำระเงินทั้งหมด</div>
                            <div style={{ fontSize: "24px", fontWeight: "500" }}>฿ {formattedTotal}</div>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },

                  {
                    label: <span>รายการสินค้าพรีออเดอร์</span>,
                    key: "2",
                    children: (
                      <div>
                        <div style={headFitler}>
                          <Title level={4}>การสั่งซื้อ</Title>
                          <Dropdown
                            menu={{
                              items,
                              selectable: true,
                              defaultSelectedKeys: ["3"],
                            }}
                          >
                            <Typography.Link>
                              <Space>
                                ตัวเลือก
                                <DownOutlined />
                              </Space>
                            </Typography.Link>
                          </Dropdown>
                        </div>

                      </div>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
          <Row justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: "30px",
            }}>
            <Col
              style={{
                display: "contents",
              }}
            >
              <Button
                type="primary"
                shape="round"
                size="large"
                style={{
                  background: "#c54142",
                  padding: "0 30px 0 30px",
                }}
                onClick={() => {
                  handleBuyProduct()
                  navigate(`/buyProduct`)
                }}
              >
                ชำระเงิน
              </Button>
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

// const ButtonRed = styled(Button)`
//   border-radius: 50px;
//   border: 1px solid #bf9f64;
//   background: #c54142;
//   padding: 6px 64px;
//   color: white;

//   &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
//     color: white;
//     border-color: #923131;
//   }
// `;
