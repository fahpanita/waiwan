import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Table, Upload, Divider } from "antd";
import { UploadOutlined, CameraOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import FooterPage from '../../components/Footer/FooterPage';
import { BASE_URL } from "../../constands/api";
import { useSelector } from 'react-redux';
import Link from '../../components/Link';
import { uploadImages } from '../../services/upload';

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

const beforeUpload = async (file) => {

  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};


const PaymentCart = () => {

  const { addCartProduct } = useSelector((state) => ({ ...state }))

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

  const products = addCartProduct?.product || [];
  const sortedProducts = [...products].sort((a, b) => {
    return Number(b.typeShipping) - Number(a.typeShipping);
  });
  const shipping = sortedProducts.length > 0 ? sortedProducts[0].typeShipping : undefined;

  const totalWithShipping = Number(totalPrice) + Number(shipping);
  const formattedTotal = totalWithShipping.toFixed(2);

  const uploadImageFromAnd = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadImages(file)
      onSuccess(res?.data?.path)
    } catch (error) {
      onError("Error")
    }

  }

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Content style={{ margin: '24px 24px 0', }}>
          <Row>
            <Col span={16}>

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
                    <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวมชำระเงินทั้งหมด</div>
                  </Col>
                  <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "24px", fontWeight: "400", color: "#C54142" }}>฿ {formattedTotal}</div>
                  </Col>
                </Row>
                <Dividers />

              </CardBoxRadius>

              <CardBoxRadius>
                <Title level={5}>แจ้งหลักฐานการชำระเงิน</Title>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={beforeUpload}
                  customRequest={uploadImageFromAnd}
                >
                  <ButtonUpload icon={<UploadOutlined />}>แนบหลักฐานการชำระเงิน</ButtonUpload>
                </Upload>
              </CardBoxRadius>
              <Row style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                <Col >
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
                    >
                      แจ้งการชำระเงิน
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

export default PaymentCart;

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

export const Dividers = styled(Divider)`
&.ant-divider-horizontal {
  margin: 10px 0;
}
`;

export const ButtonUpload = styled(Button)`
  &.ant-btn-default{
    border-radius: 6px;
    border: 1px dashed #C54142;
    background: #FFF;
    width: 100%;
    padding: 2px 30px;
    color: #C54142;
  }

  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: #C54142;
    border: 1px dashed #C54142;
  }

  &.ant-upload-wrapper .ant-upload-select {
    display: inline-block;
    width: 100%;
  }
`;