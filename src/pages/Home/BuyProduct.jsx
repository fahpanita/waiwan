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

const { Title, Text } = Typography;
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
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400" }}>{p?.name}</div>
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>฿{Number(p?.amount * p?.price)?.toLocaleString() || "-"}</div>
          </Col>
        </Row>,
      amount:
        <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", display: "flex", justifyContent: "center" }}>{p?.amount}</div>,
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

  const labelInfo = {
    fontFamily: "'Chakra Petch', sans-serif",
    fontSize: "16px",
    fontWeight: "500",
  }

  const labelInput = {
    fontFamily: "'Chakra Petch', sans-serif",
    fontSize: "16px"
  }

  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <Navbar />
        <Form form={createformOrder} >
          <Content style={{ padding: "0 32px", }}>

            <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
              <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={'/listProduct'} style={{ textDecoration: "none" }}>รายการสินค้า</Link></Breadcrumb.Item>
              <Breadcrumb.Item>สั่งซื้อสินค้า</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="flex-start" gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} style={{ marginBottom: "70px" }}>
              <Col xs={24} sm={16} md={16} >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CardBoxRadius>
                      <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>ที่อยู่การจัดส่ง</Text>
                      <Dividers />

                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={showModal}
                        // icon={<PushpinOutlined />}
                        style={{ color: "#A08155", background: "#ffffff", border: "1px solid #A08155", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", width: "100%" }}
                      >
                        <div
                          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}
                        >
                          <PushpinOutlined /> {selectedLocation
                            ? `เลือกที่อยู่จัดส่ง : ${selectedLocation.road}, ${selectedLocation.subdistrict}, ${selectedLocation.district}, ${selectedLocation.province}, ${selectedLocation.postcode}`
                            : 'เลือกที่อยู่จัดส่ง'}
                        </div>
                      </Button>

                      <Modal title="กรอกข้อมูลการจัดส่ง" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} okText="ตกลง" cancelText="ยกเลิก"
                        okButtonProps={{ style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" } }}
                        cancelButtonProps={{ style: { fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", background: '#ffffff', borderColor: '#bf9f64', color: "#bf9f64", borderRadius: "60px" } }}
                        style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
                        <LongdoMapStyle>
                          <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
                        </LongdoMapStyle>

                        <div style={{ marginTop: "10px" }}>
                          <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
                            *เลื่อนตำแหน่งบนแผนที่ เพื่อแก้ไข แขวง เขต จังหวัด และรหัสไปรษณีย์
                          </Text>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <div style={{ marginBottom: "10px" }}>
                            <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", marginTop: "10px" }}>ข้อมูลติดต่อ</Text>
                          </div>
                          <Form.Item name="name" label={<Text style={labelInfo}>ชื่อ</Text>} rules={[{ required: true, message: <div style={{ marginTop: "5px" }}><Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", color: "#c54142", }}>*กรุณากรอกชื่อ</Text></div> }]} >
                            <Input placeholder="ชื่อ นามสกุล" style={labelInput} />
                          </Form.Item>
                          <Form.Item name="phone" label={<Text style={labelInfo}>เบอร์โทร</Text>} rules={[{ required: true, message: <div style={{ marginTop: "5px" }}> <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", color: "#c54142" }}>*กรุณากรอกเบอร์โทร</Text></div> }]} >
                            <Input placeholder="เบอร์โทร" style={labelInput} />
                          </Form.Item>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <div style={{ marginBottom: "10px" }}>
                            <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", marginTop: "10px" }}>ข้อมูลการจัดส่ง</Text>
                          </div>
                          <Form.Item name="street" label={<Text style={labelInfo}>บ้านเลขที่ หมู่บ้าน</Text>}>
                            <Input placeholder="บ้านเลขที่ หมู่บ้าน ถนน ซอย อื่น ๆ" style={labelInput} />
                          </Form.Item>
                          <Form.Item name="subdistrict" label={<Text style={labelInfo}>ตำบล</Text>}>
                            <Input placeholder="ตำบล" style={labelInput} />
                          </Form.Item>
                          <Form.Item name="district" label={<Text style={labelInfo}>อำเภอ</Text>}>
                            <Input placeholder="อำเภอ" style={labelInput} />
                          </Form.Item>
                          <Form.Item name="province" label={<Text style={labelInfo}>จังหวัด</Text>} >
                            <Input placeholder="จังหวัด" style={labelInput} />
                          </Form.Item>
                          <Form.Item name="zip_code" label={<Text style={labelInfo}>รหัสไปรษณีย์</Text>}>
                            <Input placeholder="รหัสไปรษณีย์" style={labelInput} />
                          </Form.Item>
                        </div>
                      </Modal>
                    </CardBoxRadius>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CardBoxRadius>
                      <Title level={5} style={{ textAlign: "left" }}>
                        <TableBuyProduct
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
                      <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>ตัวเลือกการจัดส่ง</Text>
                      <Dividers />
                      <Form.Item name="type_shipping" >
                        <Radio.Group>
                          <Radio value="จัดส่งตามที่อยู่" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>จัดส่งตามที่อยู่</Radio><br />
                          <Radio value="รับหน้าร้าน" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>รับหน้าร้าน</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {formDataOrder?.type_shipping === 'รับหน้าร้าน' && <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.382828255343!2d100.5328142693865!3d13.927994994616947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28386458758dd%3A0x13cb0fa54fa60b64!2zNDc3IOC4luC4meC4mSDguJrguK3guJnguJTguYzguKrguJXguKPguLXguJcg4LiV4Liz4Lia4Lil4Lia4LmJ4Liy4LiZ4LmD4Lir4Lih4LmIIOC4reC4s-C5gOC4oOC4reC4m-C4suC4geC5gOC4geC4o-C5h-C4lCDguJnguJnguJfguJrguLjguKPguLUgMTExMjA!5e0!3m2!1sth!2sth!4v1700765573255!5m2!1sth!2sth" style={{ width: "100%" }}></iframe></div>}
                    </CardBoxRadius>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CardBoxRadius>
                      <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>สรุปรายการสั่งซื้อ</Text>
                      <Dividers />
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col span={12}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ยอดรวม</div>
                        </Col>
                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>฿{Number(formattedTotalPrice)?.toLocaleString() || "-"}</div>
                        </Col>
                      </Row>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col span={12}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ค่าจัดส่ง</div>
                        </Col>
                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>฿{shipping}</div>
                        </Col>
                      </Row>
                      <Dividers />
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col span={12}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>ยอดรวมทั้งสิ้น</div>
                        </Col>
                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "20px", fontWeight: "500", color: "#C54142" }}>฿{Number(formattedTotal)?.toLocaleString() || "-"}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Button type="primary" shape="round" size="large" htmlType="submit" onClick={handelOrder}
                            style={{ background: "#bf9f64", width: "100%", marginTop: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", }}>
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

export const TableBuyProduct = styled(Table)`

  &.ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    font-family: 'Chakra Petch', sans-serif;
    font-size: 16px;
    font-weight: 500;
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