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

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const boxSum = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Stock = () => {
  const { profile } = useAuth();
  console.log(profile);

  const onFinish = (values) => {
    console.log(values);
  };

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
            style={{ marginTop: "32px" }}
          >
            <Col className="gutter-row" span={5}>
              <MenuAccount />
            </Col>
            <Col
              className="gutter-row"
              span={19}
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <Title level={5} style={{ marginTop: "10px" }}>
                ข้อมูลของฉัน
              </Title>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image width={100} height={100} src={profile?.picture} />
                <Paragraph style={{ marginTop: "10px" }}>
                  ชื่อผู้ใช้: {profile?.name}
                </Paragraph>
              </div>
              <Divider />
              <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label="ชื่อ" name="name">
                      <Input placholder="name" />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label="นามสกุล" name="surname">
                      <Input placholder="surname" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <Form.Item label="เบอร์โทรศัพท์" name="phone_no">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Form.Item name="email" label="Email">
                      <Input type="email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="ที่อยู่" name="address">
                  <Input placholder="address" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#A08155",
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
