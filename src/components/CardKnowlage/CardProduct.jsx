import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const CardProduct = () => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img src="image/img/product-01.png" />}
    >
      <Meta title="ซาลาเปา 6 ลูก" description="฿139" />
    </Card>
  );
};

export default CardProduct;
