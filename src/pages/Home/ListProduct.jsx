import React from "react";
import { Layout, Row, Col, Collapse, Input, Typography } from "antd";
import Navbar from "../../components/Header/Navbar";
import BannerListProduct from "../../components/Slide/BannerListProduct";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../../services/product";

const { Title } = Typography;
const { Content } = Layout;
const onChange = (value) => {
  console.log("changed", value);
};

const select = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    No data
  </p>
);

const priceSlide = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    No data
  </p>
);

const items = [
  {
    key: "1",
    label: <Title level={5}>หมวดหมู่สินค้า</Title>,
    children: select,
  },
  {
    key: "2",
    label: <Title level={5}>หมวดหมู่เทศกาล</Title>,
    children: select,
  },
  {
    key: "3",
    label: <Title level={5}>ช่วงราคา</Title>,
    children: priceSlide,
  },
];

const ListProduct = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const res = await getProducts()
    setProducts(res?.data)
  }

  useEffect(() => {
    handleGetProducts()
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

          >
            <Col className="gutter-row" span={5}
              style={{ marginTop: "50px" }}>
              <Collapse
                items={items}
                bordered={false}
                defaultActiveKey={[""]}
              />
            </Col>

            <Col className="gutter-row" span={15} style={{ marginTop: "26px" }}>
              <Row
                justify="flex-start"
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {products?.map(p => (
                  <Col className="gutter-row" span={6}>
                    <div style={{ marginTop: "24px" }}>
                      <CardProduct data={p} />
                    </div>
                  </Col>
                ))}
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
