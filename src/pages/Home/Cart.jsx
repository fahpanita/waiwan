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
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constands/api";

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

const boxWhite = {
  borderRadius: "6px",
  padding: "20px",
  margin: "10px 20px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
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
const maxW200 = {
  maxWidth: "210px",
};
const maxW300 = {
  maxWidth: "300px",
};
const headFitler = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  marginTop: "30px",
};

// let [amount, setNum] = useState(1);

// let incNum = () => {
//   if (amount < product?.stock) {
//     setNum(Number(amount) + 1);
//   }
// };
// let decNum = () => {
//   if (amount > 1) {
//     setNum(amount - 1);
//   }
// }
// let handleChange = (e) => {
//   setNum(e.target.value);
// }

const Cart = () => {

  const { addProduct } = useSelector((state) => ({ ...state }))

  //console.log(addProduct?.product?.[0]?.product)

  const productArray = addProduct?.product?.map((item) => item?.product);

  const names = productArray?.map((item) => item?.name);
  const thumbnail = productArray?.map((item) => item?.thumbnail);
  const price = productArray?.map((item) => item?.price);

  console.log(productArray)

  return (
    <>
      <Layout
        style={{
          background: "#FFFEF6",
        }}
      >
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
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
                            padding: "20px 0",
                            marginTop: "30px",
                          }}
                        >
                          <Col span={23} style={boxWhite}>
                            <div
                              style={{ display: "flex", flexWrap: "nowrap" }}
                            >
                              <Image
                                preview={false}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginRight: "10px",
                                }}
                                src={`${BASE_URL}/${thumbnail}`}
                              />
                              <div style={maxW200}>
                                {names}
                              </div>
                            </div>
                            <div style={{ fontSize: "24px" }}>฿ {price}</div>
                            <div>{<IncDecCounter />}</div>
                            <Button
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{
                                color: "#c54142",
                                borderColor: "#c54142",
                              }}
                            >
                              ลบ
                            </Button>
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
                          <Col span={23} style={boxSum}>
                            <div>ราคาสุทธิ (ราคารวมภาษีมูลค่าเพิ่ม)</div>
                            <div style={{ fontSize: "24px" }}>฿ {"270.00"}</div>
                          </Col>
                          <Col span={23} style={boxSum}>
                            <div>จำนวน (ชิ้น)</div>
                            <div>{"2"} ชิ้น</div>
                          </Col>
                          <Divider dashed />
                          <Button
                            type="primary"
                            shape="round"
                            size="large"
                            style={{ background: "#c54142" }}
                          >
                            ชำระเงิน
                          </Button>
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
                          <Col span={23} style={boxWhite}>
                            <div
                              style={{ display: "flex", flexWrap: "nowrap" }}
                            >
                              <Image
                                preview={false}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginRight: "10px",
                                }}
                                src="image/img/product-1.png"
                              />
                              <div style={maxW300}>
                                <div>{ }</div>
                                <Text type="secondary">
                                  จัดส่ง:{" ภายในวันที่ 25 สิงหาคม 2566"}
                                </Text>
                              </div>
                            </div>
                            <Button
                              shape="round"
                              style={{
                                color: "#c54142",
                                borderColor: "#c54142",
                              }}
                            >
                              ดูรายละเอียดเพิ่มเติม
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
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
