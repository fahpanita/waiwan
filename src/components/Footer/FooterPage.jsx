import React from "react";

import { Layout, Image } from "antd";

const { Footer } = Layout;

const FooterPage = () => {
  return (
    <>
      <Layout>
        <Footer
          style={{
            background: "#E9E9E9",
            marginTop: "120px",
          }}
        >
          <div class="container">
            <section class="footer-main padding-y">
              <div class="row">
                <aside class="col-12 col-sm-12 col-lg-2">
                  <article class="me-lg-4">
                    <Image
                      preview={false}
                      width={100}
                      src="image/img/Logo.png"
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
                    <li>
                      {" "}
                      <a>ที่ตั้งร้านค้า เวลาเปิด/ปิด</a>
                    </li>
                  </ul>
                </aside>

                <aside class="col-6 col-sm-4  col-lg-2">
                  <h6 class="title">บริการจัดส่ง</h6>
                  <ul class="list-menu mb-4">
                    <li>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="image/img/nim-express.png"
                      />
                    </li>
                    <li style={{ marginTop: "5px" }}>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="image/img/flash-express.png"
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
                        src="image/img/promtpay.png"
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
                        src="image/img/line.png"
                      />
                      <a>Line</a>
                    </li>
                    <li>
                      {" "}
                      <Image
                        preview={false}
                        width={40}
                        height={40}
                        src="image/img/facebook.png"
                      />
                      <a>Facebook</a>
                    </li>
                  </ul>
                </aside>
                {/* <aside class="col-12 col-sm-12 col-lg-3">
                  <h6 class="title">Newsletter</h6>
                  <p>
                    Stay in touch with latest updates about our products and
                    offers{" "}
                  </p>

                  <form class="mb-3">
                    <div class="input-group">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Email"
                      />
                      <button class="btn btn-light" type="submit">
                        Join
                      </button>
                    </div>
                  </form>
                </aside> */}
              </div>
            </section>
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default FooterPage;
