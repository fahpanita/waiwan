import React from "react";
import { Layout, Row, Col, Collapse, Input, Typography, } from "antd";
import Navbar from "../../components/Header/Navbar";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../../services/product";
import Filter from "../../components/Tree/Filter";
import { getCatagory } from "../../services/catagory";
import { getEvent } from "../../services/event";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../../constands/api";
import Card from "react-bootstrap/Card";

const { Title } = Typography;
const { Content } = Layout;

const priceSlide = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    No data
  </p>
);

const ListProduct = () => {

  const [catagories, setCatagory] = useState([]);
  const [events, setEvent] = useState([]);


  const handleGetCatagory = async () => {
    const res = await getCatagory()

    const data = res?.data?.map(c => {
      return {
        title: c.name,
        value: c.id,
        key: c.id,
        children: c.sub.map(s => {
          return {
            title: s.name,
            value: s.id,
            key: s.id,
          }
        }),
      }
    })

    setCatagory(data)
  }

  const handleGetEvent = async () => {
    const res = await getEvent()

    const data = res?.data?.map(e => {
      return {
        title: e.name,
        value: e.id,
        key: e.id,
        children: e.sub.map(t => {
          return {
            title: t.name,
            value: t.id,
            key: t.id,
          }
        }),
      }
    })

    setEvent(data)
  }

  const items = [
    {
      key: "1",
      label: <Title level={5}>หมวดหมู่สินค้า</Title>,
      children: <Filter filterData={catagories} />,
    },
    {
      key: "2",
      label: <Title level={5}>หมวดหมู่เทศกาล</Title>,
      children: <Filter filterData={events} />,
    },
    {
      key: "3",
      label: <Title level={5}>ช่วงราคา</Title>,
      children: <div class="card-body">
        <input type="range" class="form-range" min="0" max="100" />
        <div class="row mb-3">
          <div class="col-6">
            <label for="min" class="form-label">Min</label>
            <input class="form-control" id="min" placeholder="$0" type="number" />
          </div>

          <div class="col-6">
            <label for="max" class="form-label">Max</label>
            <input class="form-control" id="max" placeholder="$1,0000" type="number" />
          </div>
        </div> </div>,
    },
  ];

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const res = await getProducts()
    setProducts(res?.data)
  }

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products?.filter((product) =>
    product.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    handleGetProducts(),
      handleGetCatagory(),
      handleGetEvent()
  }, [])

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
            padding: "0 32px",
          }}
        >
          <Row
            justify="space-evenly"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}
          >
            <Col className="gutter-row" span={5}
              style={{ marginTop: "40px" }}>
              <Collapse
                items={items}
                bordered={false}
                defaultActiveKey={['1', '2', '3']}
                style={{ backgroundColor: "#fff" }}
              />
            </Col>

            <Col className="gutter-row" span={19} style={{ marginTop: "24px" }}>
              <Row
                justify="flex-start"
                gutter={{
                  xs: 8, sm: 16, md: 24, lg: 32,
                }}
              >
                <Col className="gutter-row" style={{ marginTop: '16px' }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
              </Row>

              <Row
                justify="flex-start"
                gutter={{
                  xs: 8, sm: 16, md: 24, lg: 32,
                }}
              >
                {filteredProducts?.map((p) => (
                  <Col className="gutter-row" span={5} key={p.id}>
                    <div style={{ marginTop: '16px' }}>
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
