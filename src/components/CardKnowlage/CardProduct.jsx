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
        >
          <Card.Img variant="top" src={`${BASE_URL}/${data?.thumbnail}`}></Card.Img>
          <Card.Body>
            <Card.Text style={{ fontSize: "20px", fontWeight: "400" }}>{data?.name}</Card.Text>
            <Card.Text style={{ color: "#C54142", fontSize: "30px", fontWeight: "500" }}>฿{data?.price}</Card.Text>
            {/* <Link to={`/detailProduct?id=${data?.id}`}>
              <Button>ดูเพิ่มเติม</Button>
            </Link> */}
          </Card.Body>
        </Card >
      </Link>

    </>
  );
};

export default CardProduct;
