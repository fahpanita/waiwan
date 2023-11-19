import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Table, Upload, Divider } from "antd";
import { UploadOutlined, CameraOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import styled from 'styled-components';
import FooterPage from '../../components/Footer/FooterPage';
import { BASE_URL } from "../../constands/api";
import { useSelector } from 'react-redux';
import Link from '../../components/Link';
import { useNavigate } from 'react-router-dom';

//const generatePayload = require('promptpay-qr');

const { Title } = Typography;
const { Content } = Layout;

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
const boxSum = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
};
const boxGold = {
  margin: "10px 0",
  padding: "20px",
  backgroundColor: "#fff",
  border: "2px dashed #BF9F64",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
};

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Payment = () => {

  const { getProduct } = useSelector((state) => ({ ...state }))

  const [phoneNumber, setPhoneNumber] = useState("088-656-5433");
  const [amountQr, setAmountQr] = useState(1.00);
  const [qrCode, setqrCode] = useState("sample");

  function handleAmountQr(e) {
    setAmountQr(parseFloat(e.target.value));
  }
  function handleQR() {
    setqrCode(generatePayload(phoneNumber, { amountQr }));

  }

  const navigate = useNavigate();

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

  const uploadPayment = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Content
          style={{ padding: "0 50px" }}>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            แจ้งชำระเงิน
          </Title>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col span={20} >
              <div onClick={() => { navigate(`/buyProduct`) }}>
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
                  <Title level={5}>ที่อยู่ร้านค้า</Title>
                </Col>
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

              <Title level={4} style={{ marginTop: "40px" }}>การสั่งซื้อ</Title>

              <Row
                justify="space-evenly"
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
                style={{
                  border: "2px solid #BF9F64", borderRadius: "6px", marginTop: "20px",
                }}
              >
                <Col span={23}>
                  <Title
                    level={4}
                    style={{ textAlign: "left", margin: "20px 0" }}
                  >
                    <div>
                      {/* <input type="text" value={phoneNumber} onChange={handlePoneNumber} /> */}
                      <input type="number" value={amountQr} onChange={handleAmountQr} />
                      <button onClick={handleQR}>Generate Promptpay QR</button>
                      <QRCode value={qrCode} />
                    </div>
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
                  marginTop: "40px",
                  padding: "20px 0",
                }}
              >
                <Col span={23}>
                  <Title level={5}>แจ้งหลักฐานการชำระเงิน</Title>
                </Col>
                <Col span={23}>
                  <div style={boxGold}>
                    <Upload {...props}>
                      <Button type="primary" shape="round" size="large"
                        icon={<CameraOutlined />}
                        style={{
                          background: "#BF9F64", padding: "0 30px 0 30px",
                        }}>
                        แนบหลักฐานการชำระเงิน
                      </Button>
                    </Upload>
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
                  <Link to={""} >
                    < Button
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
            </Col>
          </Row>
        </Content >
        <FooterPage />
      </Layout >
    </>
  );
};

export default Payment;

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
