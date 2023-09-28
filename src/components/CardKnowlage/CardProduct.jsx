import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduct = () => {
  return (
    <Card
    // style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src="image/img/product-01.png" />
      <Card.Body>
        <Card.Title>ซาลาเปา6ลูก</Card.Title>
        <Card.Text>฿139</Card.Text>
        {/* <Button variant="primary">ซื้อสินค้า</Button> */}
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
