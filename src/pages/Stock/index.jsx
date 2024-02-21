import React, { useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import {
  Col,
  Row,
  Divider,
  Layout,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";
import MenuAccount from "../../components/Menu/MenuAccount";
import styled from "styled-components";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Stock = () => {
  const { profile } = useAuth();
  // console.log(profile);

  const onFinish = (values) => {
    // console.log(values);
  };

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
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-evenly"
            style={{ marginTop: "32px", marginBottom: "70px" }}
          >
            <Col className="gutter-row" span={5}>
              <MenuAccount />
            </Col>
            <Col
              className="gutter-row"
              span={19}
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <div style={{ marginTop: "16px" }}>
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>
                  ข้อมูลของฉัน
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image width={100} height={100} src={profile?.picture} />
                <Paragraph style={{ marginTop: "10px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>
                  ชื่อผู้ใช้: {profile?.name}
                </Paragraph>
              </div>
              <Divider />
              <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12} >
                    <Form.Item label={<Text style={labelInfo}>ชื่อ</Text>} name="name" >
                      <Input placholder="name" style={labelInput} />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label={<Text style={labelInfo}>นามสกุล</Text>} name="surname">
                      <Input placholder="surname" style={labelInput} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label={<Text style={labelInfo}>เบอร์โทรศัพท์</Text>} name="phone_no">
                      <Input type="number" style={labelInput} />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label={<Text style={labelInfo}>อีเมล</Text>} name="email" >
                      <Input type="email" defaultValue={profile?.email} style={labelInput} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label={<Text style={labelInfo}>ที่อยู่</Text>} name="address">
                  <Input placholder="address" style={labelInput} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary" htmlType="submit" shape="round" size="large"
                    style={{
                      backgroundColor: "#A08155", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px",
                    }}
                  >
                    บันทึก
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default Stock;

