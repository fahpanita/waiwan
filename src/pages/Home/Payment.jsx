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
import { createPayment, payment } from '../../services/payment';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;
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
    title: <div style={{ display: "flex", justifyContent: "center" }}>จำนวน</div>,
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

  const [prompay, setPrompay] = useState();
  const [qRCodeValue, setQRCodeValue] = useState('');

  const handleGetPrompay = async () => {
    if (orderId) {
      const params = { order_id: parseInt(orderId, 10) };
      const res = await payment(params);
      setPrompay(res?.data);
      setQRCodeValue(res?.data?.payload || '');
    }
  };


  const handleOk = async () => {

    const data = createPaymentForm?.getFieldsValue()

    const params = { ...data, order_id: orderId }

    const res = await createPayment(params)

    if (res?.status === 200) {
      Modal.success({
        title: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>คุณได้แจ้งชำระเงินแล้ว</Text>,
        content: <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>สามารถตรวจสถานะคำสั่งซื้อของคุณผ่าน Line WAI-WAN Official</Text>,
        okText: 'ตกลง',
        okButtonProps: {
          style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" },
          onClick: handleBack,
        },
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
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400" }}>{p?.name}</div>
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>฿{Number(p?.amount * p?.price)?.toLocaleString() || "-"}</div>
          </Col>
        </Row>
      ,
      amount: <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", display: "flex", justifyContent: "center" }}>{p?.amount}</div>,
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

  useEffect(() => {
    handleGetPrompay();
  }, []);

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Form form={createPaymentForm} layout="vertical" >
          <Navbar />
          <Content style={{ padding: "0 32px", }}>

            <Breadcrumb
              style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}
            >
              <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={'/cart'} style={{ textDecoration: "none" }}>ตะกร้าสินค้า</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={'/buyProduct'} style={{ textDecoration: "none" }}>สั่งซื้อสินค้า</Link></Breadcrumb.Item>
              <Breadcrumb.Item>แจ้งหลักฐานการชำระเงิน</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center" >
              <Col xs={24} sm={12} md={12} lg={12}>
                <CardBoxRadius style={{ position: "sticky", top: "16px" }}>
                  <Title level={5} style={{ textAlign: "left" }}>
                    <TablePayment
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </Title>
                </CardBoxRadius>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <CardBoxRadius>
                  <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>สรุปรายการสั่งซื้อ</Text>
                  <Dividers />
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>ยอดรวม</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>฿{Number(formattedTotalPrice)?.toLocaleString() || "-"}</div>
                    </Col>
                  </Row>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>ค่าจัดส่ง</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>฿{shipping}</div>
                    </Col>
                  </Row>
                  <Dividers />
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col span={12}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>ยอดรวมชำระเงินทั้งหมด</div>
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "20px", fontWeight: "500", color: "#C54142" }}>฿{Number(formattedTotal)?.toLocaleString() || "-"}</div>
                    </Col>
                  </Row>
                  <Dividers />
                  <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }} id="myqrcode">
                    <img src="/image/img/thai_qr_payment 1.png" width={250} />
                    <QRCode value={"00020101021129370016A000000677010111011300668865654335802TH530376463048E17" || '-'} />
                    {/* <QRCode value={qRCodeValue || '-'} /> */}
                    <Button type="primary" shape="round" size="large" onClick={downloadQRCode}
                      style={{ width: "100%", marginTop: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", color: "#A08155", background: "#ffffff", border: "1px solid #A08155" }}
                    >
                      บันทึก QR Code
                    </Button>
                  </Col>
                </CardBoxRadius>

                <CardBoxRadius>
                  <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>แจ้งหลักฐานการชำระเงิน</Text>
                  <Dividers />
                  <Form.Item name="slip_img" rules={[{ required: true, message: <div style={{ marginTop: "10px" }}> <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", color: "#C54142" }}>*กรุณาใส่รูป</Text></div> }]}>
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
                        <>
                          <Button size="large" icon={<UploadOutlined />}
                            style={{ width: "100%", marginTop: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", border: "1px dashed #A08155", color: "#A08155" }}
                          >
                            แนบหลักฐานการชำระเงิน
                          </Button>
                        </>
                      )}
                    </Upload>
                  </Form.Item>
                </CardBoxRadius>

                <Row style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                  <Col span={12}>
                    <Button type="primary" shape="round" size="large" htmlType="submit" onClick={handleOk}
                      style={{ background: "#bf9f64", width: "100%", marginTop: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}
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

export const TablePayment = styled(Table)`

  &.ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    font-family: 'Chakra Petch', sans-serif;
    font-size: 16px;
    font-weight: 500;
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
