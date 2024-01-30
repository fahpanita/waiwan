import React, { useState } from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Card, Image, Breadcrumb } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import ImageDropZone from "../../components/game/ImageDropZone";
import styled from 'styled-components';

const { Title } = Typography;
const { Content } = Layout;

const SetChengMeng = () => {

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event) => {
    event.dataTransfer.setData('text', event.target.id);
  };

  const drop = (event, targetKey) => {
    event.preventDefault();

    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    const draggedElementTargetKey = draggedElement.getAttribute('targetKey');

    // Implement your custom check function here
    const canDrop = checkIfCanDrop(targetKey, draggedElementTargetKey);

    if (canDrop) {
      // Matched targetKey, trigger corresponding handler
      switch (targetKey) {
        case 'teaBox':
          handleTeaDrop();
          break;
        case 'alcoholBox':
          handleAlcoholDrop();
          break;
        case 'pigBox':
          handlePigDrop();
          break;
        case 'fishBox':
          handleFishDrop();
          break;
        case 'chickenBox':
          handleChickenBoxDrop();
          break;
        case 'fruitBox':
          handleFruitDrop();
          break;
        case 'paperBox':
          handlePaperDrop();
          break;
        case 'sweetBox':
          handleSweetDrop();
          break;
        // Add more cases for other targetKeys if needed
        default:
          break;
      }

      // Append the dragged element to the target
      event.target.appendChild(draggedElement);
    } else {
      // Cannot drop, reset dragged element's position
      draggedElement.style.transition = 'transform 0.5s';
      draggedElement.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        draggedElement.style.transition = ''; // Reset transition after animation
      }, 500);
    }
  };

  const checkIfCanDrop = (targetKey, draggedElementTargetKey) => {
    return targetKey === draggedElementTargetKey;
  };

  const [draggableVisibility, setDraggableVisibility] = useState("block");

  const handleTeaDrop = () => {
    alert("You put the tea in the box!");
  };
  const handleAlcoholDrop = () => {
    alert("You put the alcohol in the box!");
  };
  const handlePigDrop = () => {
    alert("You put the pig in the box!");
  };
  const handleFishDrop = () => {
    alert("You put the fish in the box!");
  };
  const handleChickenBoxDrop = () => {
    alert("You put the chicken in the box!");
  };
  const handleFruitDrop = () => {
    alert("You put the fruit in the box!");
  };
  const handlePaperDrop = () => {
    alert("You put the paper in the box!");
  };
  const handleSweetDrop = () => {
    alert("You put the sweet in the box!");
  };

  const backgroundImagePath = "/image/img/table01.png";

  return (
    <>
      <Layout
        style={{
          backgroundImage: `url("/image/img/table01.png")`,
          backgroundSize: "888px",
          backgroundPosition: "center 260px ",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <Content style={{ padding: "0 32px", }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item>ทดลองจัดวางของไหว้เจ้า</Breadcrumb.Item>
            <Breadcrumb.Item>ชุดไหว้เจ้า</Breadcrumb.Item>
          </Breadcrumb>

          <Title style={{ fontFamily: "'Athiti', sans-serif", fontSize: "28px", fontWeight: "500", textAlign: "center" }}>
            ชุดไหว้เจ้า
          </Title>

          <div className="container" style={{ fontFamily: "'Chakra Petch', sans-serif", marginTop: "20px", fontSize: "16px" }}>
            <DropZone>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <DropBox onDrop={(event) => drop(event, 'teaBox')} onDragOver={allowDrop} style={{ marginRight: "150px" }}>
                  <a>น้ำชา 5 ที่</a>
                </DropBox>
                <DropBox onDrop={(event) => drop(event, 'alcoholBox')} onDragOver={allowDrop}>
                  <a>เหล้า 5 ที่</a>
                </DropBox>
              </div>
            </DropZone>

            <DropZone>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <DropBox2 onDrop={(event) => drop(event, 'pigBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                  <a>หัวหมู</a>
                </DropBox2>
              </div>
            </DropZone>

            <DropZone>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <DropBox3 onDrop={(event) => drop(event, 'fruitBox')} onDragOver={allowDrop} style={{ marginRight: "30px" }}>
                  <a>ผลไม้</a>
                </DropBox3>
                <DropBox4 onDrop={(event) => drop(event, 'fishBox')} onDragOver={allowDrop} style={{ marginRight: "85px" }}>
                  <a>ปลา</a>
                </DropBox4>
                <DropBox4 onDrop={(event) => drop(event, 'chickenBox')} onDragOver={allowDrop} style={{ marginRight: "30px" }}>
                  <a>ไก่</a>
                </DropBox4>
                <DropBox3 onDrop={(event) => drop(event, 'sweetBox')} onDragOver={allowDrop} >
                  <a>ขนม</a>
                </DropBox3>
              </div>
            </DropZone>

            <DropZone>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <DropBox5 onDrop={(event) => drop(event, 'paperBox')} onDragOver={allowDrop} >
                  <a style={{ textAlign: "center" }}>กระดาษเงิน/ทอง</a>
                </DropBox5>
              </div>
            </DropZone>

            <BoxStyle>
              <ImageContainer onDrop={drop} onDragOver={allowDrop}>
                <img
                  id="sweet"
                  targetKey="sweetBox"
                  src="https://i.ibb.co/Svz1zYH/sweet.png"
                  draggable="true"
                  onDragStart={drag}
                  style={{ display: draggableVisibility }}
                  width="100"
                />
                <img
                  id="fish"
                  targetKey="fishBox"
                  src="https://i.ibb.co/vYyDxHV/fish.png"
                  draggable="true"
                  onDragStart={drag}
                  style={{ display: draggableVisibility }}
                  width="100"
                />
                <img
                  id="pig"
                  targetKey="pigBox"
                  src="https://i.ibb.co/Hnw4bLW/pig.png"
                  draggable="true"
                  onDragStart={drag}
                  width="100"
                />
                <img
                  id="fruit"
                  targetKey="fruitBox"
                  src="https://i.ibb.co/XxDGmBW/fruit.png"
                  draggable="true"
                  onDragStart={drag}
                  width="100"
                />
                <img
                  id="tea-grop"
                  targetKey="teaBox"
                  src="image/img/tea-grop.png"
                  draggable="true"
                  onDragStart={drag}
                  width="150"
                />
                <img
                  id="alcohol-grop"
                  targetKey="alcoholBox"
                  src="image/img/alcohol-grop.png"
                  draggable="true"
                  onDragStart={drag}
                  width="150"
                  style={{ height: "fit-content" }}
                />
                <img
                  id="chicken"
                  targetKey="chickenBox"
                  src="https://i.ibb.co/q1z62Lx/chicken.png"
                  draggable="true"
                  onDragStart={drag}
                  width="100"
                />
                <img
                  id="paper"
                  targetKey="paperBox"
                  src="https://i.ibb.co/716dNsQ/paper-god.png"
                  draggable="true"
                  onDragStart={drag}
                  width="100"
                />
              </ImageContainer>
            </BoxStyle>
          </div >
        </Content>
        <FooterPage />
      </Layout >
    </>
  );
};

export default SetChengMeng;

export const DropZone = styled.div`
      display: flex;
    justify-content: center;
`;

export const DropBox = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 45px;
    border-radius: 50%;
    border: 2px dashed #1D1D1F;
    padding: 1rem;
    margin-top: 210px;
`;

export const DropBox2 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 85px;
height: 85px;
    border-radius: 50%;
    border: 2px dashed #1D1D1F;
    padding: 1rem;
    margin-top: -30px;
`;
export const DropBox3 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px dashed #1D1D1F;
    padding: 1rem;
`;

export const DropBox4 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 2px dashed #1D1D1F;
    padding: 1rem;
`;

export const DropBox5 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px dashed #1D1D1F;
    padding: 1rem;
    margin-top: -30px;
`;


export const BoxStyle = styled.div`
width: 100%;
height: 103px;
flex-shrink: 0;
border-radius: 15px;
background: #F2F0E6;
box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.06);
margin-top: 100px;
align-items: center;
margin-bottom: 70px; 
`;

export const ImageContainer = styled.div`
  display: flex;
  /* overflow-x: auto;  */
  width: 100%;
  height: 100%;
  padding: 10px; /* Adjust as needed */
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
`;

export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;