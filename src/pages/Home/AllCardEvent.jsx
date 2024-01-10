import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Input, Breadcrumb } from "antd";
import BannerListProduct from "../../components/Slide/BannerListProduct";
import CardEvent from "../../components/CardKnowlage/CardEvent";
import FooterPage from "../../components/Footer/FooterPage";
import { getCartEvents } from "../../services/cartEvents";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArrowLeftOutlined,

} from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const AllCardEvent = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [cardevents, setCartEvents] = useState([]);

  const handleGetCartEvents = async () => {
    const res = await getCartEvents()
    setCartEvents(res?.data)
    console.log(res?.data)
  }

  useEffect(() => {
    handleGetCartEvents()
  }, [])

  return (
    <>
      <Layout
        style={{ background: "#F5F5F5" }}
      >
        <Navbar />
        <Content
          style={{
            padding: "0 32px",
          }}
        >

          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item>บทความเทศกาล</Breadcrumb.Item>
          </Breadcrumb>
          <Title level={4} style={{ marginTop: "40px", textAlign: "center" }}>
            บทความเทศกาล
          </Title>


          <Row
            justify="flex-start"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
            style={{
              marginTop: "30px"
            }}
          >
            {cardevents?.map(c => (
              <Col xs={24}
                sm={12}
                md={12}
                lg={6} style={{ marginBottom: "20px" }}>
                <div>
                  <CardEvent datacard={c} />
                </div>
              </Col>
            ))}
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default AllCardEvent;
