import React from "react";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../constands/api";
import { Link } from "react-router-dom";
import { Button } from "antd";

const CardEvent = (prop) => {
  const { datacard } = prop
  return (
    <Card
    >
      <Card.Img src={`${BASE_URL}/${datacard?.thumbnail}`} />
      <Link to={`/detailCardEvent?id=${datacard?.id}`}>
        <Button>ดูเพิ่มเติม</Button>
      </Link>
      {/* <a style={{ float: "right" }} href="/detailCardEvent">
        ดูเพิ่มเติม
      </a> */}
    </Card>
  );
};

export default CardEvent;
