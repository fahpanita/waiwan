import React from "react";

import { Layout } from "antd";

const { Footer } = Layout;

const FooterPage = () => {
  return (
    <>
      <Layout>
        <Footer
          style={{
            background: "#E9E9E9",
          }}
        >
          <div className="">Footer</div>
        </Footer>
      </Layout>
    </>
  );
};

export default FooterPage;
