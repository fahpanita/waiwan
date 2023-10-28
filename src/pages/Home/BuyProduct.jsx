import React, { useState } from "react";
import { Layout, Row, Col, Typography, Tabs, Table, Button } from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  ArrowLeftOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";

const columns = [
  {
    title: "ชื่อสินค้า",
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

const { Title } = Typography;
const { Content } = Layout;
const onChange = (key) => {
  console.log(key);
};

const BuyProduct = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      amount: 32,
      price: "654",
    },
    {
      key: "2",
      name: "Jim Green",
      amount: 42,
      price: "0248",
    },
    {
      key: "3",
      name: "Joe Black",
      amount: 32,
      price: "1345",
    },
  ];
  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            การจัดส่ง
          </Title>
          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={20}>
              <div>
                <a
                  style={{
                    float: "left",
                    fontSize: "24px",
                    marginTop: "-40px",
                  }}
                  href="/detailProduct"
                >
                  <ArrowLeftOutlined />
                </a>
              </div>
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
          >
            <Col className="gutter-row" span={20}>
              <TabShipping
                centered
                defaultActiveKey="1"
                items={[
                  {
                    label: (
                      <span>
                        <ShopOutlined />
                        รับที่หน้าร้าน
                      </span>
                    ),
                    key: "1",
                    children: (
                      <div>
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
                            padding: "20px 0",
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              ที่อยู่ร้านค้า
                            </Title>
                            <CardBoxAddress>12345</CardBoxAddress>
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
                            backgroundColor: "#F2F0E6",
                            marginTop: "24px",
                            padding: "20px 0",
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              <Table
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                              />
                            </Title>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <span>
                        <HomeOutlined />
                        จัดส่งตามที่อยู่
                      </span>
                    ),
                    key: "2",
                    children: (
                      <div>
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
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              ที่อยู่ร้านค้า
                            </Title>
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
                            backgroundColor: "#F2F0E6",
                            marginTop: "24px",
                          }}
                        >
                          <Col className="gutter-row" span={20}>
                            <Title level={5} style={{ textAlign: "left" }}>
                              กรุณากรอกที่อยู่จัดส่ง
                            </Title>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <a href="/payment">
              <ButtonRed
                style={{
                  marginTop: "70px",
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                ชำระเงิน
              </ButtonRed>
            </a>
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default BuyProduct;

export const CardBoxAddress = styled.div`
  border-radius: 6px;
  border: 1px solid #bf9f64;
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
    border: 2px solid #bf9f64;
    background: #fff;
    padding: 7px 45px;
  }

  &.ant-tabs .ant-tabs-ink-bar {
    background: none;
  }

  /* border-radius: 100px;

  &.ant-image .ant-image-mask {
    color: aqua !important;
  } */
`;

const ButtonRed = styled(Button)`
  border-radius: 50px;
  border: 1px solid #bf9f64;
  background: #c54142;
  padding: 6px 64px;
  color: white;

  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: white;
    border-color: #923131;
  }
`;
