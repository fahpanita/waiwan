import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const BannerHome = () => {
  return (
    <Carousel autoplay>
      <Link to={"/detailProduct?id=6"}>
        <div>
          <Img src="image/img/Banner-3.png" />
        </div>
      </Link>

      {/* <div>
        <Img src="image/img/Banner-4.png" />
      </div> */}
      {/* <Link to={"/detailProduct?id=9"}> */}
      <div>
        <Img src="image/img/Banner-1.png" />
      </div>
      {/* </Link> */}

    </Carousel>
  );
};

export default BannerHome;
