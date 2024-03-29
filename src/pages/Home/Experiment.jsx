import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Image, Breadcrumb, Modal } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const { Title, Text } = Typography;
const { Content } = Layout;

const Experiment = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content style={{ padding: "0 32px", marginBottom: "130px" }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>
            <Breadcrumb.Item>ทดลองจัดวางของไหว้เจ้า</Breadcrumb.Item>
          </Breadcrumb>

          <Title style={{ fontFamily: "'Athiti', sans-serif", fontSize: "28px", fontWeight: "500", marginTop: "50px", textAlign: "center", marginBottom: "60px" }}>
            ทดลองจัดวางของไหว้เจ้า
          </Title>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} style={{ marginBottom: "70px" }}>
            <Col xs={12} sm={9} md={9} lg={4}>
              <Link to="/setChineseYear" style={{ textDecoration: 'none' }} >
                <Card hoverable style={{ border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center' }} >
                  <TextonImage>ชุดไหว้เจ้าวันตรุษจีน</TextonImage>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="/setChineseYear"
                    style={{ background: '#bf9f64', width: '90%', position: 'absolute', bottom: '16px', fontFamily: "'Chakra Petch', sans-serif", fontSize: '18px' }}
                  >
                    ทดลองจัดวาง
                  </Button>
                  <Card.Img variant="top" style={{ borderRadius: '10px' }} src="https://i.postimg.cc/t4t93Q5f/A3-9.png" />
                </Card>
              </Link>
            </Col>
            <Col xs={12} sm={9} md={9} lg={4}>
              <Link to="/setChengMeng" style={{ textDecoration: 'none' }} >
                <Card hoverable style={{ border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center' }} >
                  <TextonImage>ชุดไหว้เจ้าวันเช็งเม้ง</TextonImage>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="/setChengMeng"
                    style={{ background: '#bf9f64', width: '90%', position: 'absolute', bottom: '16px', fontFamily: "'Chakra Petch', sans-serif", fontSize: '18px' }}
                  >
                    ทดลองจัดวาง
                  </Button>
                  <Card.Img variant="top" style={{ borderRadius: '10px' }} src="https://i.postimg.cc/2yCqxSDq/A3-8.png" />
                </Card>
              </Link>
            </Col>
            <Col xs={12} sm={9} md={9} lg={4}>
              <Link to="/setCaiXingYea" style={{ textDecoration: 'none' }} >
                <Card hoverable style={{ border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center' }} >
                  <TextonImage>ชุดไหว้เจ้าวันไฉ่ซิงเอี๊ย</TextonImage>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="/setCaiXingYea"
                    style={{ background: '#bf9f64', width: '90%', position: 'absolute', bottom: '16px', fontFamily: "'Chakra Petch', sans-serif", fontSize: '18px' }}
                  >
                    ทดลองจัดวาง
                  </Button>
                  <Card.Img variant="top" style={{ borderRadius: '10px' }} src="https://i.postimg.cc/sxbkrvgx/A3-7.png" />
                </Card>
              </Link>
            </Col>

          </Row>

          <Modal
            title="Your Modal Title"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {/* Add your modal content here */}
            <p>This is a sample modal content.</p>
          </Modal>

        </Content>
        <FooterPage />
      </Layout >
    </>
  );
};

export default Experiment;

export const TextonImage = styled(Text)`
font-family: 'Chakra Petch', sans-serif;
font-size: 18px;
font-weight: 500;
position: absolute;
left: 20px;
top: 20px;
color: #FFEE53;
text-shadow: 1px 2px 5px #000;
height: 100px;
`;
