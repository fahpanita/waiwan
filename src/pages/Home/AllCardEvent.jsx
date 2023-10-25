import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Input } from "antd";
import BannerListProduct from "../../components/Slide/BannerListProduct";
import CardEvent from "../../components/CardKnowlage/CardEvent";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const AllCardEvent = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <Layout>
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
            <Col className="gutter-row" span={5}>
              <div>
                <CardEvent />
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <CardEvent />
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <CardEvent />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default AllCardEvent;
