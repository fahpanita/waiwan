import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import { Button, Layout, Typography } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { getCartEventsId } from "../../services/cartEvents";
import { BASE_URL } from "../../constands/api";
import { useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

export const Img = styled.img`
  width: 100%;
`;

const DetailCardEvent = () => {

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [cardevents, setCartEvents] = useState([]);
  //console.log(id)

  const handleGetCartEvents = async (id) => {
    const res = await getCartEventsId(id)
    setCartEvents(res?.data)
  }

  useEffect(() => {
    if (id) {
      handleGetCartEvents(id)
    }

  }, [id])


  return (
    <>
      <Layout style={{ background: "#ffffff" }}>
        <Navbar />
        <Img src={`${BASE_URL}/${cardevents?.thumbnail}`} style={{ height: "600px", objectFit: "cover", objectPosition: "top" }} />
        <div
          className="card"
          style={{
            marginTop: "-450px",
            height: "455px",
            border: "none",
            flexShrink: "0",
            borderRadius: "none",
            background:
              "linear-gradient(0deg, #ffffff 0%, rgba(255, 254, 246, 0.00) 100%)",

          }}
        />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Text style={{ textAlign: "left", fontFamily: "'Chakra Petch', sans-serif", fontSize: "34px", fontWeight: "600" }}>
            {cardevents?.name}
          </Text>

          <div style={{ textAlign: "left", fontFamily: "'Chakra Petch', sans-serif", marginBottom: "70px" }}
            dangerouslySetInnerHTML={{
              __html: cardevents?.detail,
            }}
          />

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
            <Button type="primary" shape="round" size="large" href="/setChineseYear"
              style={{ background: '#bf9f64', fontFamily: "'Chakra Petch', sans-serif", fontSize: '18px' }}
            >ทดลองจัดไหว้เทศกาลนี้
            </Button>
          </div>
        </Content>

        <FooterPage />
      </Layout>
    </>
  );
};

export default DetailCardEvent;
