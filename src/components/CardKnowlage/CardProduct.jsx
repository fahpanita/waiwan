import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardProduct = () => {
  return (
    <Card
    // style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src="image/img/product-01.png"></Card.Img>
      <Card.Body>
        <Card.Title>ซาลาเปา6ลูก</Card.Title>
        <Card.Text>฿{139}</Card.Text>
        <Link to="/detailProduct">
          <Button>ดูเพิ่มเติม</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
