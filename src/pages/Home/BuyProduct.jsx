import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Tabs, Table, Button, Divider, Radio, } from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/buyproduct";

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
  console.log(getProduct)

  const data = getProduct?.product?.map(p => {
    return {
      key: "1",
      thumbnail: <img src={`${BASE_URL}/${p?.thumbnail}`} style={{ width: "70px" }} />,
      name: p?.name,
      amount: <div>{p?.amount}</div>,
      price: <div>{p?.amount * p?.price}</div>,
    }
  });

  const totalPrice = getProduct?.product?.reduce((accumulator, product) => {
    return accumulator + Number(product?.price) * product?.amount;
  }, 0);

  const formattedTotalPrice = totalPrice.toFixed(2);

  const shipping = getProduct?.product?.sort((a, b) => {
    return Number(b.typeShipping) - Number(a.typeShipping)

  })[0].typeShipping

  const totalWithShipping = Number(totalPrice) + Number(shipping);
  const formattedTotal = totalWithShipping.toFixed(2);

  const navigate = useNavigate();

  const handelOrder = async () => {
    const res = await createOrder(getProduct)
    navigate('/payment')
  }

  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    setVisible(e.target.value === 2);
  };

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Content style={{ margin: '24px 24px 0', }}>
          <Row>
            <Col span={16}>
              <CardBoxRadius>
                <Title level={5}>ที่อยู่การจัดส่ง</Title>

                <Dividers />

                {/* <div style={boxWhite}>
                  226/105 (16C) อาคารริเวียร่า1 ถนนบอนด์สตรีท ตำบลบางพูด, อำเภอปากเกร็ด, จังหวัดนนทบุรี,
                  11120
                </div> */}
              </CardBoxRadius>
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
                <Title level={5}>ตัวเลือกการจัดส่ง</Title>

                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1} onClick={() => setVisible(false)}>จัดส่งตามที่อยู่</Radio><br />
                  <Radio value={2} onClick={() => setVisible(true)}>รับหน้าร้าน</Radio>
                </Radio.Group>
                {visible && <div>My element</div>}

              </CardBoxRadius>
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
                    <Link to={"/payment"} >
                      <Button
                        type="primary"
                        shape="round"
                        size="large"

                        style={{
                          background: "#c54142",
                          width: "100%",
                          marginTop: "20px",
                        }}
                        onClick={handelOrder}
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
        {/* <Content
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
              <div >
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

                              226/105 (16C) อาคารริเวียร่า1 ถนนบอนด์สตรีท ตำบลบางพูด, อำเภอปากเกร็ด, จังหวัดนนทบุรี,
                              11120
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
                              <Table
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
                                padding: "0 30px 0 30px",
                              }}
                              onClick={handelOrder}
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
                              เลือกที่อยู่จัดส่ง
                            </Title>

                            <Select
                              defaultValue="นนทบุรี"
                              style={{
                                width: '100%',
                              }}
                              options={[
                                {
                                  value: 'นนทบุรี',
                                  label: 'นนทบุรี',
                                },
                                {
                                  value: 'เพชรบุรี',
                                  label: 'เพชรบุรี',
                                },
                              ]}
                            />

                            <Form
                              layout="vertical"
                            >
                              <Form.Item name="name" label="ชื่อ-นามสกุล" rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}>
                                <Input value="name" />
                              </Form.Item>

                              <Form.Item
                                name="street"
                                label="บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล"
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name="address"
                                label="จังหวัด,เขตอำเภอ,รหัสไปรษณีย์"
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item name="tal" label="เบอร์โทรศัพท์">
                                <Input type="number" />
                              </Form.Item>
                            </Form>
                          </Col>
                          <Col span={23}>
                            <Title level={5}>ระบุจากแผนที่</Title>
                            <div style={boxWhite}>

                              เลือกระบุจากแผนที่
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
                            <Link to={"/payment"} >
                              <Button
                                type="primary"
                                shape="round"
                                size="large"

                                style={{
                                  background: "#c54142",
                                  padding: "0 30px 0 30px",
                                }}
                              >
                                ชำระเงิน
                              </Button>
                            </Link>
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

          </Row>
        </Content> */}

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
          /* background-color: #f2f0e6; */
          border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  &.ant-table-wrapper .ant-table-thead > tr > th {
            /* background-color: #f2f0e6; */
            border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  &.ant-table-wrapper .ant-table-tbody > tr {
            /* background-color: #f2f0e6; */
          }
  &.ant-table-wrapper .ant-table-tbody > tr > td {
            border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
          `;


export const Dividers = styled(Divider)`
&.ant-divider-horizontal {
  margin: 10px 0;
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

export const CardBoxRadius = styled.div`
border-radius: 13px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
padding: 16px;
`;