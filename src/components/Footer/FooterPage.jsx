import React from "react";
import { Layout, Image, Row, Col, Typography, } from "antd";
import { Tab } from "bootstrap";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterPage = () => {
  return (
    <>
      <Layout>
        <Footer
          style={{
            background: "#E9E9E9",
            // marginTop: "120px",
            fontFamily: "Chakra Petch, sans-serif", fontSize: "16px"
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>เกี่ยวกับไหว้วาน</div>
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                <Link to="/experiment" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400", color: "#000" }}>ทดลองจัดวางของไหว้เจ้า</Link>
                <Link to="/allCardEvent" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400", color: "#000" }}>บทความเทศกาล</Link>
                <Link to="/" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400", color: "#000" }}>เกี่ยวกับเรา</Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>บริการจัดส่งที่รองรับ</div>
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                <Link to='https://www.nimexpress.com/web/p/home'>
                  <Image preview={false} width={50} src="/image/img/nim-express.png" />
                </Link>
                <Link to='https://www.flashexpress.co.th/fle/tracking'>
                  <Image preview={false} width={50} src="/image/img/flash-express.png" style={{ marginTop: "5px" }} />
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>วิธีการชำระเงิน</div>
              <Image preview={false} width={100} src="/image/img/promtpay.png" style={{ marginBottom: "20px" }} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: "500", }}>ติดตามเรา</div>
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                <Image preview={false} width={100} src="/image/img/qrcode_line.png" />
                <Link to='https://liff.line.me/1645278921-kWRPP32q/?accountId=940aeljm' style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "400", color: "#000" }}>LINE Official Account : WAI-WAN</Link>
              </div>
            </Col>
          </Row>

          {/* <div class="container">
            <section class="footer-main padding-y">
              <div class="row">
                <aside class="col-12 col-sm-12 col-lg-2">
                  <article class="me-lg-4">
                    <Image
                      preview={false}
                      width={100}
                      src="/image/img/Logo.png"
                    />
                    <p class="mt-3">
                      {" "}
                      © 2023 waiwan. <br /> All rights reserved.{" "}
                    </p>
                  </article>
                </aside>
                <aside class="col-6 col-sm-4 col-lg-2">
                  <h6 class="title">ศูนย์ช่วยเหลือ</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <a>สั่งซื้อสินค้าอย่างไร</a>
                    </li>
                    <li>
                      {" "}
                      <a>ช่องทางการชำระเงิน</a>
                    </li>
                    <li>
                      {" "}
                      <a>การจัดส่งสินค้า</a>
                    </li>
                    <li>
                      {" "}
                      <a>การคืนเงินและคืนสินค้า</a>
                    </li>
                  </ul>
                </aside>
                <aside class="col-6 col-sm-4 col-lg-2">
                  <h6 class="title">เกี่ยวกับไหว้วาน</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <a>เกี่ยวกับเรา</a>
                    </li>
                  </ul>
                </aside>

                <aside class="col-6 col-sm-4  col-lg-2">
                  <h6 class="title">บริการจัดส่งที่รองรับ</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="/image/img/nim-express.png"
                      />
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="/image/img/flash-express.png"
                      />
                    </li>
                  </ul>
                </aside>
                <aside class="col-6 col-sm-4  col-lg-2">
                  <h6 class="title">วิธีการชำระเงิน</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <Image
                        preview={false}
                        width={120}
                        height={40}
                        src="/image/img/promtpay.png"
                      />
                    </li>
                  </ul>
                </aside>
                <aside class="col-6 col-sm-4  col-lg-2">
                  <h6 class="title">ติดตามเรา</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="/image/img/qrcode_line.png"
                      />
                      <a>LINE Official Account : WAI-WAN</a>
                    </li>
                  </ul>
                </aside>
              </div>
            </section>
          </div> */}
        </Footer>
      </Layout >
    </>
  );
};

export default FooterPage;
