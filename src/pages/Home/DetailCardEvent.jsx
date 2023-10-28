import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Typography } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";
import { getCartEventsId } from "../../services/cartEvents";
import { BASE_URL } from "../../constands/api";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;
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
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Img src={`${BASE_URL}/${cardevents?.thumbnail}`} />
        <div
          className="card"
          style={{
            marginTop: "-450px",
            height: "455px",
            border: "none",
            flexShrink: "0",
            borderRadius: "none",
            background:
              "linear-gradient(0deg, #FFFEF6 0%, rgba(255, 254, 246, 0.00) 100%)",
          }}
        />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Title level={2} style={{ textAlign: "left" }}>
            {cardevents?.name}
          </Title>
          <p dangerouslySetInnerHTML={{ __html: "&amp;nbsp;" }} />
          {cardevents?.detail}
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default DetailCardEvent;
