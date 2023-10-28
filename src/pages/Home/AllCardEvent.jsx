import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Input } from "antd";
import BannerListProduct from "../../components/Slide/BannerListProduct";
import CardEvent from "../../components/CardKnowlage/CardEvent";
import FooterPage from "../../components/Footer/FooterPage";
import { getCartEvents } from "../../services/cartEvents";
import { useState } from "react";
import { useEffect } from "react";

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
        style={{
          background: "#FFFEF6",
        }}
      >
        <Navbar />
        <BannerListProduct />
        <Row justify="space-evenly" style={{ marginTop: "-20px" }}>
          <Col span={22}>
            <Search
              placeholder="ค้นหาสินค้าที่่ต้องการ"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
        <Content
          style={{
            padding: "0 50px",
            marginTop: "50px",
          }}
        >
          {/* <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            การ์ดเทศกาล
          </Title> */}
          <Row
            justify="space-evenly"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          // gutter={[8, 8]}
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
