import React, { useEffect } from "react";
import styled from "styled-components";
import AuthenticatedProvider from "../../Providers/AuthenticatedProvider";
import LineLogin from "./LineLogin";
import Link from "../../components/Link";
import { Input, Space, Image, Select } from "antd";
import { getProducts } from "../../services/product";
import liff from "@line/liff";

const Home = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleGetProduct = async () => {
    const res = await getProducts(liff.getAccessToken());
    console.log(res.data);
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <AuthenticatedProvider>
      <Container>
        <div className="abc">ไหว้วาน</div>
        <Img src="image/img/banner-1.png" />
        <div className="row">
          <div className="col-md-2">
            <Select
              defaultValue="lucy"
              style={{
                width: "100%",
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
          <div className="col col-md-10">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>
        <Icon src="image/icons/fire-left.png" />
        <div className="font-36">เทรนด์นิยมช่วงนี้</div>
        <div className="center">
          <Card src="image/img/card-1.png" />
          <Card src="image/img/card-2.png" />
          <Card src="image/img/card-1.png" />
        </div>

        {/* <Icon src="image/icons/line_2k.svg" />
                <Link to="/stock">Blogs</Link> */}
        {/* <Imgrounder
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}
        <LineLogin />
      </Container>
    </AuthenticatedProvider>
  );
};

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  .abc {
    font-size: 50px;
    text-align: center;
  }
  .font-36 {
    font-family: "Athiti", sans-serif;
    font-size: 36px;
  }
`;

export const Img = styled.img`
  width: 100%;
`;

export const Card = styled.img`
  width: 32%;
  float: left;
`;

export const Icon = styled.img`
  width: 36px;
  float: left;
`;

export const Imgrounder = styled(Image)`
  border-radius: 100px;

  &.ant-image .ant-image-mask {
    color: aqua !important;
  }
`;

export default Home;
