import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Input,
  Col,
  Row,
  Layout,
  Typography,
  Divider,
  Card,
  Statistic,
  Image,
  List,
  Pagination,
} from "antd";
import Filter from "../../components/Tree/Filter";
import CardEvent from "../../components/CardKnowlage/CardEvent";
import CardProduct from "../../components/CardKnowlage/CardProduct";
import Navbar from "../../components/Header/Navbar";
import BannerHome from "../../components/Slide/BannerHome";
import FooterPage from "../../components/Footer/FooterPage";
import { getProducts } from "../../services/product";
import { getCartEvents } from "../../services/cartEvents";
import { RightCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;
export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const Home = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const res = await getProducts();
    setProducts(res?.data);
  };

  const [cardevents, setCartEvents] = useState([]);

  const handleGetCartEvents = async () => {
    const res = await getCartEvents();
    setCartEvents(res?.data);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [currentPageEvents, setCurrentPageEvents] = useState(1);
  const itemsPerPageEvents = 4;

  const indexOfLastItemEvents = currentPageEvents * itemsPerPageEvents;
  const indexOfFirstItemEvents = indexOfLastItemEvents - itemsPerPageEvents;
  const currentEvents = cardevents.slice(indexOfFirstItemEvents, indexOfLastItemEvents);

  const handlePageChangeEvents = (page) => {
    setCurrentPageEvents(page);
  };

  useEffect(() => {
    handleGetProducts(), handleGetCartEvents();
  }, []);

  return (
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
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="space-evenly"
          style={{ marginTop: "32px" }}
        >
          <Col className="gutter-row"
            xs={24} sm={9} md={9} lg={15}>
            <BannerHome />
          </Col>

          <Col className="gutter-row"
            xs={24} sm={9} md={9} lg={9}
            style={{ display: "flex" }}
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={12} sm={9} md={9} lg={24}
                style={{ display: "flex", marginTop: "2px" }}
              >
                <Img src="image/img/frame-3.png" />
              </Col>
              <Col
                xs={12} sm={9} md={9} lg={24}
                style={{ display: "flex", marginTop: "2px" }}
              >
                <Img src="image/img/frame-4.png" />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Col span={24}>
            <Title level={3}>หมวดหมู่</Title>
          </Col>
          <Col span={24} offset={0}>
            <div
              style={{
                backgroundColor: "#fff",
                height: "auto",
                padding: "20px 0",
              }}
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Col
                  span={24}
                  className="gutter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                  }}
                >
                  <Row
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Col>
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image
                            src="image/img/ตรุษจีน.jpg"
                            preview={false}
                          />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>
                        เทศกาลจีน
                      </div>
                    </Col>
                  </Row>

                  <Row
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Col>
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image
                            src="image/img/ไทย.jpg"
                            preview={false}
                          />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>
                        เทศกาลไทย
                      </div>
                    </Col>
                  </Row>

                  <Row
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Col>
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image
                            src="image/img/image 134.png"
                            preview={false}
                          />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>
                        เทพเจ้าจีน
                      </div>
                    </Col>
                  </Row>

                  <Row
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Col>
                      <Cards bordered={false}>
                        <Cardcatagory>
                          <Image
                            src="image/img/image 133.png"
                            preview={false}
                          />
                        </Cardcatagory>
                      </Cards>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", marginLeft: "10px" }}>
                        เทพเจ้าไทย
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "40px", marginBottom: "10px" }}>
          <Col span={10}>
            <Title level={3}>สินค้าสำหรับคุณ</Title>
          </Col>
          <Col span={6} offset={8}>
            <a
              style={{
                float: "right",
                textDecoration: "none",
                color: "#1D1D1F",
              }}
              href="/listProduct"
            >
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>

        <Row justify="flex-start" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {currentProducts.map((p) => (
            <Col key={p.id} className="gutter-row" xs={12} sm={9} md={9} lg={4} style={{ marginBottom: '20px' }}><CardProduct data={p} /></Col>
          ))}
        </Row>

        <PaginationBtn
          current={currentPage}
          pageSize={itemsPerPage}
          total={products.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        <Divider dashed style={{ marginTop: "40px" }} />
        <Row style={{ marginTop: "40px", marginBottom: "10px" }}>
          <Col span={10}>
            <Title level={3}>บทความเทศกาล</Title>
          </Col>
          <Col span={6} offset={8}>
            <a
              style={{
                float: "right",
                textDecoration: "none",
                color: "#1D1D1F",
              }}
              href="/allCardEvent"
            >
              ดูทั้งหมด {<RightCircleOutlined />}
            </a>
          </Col>
        </Row>

        <Row justify="flex-start" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {currentEvents.map((c) => (
            <Col
              key={c.id}
              className="gutter-row"
              xs={24}
              sm={9}
              md={9}
              lg={6}
              style={{ marginBottom: '20px' }}
            >
              <CardEvent datacard={c} />
            </Col>
          ))}
        </Row>

        <PaginationBtn
          current={currentPageEvents}
          pageSize={itemsPerPageEvents}
          total={cardevents.length}
          onChange={handlePageChangeEvents}
          showSizeChanger={false}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </Content>
      <FooterPage />
    </Layout>
  );
};

export const Cardcatagory = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const PaginationBtn = styled(Pagination)`


  &.ant-pagination .ant-pagination-item-active {
   
    border-color: #a08155;
  }
  &.ant-pagination .ant-pagination-item-active>a {
    color: #a08155;
    
  }
`;

export default Home;
