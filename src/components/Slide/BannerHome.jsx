import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";

export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const BannerHome = () => {
  return (
    <Carousel autoplay>
      <div>
        <Img src="image/img/banner-01.png" />
      </div>
      <div>
        <Img src="image/img/banner-02.png" />
      </div>
    </Carousel>
  );
};

export default BannerHome;
