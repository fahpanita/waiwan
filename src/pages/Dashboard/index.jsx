import React, { useEffect } from "react";
import { Container } from "../Home";
import { Image } from "antd";
import MenuBar from "../../components/Menu";
import AddEvent from "../../components/AddEvent";

const Dashboard = () => {
  return (
    <>
      <div className="col-md-12 row">
        <div className="col-md-2">
          <MenuBar></MenuBar>
        </div>
        <div className="col-md-10">
          <AddEvent></AddEvent>
        </div>
      </div>


    </>
  );
};

export default Dashboard;
