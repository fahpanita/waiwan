import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Collapse, Input, Typography, Slider, Drawer, Button, Space, Divider, Card, Pagination, Breadcrumb, } from "antd";
import Navbar from "../../components/Header/Navbar";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import FooterPage from "../../components/Footer/FooterPage";
import { getProducts } from "../../services/product";
import Filter from "../../components/Tree/Filter";
import { getCatagory } from "../../services/catagory";
import { getEvent } from "../../services/event";
import { useLocation } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import FilterProductCatagory from "../../components/Tree/FilterProductCatagory";
import FilterProductCategory from "../../components/Tree/FilterProductCatagory";
import FilterProductEvent from "../../components/Tree/FilterProductEvent";
import styled from "styled-components";


const { Title } = Typography;
const { Content } = Layout;

const ListProduct = () => {

  const [products, setProducts] = useState([]);
  const [catagories, setCatagory] = useState([]);
  const [events, setEvent] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rangeValues, setRangeValues] = useState([0, 0]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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


  useEffect(() => {
    handleGetProducts(),
      handleGetCategories(),
      handleGetEvent()
  }, [])


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const filterProductsByCategories = (selectedCategories, allProducts) => {
    if (selectedCategories?.length === 0) {
      return allProducts; // No categories selected, return all products
    }

    // Filter products that belong to at least one selected category
    return allProducts?.filter((product) =>
      product?.categories?.some((category) => selectedCategories?.includes(category.id))
    );
  };

  const handleGetProducts = async () => {
    const res = await getProducts();
    const fetchedProducts = res?.data || [];

    // Update both products and filteredProducts states
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const combinedProducts = [...filteredPrice, ...filteredSearch];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = combinedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Layout
        style={{ background: "#F5F5F5", }}>

        <Navbar />
        <Content style={{ padding: "0 32px", }}>

          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item>รายการสินค้า</Breadcrumb.Item>
          </Breadcrumb>

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
              <FilterProductCategory filterData={catagories} onCategoryChange={setSelectedCategories} />

              <Divider />
              <Title level={5}>หมวดหมู่เทศกาล</Title>
              <FilterProductEvent filterData={events} />
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
              <Card title="ค้นหาแบบละเอียด" bordered={false} style={{ position: "sticky", top: "16px", }}>
                <Title level={5}>หมวดหมู่สินค้า</Title>
                <FilterProductCategory filterData={catagories} onCategoryChange={setSelectedCategories} />

                <Divider />
                <Title level={5}>หมวดหมู่เทศกาล</Title>
                <FilterProductEvent filterData={events} />
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {currentProducts.length > 0 ? (
                  currentProducts.map((p) => (
                    <Col key={p.id} className="gutter-row" xs={12} sm={9} md={9} lg={6}>
                      <div style={{ marginTop: '10px' }}>
                        <CardProduct data={p} />
                      </div>
                    </Col>
                  ))
                ) : (
                  <div>No products found.</div>
                )}
              </Row>
              {combinedProducts.length > itemsPerPage && (
                <PaginationBtn
                  current={currentPage}
                  onChange={handleChangePage}
                  pageSize={itemsPerPage}
                  total={combinedProducts.length}
                  style={{ marginTop: '20px', textAlign: 'center' }}
                />
              )}
            </Col>

          </Row>
        </Content>
        <FooterPage />
      </Layout>
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
`;

