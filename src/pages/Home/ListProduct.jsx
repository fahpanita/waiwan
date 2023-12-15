import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Collapse, Input, Typography, Slider, Drawer, Button, Space, Divider, Card, Pagination, } from "antd";
import Navbar from "../../components/Header/Navbar";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";
import { getProducts } from "../../services/product";
import Filter from "../../components/Tree/Filter";
import { getCatagory } from "../../services/catagory";
import { getEvent } from "../../services/event";
import { useLocation } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const ListProduct = () => {

  const [products, setProducts] = useState([]);
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

  const [rangeValues, setRangeValues] = useState([0, 0]);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  const [filteredPrice, setFilteredPrice] = useState([]);

  const filteredSearch = products?.filter((product) =>
    product.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handlePriceChange = (values) => {
    setRangeValues(values);

    const newFilteredPrice = products?.filter(product => {
      const productPrice = product?.price || 0;
      return productPrice >= values[0] && productPrice <= values[1];
    });

    setFilteredPrice(newFilteredPrice);

    console.log(newFilteredPrice)
  };

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
      children:
        <div className="card-body">
          <Slider range defaultValue={rangeValues} onChange={handlePriceChange} max={1000} />
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="min" className="form-label">Min</label>
              <input className="form-control" id="min" placeholder="฿0" type="number" value={rangeValues[0]} />
            </div>
            <div className="col-6">
              <label htmlFor="max" className="form-label">Max</label>
              <input className="form-control" id="max" placeholder="฿10,000" type="number" value={rangeValues[1]} />
            </div>
          </div>
        </div>
      ,
    },
  ];

  const handleGetProducts = async () => {
    const res = await getProducts()
    setProducts(res?.data)
  }

  useEffect(() => {
    handleGetProducts(),
      handleGetCatagory(),
      handleGetEvent()
  }, [])

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Layout
        style={{ background: "#F5F5F5", }}>

        <Navbar />
        <Content style={{ padding: "0 32px", }}>

          <Row style={{ marginTop: "20px" }}>
            <Col xs={2} sm={2} md={0} >
              <Button onClick={showDrawer} size="large">
                <FilterOutlined /> ค้นหาแบบละเอียด
              </Button>
            </Col>
            <Col xs={24} sm={2} md={0} lg={0} >
              <Divider />
            </Col>
          </Row>
          <Drawer
            title="ค้นหาแบบละเอียด"
            placement="left"
            onClose={onClose}
            open={open}
            extra={
              <Space>
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button onClick={onClose} type="primary">ยืนยัน</Button>
              </Space>
            }
          >
            <Card>
              <Title level={5}>หมวดหมู่สินค้า</Title>
              <Filter filterData={catagories} />
              <Divider />
              <Title level={5}>หมวดหมู่เทศกาล</Title>
              <Filter filterData={events} />
              <Divider />
              <Title level={5}>ช่วงราคา</Title>
              <div className="card-body">
                <Slider range defaultValue={rangeValues} onChange={handlePriceChange} max={1000} />
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="min" className="form-label">ราคาต่ำ:</label>
                    <input className="form-control" id="min" placeholder="฿0" type="number" value={rangeValues[0]} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="max" className="form-label">ราคาสูง:</label>
                    <input className="form-control" id="max" placeholder="฿10,000" type="number" value={rangeValues[1]} />
                  </div>
                </div>
              </div>
            </Card>
          </Drawer>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center">
            <Col xs={0} sm={9} md={9} lg={6} style={{ marginTop: '10px' }}>
              <Card title="ค้นหาแบบละเอียด" bordered={false}>
                <Title level={5}>หมวดหมู่สินค้า</Title>
                <Filter filterData={catagories} />
                <Divider />
                <Title level={5}>หมวดหมู่เทศกาล</Title>
                <Filter filterData={events} />
                <Divider />
                <Title level={5}>ช่วงราคา</Title>

                <div className="card-body">
                  <Slider range defaultValue={rangeValues} onChange={handlePriceChange} max={1000} />
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="min" className="form-label">ราคาต่ำ:</label>
                      <input className="form-control" id="min" placeholder="฿0" type="number" value={rangeValues[0]} />
                    </div>
                    <div className="col-6">
                      <label htmlFor="max" className="form-label">ราคาสูง:</label>
                      <input className="form-control" id="max" placeholder="฿10,000" type="number" value={rangeValues[1]} />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg={16}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
                {(filteredPrice?.length > 0 || filteredSearch?.length > 0) ? (
                  <>
                    {filteredPrice?.map((p) => (
                      <Col
                        key={p.id}
                        className="gutter-row"
                        xs={12}
                        sm={9}
                        md={9}
                        lg={6}
                      >
                        <div style={{ marginTop: '10px' }}>
                          <CardProduct data={p} />
                        </div>
                      </Col>
                    ))}

                    {filteredSearch?.map((p) => (
                      <Col
                        key={p.id}
                        className="gutter-row"
                        xs={12}
                        sm={9}
                        md={9}
                        lg={6}
                      >
                        <div style={{ marginTop: '10px' }}>
                          <CardProduct data={p} />
                        </div>
                      </Col>
                    ))}
                  </>
                ) : (
                  <div>No products found.</div>
                )}
              </Row>
            </Col>



          </Row>

          {/* <Row justify="flex-start" gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} >
            {(filteredPrice?.length > 0 || filteredSearch?.length > 0) ? (
              <>
                {filteredPrice?.map((p) => (
                  <Col
                    key={p.id}
                    className="gutter-row"
                    xs={12}
                    sm={9}
                    md={9}
                    lg={4}
                  >
                    <div style={{ marginTop: '10px' }}>
                      <CardProduct data={p} />
                    </div>
                  </Col>
                ))}

                {filteredSearch?.map((p) => (
                  <Col
                    key={p.id}
                    className="gutter-row"
                    xs={12}
                    sm={9}
                    md={9}
                    lg={4}
                  >
                    <div style={{ marginTop: '16px' }}>
                      <CardProduct data={p} />
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <div>No products found.</div>
            )}
          </Row> */}
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default ListProduct;
