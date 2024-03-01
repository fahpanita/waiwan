import React, { useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { Image, Tabs } from "antd";
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
import HistoryUser from "../../components/Users/historyUser";

const { Content } = Layout;
const { Title, Text } = Typography;

const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: '1',
    label: 'รายการที่ค้างชำระ',
    children: <HistoryUser />,
  },
  {
    key: '2',
    label: 'รายการที่สั่งซื้อสำเร็จ',
    children: 2,
  },
];


const StockList = () => {
  const { profile } = useAuth();
  // console.log(profile);

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
                  ประวัติการสั่งซื้อ
                </Text>
              </div>

              {/* <CardBox > */}
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              {/* </CardBox> */}

              {/* <TableStock
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
              /> */}
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