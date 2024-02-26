import React from "react";
import { BASE_URL } from "../../constands/api";
import { Link } from "react-router-dom";
import { Button, Image, Typography } from "antd";
const { Text } = Typography;

const centered = {
  position: "absolute",
  top: "97%",
  left: "38%",
  transform: "translate(-50%, -50%)",
  marginTop: "-30px",
  color: "#FFEE53",
  fontSize: "24px",
  textShadow: "1px 2px 5px #000",
  fontFamily: "'Athiti', sans-serif",
  fontWeight: "500",
  width: "200px",
  display: "flex",
  justifyContent: "center",
};

const CardEvent = (prop) => {
  const { datacard } = prop

  return (
    <>
      <Link to={`/detailCardEvent?id=${datacard?.id}`} style={{ textDecoration: "none", boxShadow: "0 0 2px rgba(0,0,0,.15)" }}>
        <Image preview={false} src={`${BASE_URL}/${datacard?.thumbnail}`} style={{ width: "100%", borderRadius: "10px", }} />
        <Text style={centered} >{datacard?.name}</Text>

      </Link>
      {/* <Link to={"/setChengMeng"} > */}

      {/* </Link> */}
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
