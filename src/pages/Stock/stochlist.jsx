import React, { useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import {
  Input,
  Col,
  Row,
  Divider,
  Layout,
  Typography,
  Table,
  Empty,
} from "antd";
import Navbar from "../../components/Header/Navbar";
import FooterPage from "../../components/Footer/FooterPage";
import { Link } from "react-router-dom";
import MenuAccount from "../../components/Menu/MenuAccount";
import styled from "styled-components";

const { Content } = Layout;
const { Title, Text } = Typography;

// const columns = [

//   {
//       title: 'รูป',
//       dataIndex: 'thumbnail',
//       render: (text) => <Image src={`${BASE_URL}/${text}`} width={70} />,
//   },
//   {
//       title: 'ชื่อสินค้า',
//       dataIndex: 'name',
//   },
//   {
//       title: 'ราคา',
//       dataIndex: 'price',
//   },
//   {
//       title: 'จำนวนสินค้า',
//       dataIndex: 'stock',
//   },

// ];

const StockList = () => {
  const { profile } = useAuth();
  console.log(profile);

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
            padding: "0 50px",
            marginBottom: "100px",
          }}
        >
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-evenly"
            style={{ marginTop: "32px" }}
          >
            <Col className="gutter-row" span={5}>
              <MenuAccount />
            </Col>
            <Col
              className="gutter-row"
              span={19}
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <div style={{ marginTop: "16px" }}>
                <Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500" }}>
                  รายการที่ต้องชำระ
                </Text>
              </div>

              <TableStock
                style={{
                  marginTop: 8,
                }}
                columns={[
                  {
                    title: "สินค้า",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "จำนวน",
                    dataIndex: "stock",
                    key: "stock",
                  },
                  {
                    title: "ราคา",
                    dataIndex: "price",
                    key: "price",
                  },
                ]}
              />
            </Col>
          </Row>
        </Content>
        <FooterPage />
      </Layout >
    </>
  );
};

export default StockList;

export const TableStock = styled(Table)`
  &.ant-table-thead > tr > th{
    font-weight: 500;
  }

  &.ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    font-family: 'Chakra Petch', sans-serif;
    font-size: 16px;
    font-weight: 500;
  }
`;