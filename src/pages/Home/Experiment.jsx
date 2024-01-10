import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Image, Breadcrumb } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const { Title } = Typography;
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

          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item>ทดลองจัดวางของไหว้เจ้า</Breadcrumb.Item>
          </Breadcrumb>

          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวางของไหว้เจ้า
          </Title>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="">
            <Col xs={12} sm={9} md={9} lg={4}>
              <Link to="/setAncestor" style={{ textDecoration: "none" }}>
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
                  <Card.Img variant="top" style={{ borderRadius: "10px 10px 0 0" }} src="image/img/ทดลองไหว้บรรพบุรุษ.png"></Card.Img>
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
