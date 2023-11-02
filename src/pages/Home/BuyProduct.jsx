import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Tabs,
  Table,
  Button,
  Divider,
  Form,
  Input,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  ArrowLeftOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";
import MapShop from "../../components/maps/MapShop";
import { useSelector } from "react-redux";

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

const { Title } = Typography;
const { Content } = Layout;
const boxWhite = {
  margin: "10px 0",
  padding: "20px",
  backgroundColor: "#fff",
  border: "1px solid #BF9F64",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "center",
};
const boxSum = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
};

const BuyProduct = (props) => {

  const { getProduct } = useSelector((state) => ({ ...state }))
  console.log(getProduct?.product)

  const data = getProduct?.product?.map(p => {
    return {
      key: "1",
      thumbnail: <img src={`${BASE_URL}/${p?.product?.thumbnail}`} style={{ width: "70px" }} />,
      name: p?.product?.name,
      amount: <div>{p?.amount}</div>,
      price: <div>{p?.amount * p?.product?.price}</div>,
    }
  });

  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            การจัดส่ง
          </Title>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col span={20}>
              <div>
                <a
                  style={{
                    float: "left",
                    fontSize: "24px",
                    marginTop: "-40px",
                  }}
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
                            marginTop: "30px",
                          }}
                        >
                          <Col span={23}>
                            <Title level={5}>ที่อยู่ร้านค้า</Title>
                            <div style={boxWhite}>
                              {/* <MapShop /> */}
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
                            <div>ยอดรวมทั้งหมด</div>
                            <div style={{ fontSize: "24px" }}>฿ {"270.00"}</div>
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
                          span={23}
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          <Col
                            span={23}
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
                              }}
                            >
                              ชำระเงิน
                            </Button>
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
                            padding: "20px 0",
                            marginTop: "30px",
                          }}
                        >
                          <Col span={23}>
                            <Title level={5} style={{ marginBottom: "30px" }}>
                              ที่อยู่จัดส่ง
                            </Title>
                            <Form
                              // form={}
                              layout="vertical"
                            // onFinish={}
                            >
                              <Form.Item name="name" label="ชื่อ-นามสกุล">
                                <Input />
                              </Form.Item>
                              <Form.Item name="tal" label="เบอร์โทรศัพท์">
                                <Input type="number" />
                              </Form.Item>
                              <Form.Item
                                name="address"
                                label="บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล"
                              >
                                <Input />
                              </Form.Item>
                            </Form>
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
            <Link to={"/payment"} >
              <ButtonRed
                style={{
                  marginTop: "70px",
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                ชำระเงิน
              </ButtonRed>
            </Link>
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

export const Tables = styled(Table)`
  &.ant-table-wrapper .ant-table-thead > tr > td {
    width: 100px;
    background-color: #f2f0e6;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  &.ant-table-wrapper .ant-table-thead > tr > th {
    background-color: #f2f0e6;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  &.ant-table-wrapper .ant-table-tbody > tr {
    background-color: #f2f0e6;
  }
  &.ant-table-wrapper .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
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

