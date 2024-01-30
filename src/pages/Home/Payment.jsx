import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Table, Upload, Divider, Form, Modal, Breadcrumb } from "antd";
import { UploadOutlined, CameraOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import FooterPage from '../../components/Footer/FooterPage';
import { BASE_URL } from "../../constands/api";
import { useSelector } from 'react-redux';
import { uploadImages } from '../../services/upload';
import { QRCode } from 'antd/es';
import { createPayment } from '../../services/payment';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const columns = [
  {
    title: "สินค้า",
    dataIndex: "thumbnail",
  },
  // {
  //   dataIndex: "name",
  //   render: (text) => <a>{text}</a>,
  // },
  {
    title: "จำนวน",
    dataIndex: "amount",
  },
  // {
  //   title: "ราคา",
  //   dataIndex: "price",
  // },
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

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const Payment = () => {

  const [createPaymentForm] = Form.useForm();
  const formDataPayment = Form.useWatch([], createPaymentForm);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();

  const { orderId } = useParams();

  const handleOk = async () => {

    const data = createPaymentForm?.getFieldsValue()

    const params = { ...data, order_id: orderId }

    const res = await createPayment(params)

    if (res?.status === 200) {
      Modal.success({
        title: 'ชำระเงินสำเร็จ',
        content: 'สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official',
        footer: (_, { OkBtn }) => (
          <>
            <Button onClick={handleBack}>กลับไปหน้าแรก
            </Button>
            <OkBtn />
          </>
        )
      });
    }

  };

  const handleBack = async () => {
    navigate(`/`),
      Modal.destroyAll();
  }


  const { getProduct } = useSelector((state) => ({ ...state }))

  const data = getProduct?.product?.map(p => {
    return {
      key: "1",
      thumbnail:
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col xs={24} sm={4} md={4} lg={4}>
            <img src={`${BASE_URL}/${p?.thumbnail}`} style={{ width: "70px" }} />
          </Col>
          <Col xs={24} sm={5} md={5} lg={5}>
            <div style={{ fontSize: "18px", }}>{p?.name}</div>
            <div style={{ fontSize: "18px", }}>฿{p?.amount * p?.price}</div>
          </Col>
        </Row>
      ,
      amount: <div style={{ display: "flex", justifyContent: "center" }}>{p?.amount}</div>,
    }
  });

  const totalPrice = getProduct?.product?.reduce((accumulator, product) => {
    return accumulator + Number(product?.price) * product?.amount;
  }, 0);

  const formattedTotalPrice = totalPrice.toFixed(2);

  const products = getProduct?.product || [];
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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChangeImg = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    createPaymentForm.setFieldValue("slip_img", info.file.response)
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Form form={createPaymentForm} layout="vertical" >
          <Navbar />
          <Content style={{ margin: '24px 24px 0', }}>

            <Breadcrumb
              style={{
                margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px",
              }}
            >
              <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
              <Breadcrumb.Item>รายการสินค้า</Breadcrumb.Item>
              <Breadcrumb.Item>สั่งซื้อสินค้า</Breadcrumb.Item>
              <Breadcrumb.Item>แจ้งหลักฐานการชำระเงิน</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center" >
              <Col xs={24} sm={16} md={16} lg={16}>
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
              <Col xs={24} sm={8} md={8} lg={8}>
                <CardBoxRadius>
                  <Title level={5}>สรุปรายการสั่งซื้อ</Title>
                  <Dividers />
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวม</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontSize: "18px", fontWeight: "400" }}>฿{formattedTotalPrice}</div>
                    </Col>
                  </Row>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontSize: "18px", fontWeight: "400" }}>ค่าจัดส่ง</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontSize: "18px", fontWeight: "400" }}>฿{shipping}</div>
                    </Col>
                  </Row>
                  <Dividers />
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวมชำระเงินทั้งหมด</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontSize: "24px", fontWeight: "600", color: "#C54142" }}>฿{formattedTotal}</div>
                    </Col>
                  </Row>
                  <Dividers />
                  <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }} id="myqrcode">
                    <img src="/image/img/thai_qr_payment 1.png" width={250} />
                    <QRCode value={"00020101021229370016A000000677010111011300668865654335802TH53037645406420.006304976A" || '-'} />
                    <Button
                      type="primary"
                      shape="round"
                      size="large"

                      style={{
                        background: "#FFF",
                        width: "100%",
                        marginTop: "20px",
                        color: "#A08155",
                        border: "1px solid #A08155",
                      }}

                      onClick={downloadQRCode}
                    >
                      บันทึก QR Code
                    </Button>
                  </Col>

                </CardBoxRadius>

                <CardBoxRadius>
                  <Title level={5}>แจ้งหลักฐานการชำระเงิน</Title>
                  <Form.Item name="slip_img" rules={[{ required: true, message: "กรุณาใส่รูป" }]}>
                    <Upload
                      listType="picture"
                      maxCount={1}
                      value={formDataPayment?.slip_img}
                      showUploadList={false}
                      customRequest={uploadImageFromAnd}
                      beforeUpload={beforeUpload}
                      onChange={handleChangeImg}
                      onPreview={onPreview}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            width: '100%',
                          }}
                        />
                      ) : (
                        <ButtonUpload icon={<UploadOutlined />} size="large" style={{ fontSize: "18px", }}>แนบหลักฐานการชำระเงิน</ButtonUpload>
                      )}

                    </Upload>
                  </Form.Item>

                </CardBoxRadius>
                <Row style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                  <Col>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "#bf9f64",
                        width: "100%",
                        marginTop: "20px",
                      }}
                      onClick={handleOk}
                    >
                      แจ้งการชำระเงิน
                    </Button>


                  </Col>


                </Row>
              </Col>

            </Row>

          </Content >
          <FooterPage />
        </Form>


      </Layout >
    </>
  );
};

export default Payment;

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
/* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09); */
box-shadow: 0 0 2px rgba(0,0,0,.15);
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
    border: 1px dashed #a08155;
    background: #FFF;
    width: 100%;
    padding: 2px 30px;
    color: #a08155;
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