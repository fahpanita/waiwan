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



const BuyProductCart = (props) => {


  const { addCartProduct } = useSelector((state) => ({ ...state }))
  console.log(addCartProduct)

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

  // const shipping = addCartProduct?.product?.sort((a, b) => {
  //   return Number(b.typeShipping) - Number(a.typeShipping)

  // })[0].typeShipping

  const cartProducts = addCartProduct?.product || [];

  const sortedProducts = cartProducts.slice().sort((a, b) => {
    return Number(b.typeShipping) - Number(a.typeShipping);
  });

  const shipping = sortedProducts[0]?.typeShipping;

  const totalWithShipping = Number(totalPrice) + Number(shipping);
  const formattedTotal = totalWithShipping.toFixed(2);

  const navigate = useNavigate();

  const handelOrder = async () => {
    const res = await createOrder(addCartProduct)
    navigate('/paymentcart')
  }

  const [value, setValue] = useState("จัดส่งตามที่อยู่");
  const [visible, setVisible] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    setVisible(e.target.value === "รับหน้าร้าน");
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
                  <Radio value="จัดส่งตามที่อยู่" onClick={() => setVisible(false)}>จัดส่งตามที่อยู่</Radio><br />
                  <Radio value="รับหน้าร้าน" onClick={() => setVisible(true)}>รับหน้าร้าน</Radio>
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
                    <Link to={"/paymentcart"} >
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

        <FooterPage />
      </Layout>
    </>
  );
};

export default BuyProductCart;

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