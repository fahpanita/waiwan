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
        <Img src="image/img/banner-1.png" />
      </div>
      <div>
        <Img src="image/img/banner-2.png" />
      </div>
    </Carousel>
  );
};

export default BannerHome;
