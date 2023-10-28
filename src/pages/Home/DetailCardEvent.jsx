import React from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import styled from "styled-components";

const { Title } = Typography;
const { Content } = Layout;

export const Img = styled.img`
  width: 100%;
`;

const DetailCardEvent = () => {
  return (
    <>
      <Layout style={{ background: "#FFFEF6" }}>
        <Navbar />
        <Img src="image/img/img-card-1.png" />
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
            เทศกาลตรุษจีน
          </Title>
          <p>
            "วันตรุษจีน" หรือ "เทศกาลตรุษจีน" ถือเป็นงานเฉลิมฉลอง
            ที่สำคัญที่สุดใน ปฏิทินจีน โดยเป็นการฉลอง ขึ้นปีใหม่เปรียบได้
            กับการฉลองในช่วงเทศกาล สงกรานต์ ของไทยและจัดเป็นวันหยุดตามประเพณีใน
            ประเทศจีน เนื่องจากเป็นการเฉลิมฉลองการสิ้นสุดฤดูหนาวและการเริ่มต้น
            ของฤดูใบไม้ผลิ ผู้คนนิยมสักการะเทพเจ้าและ บรรพบุรุษ เพื่อ ขอพร
            ให้พืชผลทางการเกษตรเจริญ งอกงาม และให้ครอบครัว มีกิน มีใช้ตลอดทั้งปี
            เทศกาลนี้เริ่มต้นในวันที่ 1 เดือน 1 ตามปฏิทินจีนทำให้ วัน ตรุษจีน
            หรือ เทศกาลปีใหม่จีนไม่ตรงกันในแต่ละปี และไม่
            ตรงกับวันขึ้นปีใหม่สากล โดยจะตกอยู่ใน ช่วงปลายเดือน
            มกราคมถึงกลางเดือนกุมภาพันธ์ของทุกปี หรือช่วงสิ้น สุดฤดู
            หนาวและเริ่มต้นฤดูใบไม้ผลิที่อากาศเริ่มมีความ อบอุ่นมากขึ้น ส่งผลให้
            สามารถเพาะปลูกและทำการเกษตรได้
          </p>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
};

export default DetailCardEvent;
