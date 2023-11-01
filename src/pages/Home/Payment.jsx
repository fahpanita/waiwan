import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Table, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from "@ant-design/icons";
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import styled from 'styled-components';
import FooterPage from '../../components/Footer/FooterPage';
import { useLocation, useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
import { BASE_URL } from "../../constands/api";

// const generatePayload = require('promptpay-qr');

const { Title } = Typography;
const { Footer, Content } = Layout;
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

  const [phoneNumber, setPhoneNumber] = useState("088-656-5433");
  const [amountQr, setAmountQr] = useState(1.00);
  const [qrCode, setqrCode] = useState("sample");

  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }
  function handleAmountQr(e) {
    setAmountQr(parseFloat(e.target.value));
  }
  function handleQR() {
    setqrCode(generatePayload(phoneNumber, { amountQr }));

  }

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
      // amount: <div>{location.state.amount}</div>,
      // price: <div>{location.state.amount * product?.price}</div>,
    },

  ];

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
                    ยอดชำระเงิน
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
                    <div>
                      {/* <input type="text" value={phoneNumber} onChange={handlePhoneNumber} /> */}
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
                  marginTop: "24px",
                  padding: "20px 0",
                }}
              >
                <Col className="gutter-row" span={20}>
                  <Title
                    level={5}
                    style={{ textAlign: "left", margin: "20px 0" }}
                  >
                    แจ้งหลักฐานการชำระเงิน
                  </Title>

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
                      border: "2px dashed #BF9F64",
                    }}
                  >

                    <Upload {...uploadPayment}>
                      <Button icon={<UploadOutlined />}>แนบหลักฐานการชำระเงิน</Button>
                    </Upload>

                  </Row>

                </Col>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <ButtonRed
                  style={{
                    marginTop: "70px",
                    textAlign: "center",
                    justifyItems: "center",
                  }}
                >
                  ชำระเงิน
                </ButtonRed>
              </Row>

            </Col>
          </Row>
        </Content>
        <FooterPage>

        </FooterPage>
      </Layout>
    </>
  );
};

export default Payment;

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