import React from "react";
import { Layout, Row, Col, Collapse, Input, Typography } from "antd";
import Navbar from "../../components/Header/Navbar";
import BannerListProduct from "../../components/Slide/BannerListProduct";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const onChange = (value) => {
  console.log("changed", value);
};

const select = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    No information
  </p>
);

const priceSlide = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    No information
  </p>
);

const items = [
  {
    key: "1",
    label: "หมวดหมู่สินค้า",
    children: select,
  },
  {
    key: "2",
    label: "หมวดหมู่เทศกาล",
    children: select,
  },
  {
    key: "3",
    label: "ช่วงราคา",
    children: priceSlide,
  },
];

const ListProduct = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
              <Collapse
                items={items}
                bordered={false}
                defaultActiveKey={["1"]}
              />
            </Col>

            <Col className="gutter-row" span={15}>
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
                    <CardProduct />
                  </div>
                </Col>
                <Col className="gutter-row" span={5}>
                  <div>
                    <CardProduct />
                  </div>
                </Col>
                <Col className="gutter-row" span={5}>
                  <div>
                    <CardProduct />
                  </div>
                </Col>
                <Col className="gutter-row" span={5}>
                  <div>
                    <CardProduct />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default ListProduct;
