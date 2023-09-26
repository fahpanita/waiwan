import React from "react";
import { Card, Button } from "antd";

const CardEvent = () => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img src="image/img/cardTrend-01.png" />}
    >
      <Button type="link">More</Button>
    </Card>
  );
};

export default CardEvent;
