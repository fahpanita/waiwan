import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Input } from "antd";
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
          <Title level={4} style={{ marginTop: "40px", textAlign: "center" }}>
            บทความเทศกาล
          </Title>

          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col span={24}>
              <div>
                <a
                  style={{
                    float: "left",
                    fontSize: "24px",
                    marginTop: "-40px",
                  }}
                >
                  <ArrowLeftOutlined />
                </a>
              </div>
            </Col>
          </Row>


          <Row
            justify="flex-start"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              marginTop: "30px", marginBottom: "40px",
            }}
          >
            {cardevents?.map(c => (
              <Col className="gutter-row" span={5}>
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
