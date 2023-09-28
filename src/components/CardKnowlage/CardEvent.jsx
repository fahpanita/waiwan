import React from "react";
// import { Card, Button } from "antd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ArrowRightOutlined } from "@ant-design/icons";

const CardEvent = () => {
  return (
    <Card
    // style={{ width: "18rem" }}
    >
      <Card.Img src="image/img/cardTrend-01.png" />
    </Card>
    // <Card
    //   hoverable
    //   // style={{
    //   //   width: 240,
    //   // }}
    //   cover={<img src="image/img/cardTrend-01.png" />}
    // >
    //   <Button type="link">More</Button>
    // </Card>
  );
};

export default CardEvent;
