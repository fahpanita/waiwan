import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constands/api";

const CardProduct = (prop) => {
  const { data } = prop
  return (
    <Card
    // style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <Card.Text>฿{data?.price}</Card.Text>
        <Link to={`/detailProduct?id=${data?.id}`}>
          <Button>ดูเพิ่มเติม</Button>
        </Link>
      </Card.Body>
    </Card >
  );
};

export default CardProduct;
