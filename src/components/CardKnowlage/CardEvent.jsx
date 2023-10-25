import React from "react";
import Card from "react-bootstrap/Card";

const CardEvent = () => {
  return (
    <Card
    // style={{ width: "18rem" }}
    >
      <Card.Img src="image/img/cardTrend-01.png" />
      <a style={{ float: "right" }} href="/detailCardEvent">
        ดูเพิ่มเติม
      </a>
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
