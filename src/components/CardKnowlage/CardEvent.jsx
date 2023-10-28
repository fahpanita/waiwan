import React from "react";
import { BASE_URL } from "../../constands/api";
import { Link } from "react-router-dom";
import { Button, Image, Row } from "antd";
import styled from "styled-components";


const CardEvent = (prop) => {
  const { datacard } = prop

  return (
    <>
      <Image preview={false} width={295} height={350} src={`${BASE_URL}/${datacard?.thumbnail}`} style={{ borderRadius: "10px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)" }} />
      <Link to={`/detailCardEvent?id=${datacard?.id}`} style={{ marginTop: "-30px", textDecoration: "none", color: "#FFEE53", fontSize: "36px", textShadow: "1px 2px 5px #000", }}>
        {datacard?.name}
      </Link>

      {/* <Row hoverable style={{ textAlign: "center" }}>
        <Card.Img preview={false} width={295} height={350} src={`${BASE_URL}/${datacard?.thumbnail}`} style={{ borderRadius: "10px" }} />
        <Link to={`/detailCardEvent?id=${datacard?.id}`} style={{ marginTop: "-30px", textDecoration: "none", color: "#FFEE53", fontSize: "36px", textShadow: "1px 2px 5px #000", }}>
          {datacard?.name}
        </Link>
      </Row> */}
    </>
  );
};

// const Container = styled.div`
//   background-color: white;
//   width: 315px;
//   height: 280px;
//   border-radius: 14px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
//   margin-left: 20px;
//   margin-top: 120px;
// `;

export default CardEvent;
