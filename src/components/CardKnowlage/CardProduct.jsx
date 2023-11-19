import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constands/api";

const CardProduct = (prop) => {
  const { data } = prop
  return (
    <>
      <Link to={`/detailProduct?id=${data?.id}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
          style={{ border: "none" }}
        >
          <Card.Img variant="top" src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>
          <Card.Body>
            <Card.Text style={{ fontSize: "18px", fontWeight: "400", height: "40px" }}>{data?.name}</Card.Text>
            <Card.Text style={{ color: "#C54142", fontSize: "24px", fontWeight: "500" }}>฿ {data?.price}</Card.Text>
          </Card.Body>
        </Card >
      </Link>

    </>
  );
};

export default CardProduct;
