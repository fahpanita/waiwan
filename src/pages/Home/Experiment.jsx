import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Image, Breadcrumb } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const { Title, Text } = Typography;
const { Content } = Layout;

const Experiment = () => {
  return (
    <>
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content style={{ padding: "0 32px", }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item>ทดลองจัดวางของไหว้เจ้า</Breadcrumb.Item>
          </Breadcrumb>

          <Title style={{ fontFamily: "'Athiti', sans-serif", fontSize: "28px", fontWeight: "500", marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวางของไหว้เจ้า
          </Title>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} style={{ marginBottom: "70px" }}>
            {/* <Col xs={12} sm={9} md={9} lg={4}> */}
            {/* <Link to="/setAncestor" style={{ textDecoration: "none" }}>
                <Card
                  hoverable
                  style={{ border: "none", borderRadius: "10px" }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="/setAncestor"
                    style={{
                      background: "#bf9f64", width: "100%",
                      position: "absolute", bottom: "16px",
                      // padding:""
                    }}
                  >
                    ทดลองจัดไหว้
                  </Button>
                  <Card.Img variant="top" style={{ borderRadius: "10px 10px 0 0" }} src="image/img/ชุดไหว้เช้งเม้ง.png"></Card.Img>
                </Card >
              </Link> */}
            {/* </Col> */}

            <Col xs={12} sm={9} md={9} lg={4}>
              <Link to="/setChengMeng" style={{ textDecoration: "none" }}>
                <Card
                  hoverable
                  style={{ border: "none", borderRadius: "10px", display: "flex", alignItems: "center" }}
                >
                  <TextonImage >ชุดไหว้เจ้า</TextonImage>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="/setChengMeng"
                    style={{ background: "#bf9f64", width: "90%", position: "absolute", bottom: "16px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>
                    ทดลองจัดไหว้
                  </Button>

                  <Card.Img variant="top" style={{ borderRadius: "10px 10px 0 0" }} src="image/img/img-minigame-01.png"></Card.Img>
                </Card >
              </Link>
            </Col>
          </Row>

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
color: #ffffff;
height: 100px;
`;
