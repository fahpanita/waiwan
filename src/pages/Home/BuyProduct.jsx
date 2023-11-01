import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";

const columns = [
  {
    dataIndex: "thumbnail",
  },
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

const BuyProduct = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);

  const handleGetProduct = async (id) => {
    const res = await getProductId(id);
    setProduct(res?.data);
  };

  useEffect(() => {
    if (id) {
      handleGetProduct(id);
    }
  }, [id]);

  const data = [
    {
      key: "1",
      thumbnail: <img src={`${BASE_URL}/${product?.thumbnail}`} style={{ width: "70px" }} />,
      name: product?.name,
      amount: <div>{location.state.amount}</div>,
      price: <div>{location.state.amount * product?.price}</div>,
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
                // href={`/detailProduct?id=${product?.id}`}
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
                              <Tables
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                              />
                            </Title>
                          </Col>
                        </Row>

                        {/* {location.state.amount} */}

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
            {/* <ButtonRed type="primary" danger size="large" htmlType="submit" onClick={() => { navigate(`/payment?id=${product?.id}`, { replace: true, state: { amount } }) }}>
              ชำระเงิน
            </ButtonRed> */}
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

export const Tables = styled(Table)`
  &.ant-table-wrapper .ant-table-thead >tr>td {
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
