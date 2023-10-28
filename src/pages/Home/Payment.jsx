import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Table } from "antd";
import {
  ArrowLeftOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

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

const Payment = () => {
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
            แจ้งชำระเงิน
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
                  href="/buyProduct"
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
                  <Title
                    level={5}
                    style={{ textAlign: "left", margin: "20px 0" }}
                  >
                    สรุปรายการสั่งซื้อ
                  </Title>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                  />
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
                  <Title
                    level={5}
                    style={{
                      textAlign: "left",
                      margin: "40px 0",
                    }}
                  >
                    แจ้งหลักฐานการโอนเงิน
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
                  padding: "20px 0",
                  borderRadius: "15px",
                  border: "5px solid #BF9F64",
                }}
              >
                <Col className="gutter-row" span={20}>
                  <Title
                    level={5}
                    style={{ textAlign: "left", margin: "20px 0" }}
                  >
                    แจ้งหลักฐานการโอนเงิน
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default Payment;
