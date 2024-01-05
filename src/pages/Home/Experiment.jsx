import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Card } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import { Link } from "react-router-dom";


const { Title } = Typography;
const { Content } = Layout;

const Experiment = () => {
  return (
    <>
      <Layout
        style={{
          background: "#F5F5F5",
        }}
      >
        <Navbar />
        <Content>
          <Title level={4} style={{ marginTop: "50px", textAlign: "center" }}>
            ทดลองจัดวางของไหว้เจ้า
          </Title>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            {/* setAncestor */}
            <Button Button type="primary" href="/setAncestor">ทดลองจัดไหว้</Button>


          </Card>
        </Content>
        <FooterPage />
      </Layout >
    </>
  );
};

export default Experiment;
