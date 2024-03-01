import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Collapse, Input, Typography, Slider, Drawer, Button, Space, Divider, Card, Pagination, Breadcrumb, } from "antd";
import Navbar from "../../components/Header/Navbar";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";
import { getProducts } from "../../services/product";
import Filter from "../../components/Tree/Filter";
import { getCatagory } from "../../services/catagory";
import { getEvent } from "../../services/event";
import { Link, useLocation, useParams } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import FilterProductCatagory from "../../components/Tree/FilterProductCatagory";
import FilterProductCategory from "../../components/Tree/FilterProductCatagory";
import FilterProductEvent from "../../components/Tree/FilterProductEvent";
import styled from "styled-components";
import { MehOutlined } from '@ant-design/icons';
import { getCategory, getEvents } from "../../services/backend";

const { Title, Text } = Typography;
const { Content } = Layout;

const ListProduct = () => {

  const { searchQuery: urlSearchQuery } = useParams();
  const location = useLocation();
  const searchQueryFromUrl = location.state?.searchQuery || urlSearchQuery || '';

  const [products, setProducts] = useState([]);

  const [catagories, setCatagory] = useState([]);
  const [events, setEvent] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [rangeValues, setRangeValues] = useState([0, 0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  // const location = useLocation();
  // const searchQueryFromUrl = location.state?.searchQuery || '';
  const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl);

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handleGetProducts = async () => {
    try {
      const res = await getProducts(searchQuery);
      const fetchedProducts = res?.data || [];

      const filteredProducts = fetchedProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleGetCategories = async () => {
    const res = await getCatagory();

    const data = res?.data?.map((c) => {
      return {
        title: c.name,
        value: c.id,
        key: c.id,
        children: c.sub.map((s) => {
          return {
            title: s.name,
            value: s.id,
            key: s.id,
          };
        }),
      };
    });

    setCatagory(data);
  };

  const getProductsByCategory = async (selectedCategoryIds) => {
    try {
      const res = await getCategory({ categoryIds: selectedCategoryIds });

      if (res && res.data) {
        const products = res.data;

        return products;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCategoryChange = async (selectedCategoryIds) => {
    setSelectedCategories(selectedCategoryIds);

    try {
      const res = await getProductsByCategory(selectedCategoryIds);
      const products = res || [];

      const uniqueProducts = Array.from(new Set(products.map(p => p.id))).map(id => {
        return products.find(p => p.id === id);
      });

      setFilteredProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const getProductsByEvent = async (selectedEventIds) => {
    try {
      const res = await getEvents({ eventIds: selectedEventIds });

      if (res && res.data) {
        const products = res.data;

        return products;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEventChange = async (selectedEventIds) => {
    setSelectedEvent(selectedEventIds);

    try {
      const res = await getProductsByEvent(selectedEventIds);
      const products = res || [];

      const uniqueProducts = Array.from(new Set(products.map(p => p.id))).map(id => {
        return products.find(p => p.id === id);
      });

      setFilteredProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handlePriceChange = (values) => {
    // Update the state when the price range changes
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };


  // useEffect(() => {
  //   handleGetProducts();
  //   handleGetCategories();
  //   handleGetEvent();
  //   setFilteredProducts(products);
  // }, [searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const res = await getProducts(searchQuery);
        const fetchedProducts = res?.data || [];

        // Apply search query filter
        const filteredBySearch = fetchedProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Apply category filter
        const filteredByCategory = selectedCategories.length > 0
          ? await getProductsByCategory(selectedCategories)
          : fetchedProducts;

        // Apply event filter
        const filteredByEvent = selectedEvent.length > 0
          ? await getProductsByEvent(selectedEvent)
          : filteredByCategory;

        // Apply price range filter
        const filteredByPriceRange = filteredByEvent.filter(product =>
          product.price >= minPrice && product.price <= maxPrice
        );

        // If no specific filters are selected, return all products
        const finalFilteredProducts = selectedCategories.length > 0 || selectedEvent.length > 0 || minPrice > 0 || maxPrice > 0
          ? filteredByPriceRange
          : filteredBySearch;

        setProducts(finalFilteredProducts);
        setFilteredProducts(finalFilteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategoriesAndEvents = async () => {
      try {
        await handleGetCategories();
        await handleGetEvent();
      } catch (error) {
        console.error("Error fetching categories and events:", error);
      }
    };

    fetchProducts();
    fetchCategoriesAndEvents();
  }, [searchQuery, selectedCategories, selectedEvent, minPrice, maxPrice]);

  return (
    <>
      <Layout
        style={{ background: "#F5F5F5", }}>

        <Navbar />
        <Content style={{ padding: "0 32px", marginBottom: "70px" }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>

            <Breadcrumb.Item><Link to={'/'} style={{ textDecoration: "none" }}>หน้าแรก</Link></Breadcrumb.Item>

            <Breadcrumb.Item>รายการสินค้า</Breadcrumb.Item>
          </Breadcrumb>

          <Row style={{ marginTop: "20px" }}>
            <Col xs={2} sm={2} md={0} >
              <Button onClick={showDrawer} size="large" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", border: "1px solid #A08155", color: "#A08155" }}>
                <FilterOutlined /> ค้นหาแบบละเอียด
              </Button>
            </Col>
            <Col xs={24} sm={2} md={0} lg={0} >
              <Divider />
            </Col>
          </Row>
          <Drawer
            title={<Text style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: "16px" }}>ค้นหาแบบละเอียด</Text>}
            placement="left"
            onClose={onClose}
            open={open}
            extra={
              <Space>
                {/* <Button onClick={onClose}>ยกเลิก</Button> */}
                <Button onClick={onClose} type="primary" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" }}>ยืนยัน</Button>
              </Space>
            }
          >
            <Card>
              <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>หมวดหมู่สินค้า</Text>
              <FilterProductCategory filterData={catagories} onCategoryChange={handleCategoryChange} />
              <Divider />
              <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>หมวดหมู่เทศกาล</Text>
              <FilterProductEvent filterData={events} onEventChange={handleEventChange} />
              <Divider />
              <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>ช่วงราคา</Text>
              <div className="card-body">
                <Slider range defaultValue={[minPrice, maxPrice]} max={5000} onChange={handlePriceChange} />
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="min" className="form-label" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ราคาต่ำ:</label>
                    <input
                      className="form-control"
                      id="min"
                      placeholder="฿0"
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                      style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="max" className="form-label" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ราคาสูง:</label>
                    <input
                      className="form-control"
                      id="max"
                      placeholder="฿10,000"
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Drawer>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify="center">
            <Col xs={0} sm={9} md={9} lg={6} style={{ marginTop: '10px' }}>
              <Card
                // title="ค้นหาแบบละเอียด" 
                bordered={false} style={{ position: "sticky", top: "16px", fontFamily: "'Chakra Petch', sans-serif" }}>
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>หมวดหมู่สินค้า</Text>
                <div style={{ marginTop: "10px" }}>
                  <FilterProductCategory filterData={catagories} onCategoryChange={handleCategoryChange} />
                </div>
                <Divider />
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>หมวดหมู่เทศกาล</Text>
                <div style={{ marginTop: "10px" }}>
                  <FilterProductEvent filterData={events} onEventChange={handleEventChange} />
                </div>
                <Divider />
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>ช่วงราคา</Text>

                <div className="card-body">
                  <Slider range defaultValue={[minPrice, maxPrice]} max={5000} onChange={handlePriceChange} />
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="min" className="form-label" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ราคาต่ำ:</label>
                      <input
                        className="form-control"
                        id="min"
                        placeholder="฿0"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="max" className="form-label" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>ราคาสูง:</label>
                      <input
                        className="form-control"
                        id="max"
                        placeholder="฿10,000"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}
                      />
                    </div>
                  </div>
                </div>

              </Card>
            </Col>
            <Col lg={16}>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <Col key={p.id} className="gutter-row" xs={12} sm={9} md={9} lg={6}>
                      <div style={{ marginTop: '10px' }}>
                        <CardProduct data={p} />
                      </div>
                    </Col>
                  ))
                ) : (
                  <Col style={{ width: "80%", display: "flex", justifyContent: "center" }}>
                    <div>
                      <div id="notfound" style={{ backgroundColor: "#F4E5C8", width: "250px", height: "250px", borderRadius: "50%", display: "flex", flexDirection: "column" }}>
                        <div class="notfound" style={{ width: "400px", marginTop: "80px", marginLeft: "60px", display: "flex" }}>
                          <Col span={1}>
                            <MehOutlined style={{ fontSize: "100px" }} />
                          </Col>
                          <Col span={23} style={{ marginLeft: "80px", fontFamily: "'Chakra Petch', sans-serif" }}>
                            <div class="notfound-404">
                              <h1>ไม่พบสินค้า</h1>
                              <p>คำที่คุณค้นหาไม่มีในรายการสินค้า<br />โปรดลองอีกครั้ง</p>
                            </div>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </Col>
                )}


              </Row>


            </Col>

          </Row>
        </Content >
        <FooterPage />
      </Layout >
    </>
  );
};

export default ListProduct;

export const PaginationBtn = styled(Pagination)`

  &.ant-pagination .ant-pagination-item-active {
    border-color: #a08155;
  }
  &.ant-pagination .ant-pagination-item-active>a {
    color: #a08155;
  }
  &.ant-pagination .ant-pagination-item{
    font-family: 'Chakra Petch', sans-serif;
  }
`;

