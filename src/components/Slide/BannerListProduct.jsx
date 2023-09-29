import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000",
};

export const Img = styled.img`
  width: 100%;
`;
const BannerListProduct = () => {
  return (
    <Carousel autoplay>
      <div>
        <Img src="image/img/banner-01.png" />
      </div>
      <div>
        <Img src="image/img/banner-02.png" />
      </div>
      <div>
        <Img src="image/img/banner-01.png" />
      </div>
    </Carousel>
  );
};

export default BannerListProduct;
