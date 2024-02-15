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
        <Img src="image/img/Banner-3.png" />
      </div>
      {/* <div>
        <Img src="image/img/Banner-4.png" />
      </div> */}
      <div>
        <Img src="image/img/Banner-1.png" />
      </div>
    </Carousel>
  );
};

export default BannerHome;
