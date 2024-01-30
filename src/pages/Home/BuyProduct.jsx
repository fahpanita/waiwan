import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Tabs, Table, Button, Divider, Radio, Modal, Form, Breadcrumb } from "antd";
import Navbar from "../../components/Header/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, createOrder } from "../../services/buyproduct";
import { LongdoMap, longdo, map } from "../../components/LongdoMap";
import { Input } from "antd/es";
import { getAddress } from "../../services/map";
import { PushpinOutlined, } from "@ant-design/icons";

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
];

const { Title } = Typography;
const { Content } = Layout;

const BuyProduct = (props) => {

  const [createformOrder] = Form.useForm();
  const formDataOrder = Form.useWatch([], createformOrder);

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
            <div style={{ fontSize: "18px", fontWeight: "400" }}>{p?.name}</div>
            <div style={{ fontSize: "18px", }}>฿{p?.amount * p?.price}</div>
          </Col>
        </Row>,
      amount:
        <div style={{ display: "flex", justifyContent: "center" }}>{p?.amount}</div>,

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

  const [value, setValue] = useState("จัดส่งตามที่อยู่");
  const [visible, setVisible] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);

  };

  const handelOrder = async () => {
    const address = createformOrder?.getFieldsValue()
    const res = await createAddress(address)
    if (res?.data?.id) {

      const data = {
        ...getProduct,
        type_shipping: address?.type_shipping,
        address: res?.data?.id
      }
      const resOrder = await createOrder(data)
      if (resOrder?.data?.id) {
        navigate(`/payment/${resOrder?.data?.id}`)
      }

    }

  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState({ lat: undefined, lon: undefined });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSetLocation = () => {
    setLocation(map.location());
  };

  const mapKey = import.meta.env.VITE_LONGDOMAP_API_KEY;

  const initMap = () => {
    map?.Layers?.setBase(longdo?.Layers?.GRAY);
    map?.location(longdo?.LocationMode?.Geolocation);
    handleSetLocation()

    map.Event.bind('drop', function () {
      handleSetLocation()

    });
  }

  useEffect(() => {
    const handleGetAddress = async () => {
      const res = await getAddress(location)
      createformOrder.setFieldsValue(
        {
          street: res?.data?.road,
          district: res?.data?.district,
          subdistrict: res?.data?.subdistrict,
          province: res?.data?.province,
          zip_code: res?.data?.postcode
          ,
        }
      )
      setSelectedLocation(res?.data || null);
    }
    if (location && location.lat && location.lon) {
      handleGetAddress()
    }
  }, [location])

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Form form={createformOrder} >
          <Content style={{ margin: '24px 24px 0', }}>

            <Breadcrumb
              style={{
                margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px",
              }}
            >
              <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
              <Breadcrumb.Item>รายการสินค้า</Breadcrumb.Item>
              <Breadcrumb.Item>สั่งซื้อสินค้า</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>

              <Col xs={24} sm={16} md={16} >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CardBoxRadius>
                      <Title level={5}>ที่อยู่การจัดส่ง</Title>
                      <Dividers />
                      <Button
                        type="primary"
                        onClick={showModal}
                        icon={<PushpinOutlined />}
                        style={{ background: "#bf9f64" }}
                      >
                        {selectedLocation
                          ? `เลือกที่อยู่จัดส่ง : ${selectedLocation.road}, ${selectedLocation.subdistrict}, ${selectedLocation.district}, ${selectedLocation.province}, ${selectedLocation.postcode}`
                          : 'เลือกที่อยู่จัดส่ง'}

                      </Button>
                      <Modal title="เลือกที่อยู่การจัดส่ง" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                        <LongdoMapStyle>
                          <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
                        </LongdoMapStyle>
                        <Title level={5}>ข้อมูลการจัดส่ง</Title>
                        <Form.Item name="street" label="บ้านเลขที่ หมู่บ้าน"  >
                          <Input placeholder="บ้านเลขที่ หมู่บ้าน ถนน ซอย อื่น ๆ" />
                        </Form.Item>
                        <Form.Item name="subdistrict" label="ตำบล" >
                          <Input disabled />
                        </Form.Item>
                        <Form.Item name="district" label="อำเภอ" >
                          <Input disabled />
                        </Form.Item>
                        <Form.Item name="province" label="จังหวัด" >
                          <Input disabled />
                        </Form.Item>
                        <Form.Item name="zip_code" label="รหัสไปรษณีย์" >
                          <Input disabled />
                        </Form.Item>
                        <div>เลื่อนตำแหน่งบนแผนที่ เพื่อแก้ไข แขวง เขต จังหวัด และรหัสไปรษณีย์</div>
                        <Title level={5}>ข้อมูลดิดต่อ</Title>
                        <Form.Item name="name" label="ชื่อ" rules={[{ required: true, message: "กรุณากรอกชื่อ" }]} >
                          <Input placeholder="ชื่อ นามสกุล" />
                        </Form.Item>
                        <Form.Item name="phone" label="เบอร์โทร" rules={[{ required: true, message: "กรุณากรอกเบอร์โทร" }]} >
                          <Input placeholder="เบอร์โทร" />
                        </Form.Item>
                      </Modal>

                    </CardBoxRadius>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
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
                </Row>
              </Col>

              <Col xs={24} sm={8} md={8} lg={8}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CardBoxRadius>
                      <Title level={5}>ตัวเลือกการจัดส่ง</Title>
                      <Form.Item name="type_shipping" >
                        <Radio.Group >
                          <Radio value="จัดส่งตามที่อยู่" style={{ fontSize: "18px", }}>จัดส่งตามที่อยู่</Radio><br />
                          <Radio value="รับหน้าร้าน" style={{ fontSize: "18px", }}>รับหน้าร้าน</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {formDataOrder?.type_shipping === 'รับหน้าร้าน' && <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.382828255343!2d100.5328142693865!3d13.927994994616947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28386458758dd%3A0x13cb0fa54fa60b64!2zNDc3IOC4luC4meC4mSDguJrguK3guJnguJTguYzguKrguJXguKPguLXguJcg4LiV4Liz4Lia4Lil4Lia4LmJ4Liy4LiZ4LmD4Lir4Lih4LmIIOC4reC4s-C5gOC4oOC4reC4m-C4suC4geC5gOC4geC4o-C5h-C4lCDguJnguJnguJfguJrguLjguKPguLUgMTExMjA!5e0!3m2!1sth!2sth!4v1700765573255!5m2!1sth!2sth" style={{ width: "100%" }}></iframe></div>}
                    </CardBoxRadius>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24}>
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
                          <div style={{ fontSize: "18px", fontWeight: "400" }}>ยอดรวมทั้งสิ้น</div>
                        </Col>
                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ fontSize: "24px", fontWeight: "600", color: "#C54142" }}>฿{formattedTotal}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
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
                            onClick={handelOrder}

                          >
                            สั่งซื้อสินค้า
                          </Button>
                        </Col>
                      </Row>

                    </CardBoxRadius>
                  </Col>
                </Row>



              </Col>
            </Row>

          </Content>
        </Form>


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
/* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09); */
box-shadow: 0 0 2px rgba(0,0,0,.15);
margin: 10px;
padding: 16px;
`;

export const LongdoMapStyle = styled.div`
height: 300px;
`;