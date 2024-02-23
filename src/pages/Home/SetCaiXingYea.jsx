import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import { Layout, Row, Col, Typography, Button, Card, Image, Breadcrumb, Modal, notification, message } from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import ImageDropZone from "../../components/game/ImageDropZone";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { DownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";



const { Title, Text } = Typography;
const { Content } = Layout;

const SetCaiXingYea = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const location = useLocation();
  const [droppedItems, setDroppedItems] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/image/img/game-success01.png';

    link.download = 'game-success01.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event) => {
    event.dataTransfer.setData('text', event.target.id);
  };

  const [successfulDropsCount, setSuccessfulDropsCount] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);



  const drop = (event, targetKey) => {
    event.preventDefault();

    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    const draggedElementTargetKey = draggedElement.getAttribute('targetKey');

    const canDrop = checkIfCanDrop(targetKey, draggedElementTargetKey);

    if (canDrop) {
      setDroppedItems((prevItems) => [...prevItems, { id: data, targetKey }]);
      event.target.appendChild(draggedElement);

      setSuccessfulDropsCount((prevCount) => prevCount + 1);

      if (successfulDropsCount + 1 === 8) {
        setIsSuccessModalOpen(true);
      } else {
        const errorSound = new Audio('/sound/Effect-coorect.mp3');
        errorSound.play();
        message.success(<Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>เก่งมาก! คุณวางได้ถูกต้อง</Text>);
      }
    } else {

      draggedElement.style.transition = 'transform 0.5s';
      draggedElement.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        draggedElement.style.transition = '';
      }, 500);

      handleErrorDrop();
    }

  };

  const checkIfCanDrop = (targetKey, draggedElementTargetKey) => {
    return targetKey === draggedElementTargetKey;
  };

  const handleErrorDrop = () => {
    const errorSound = new Audio('/sound/SoundEffect-error.mp3');
    errorSound.play();
    message.error(<Text style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}>กรุณาวางใหม่อีกครั้ง</Text>);
  };

  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };


  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const modalParam = params.get('modal');
    if (modalParam === 'true') {
      setIsModalOpen(true);
    }

  }, [location.search]);


  return (
    <>
      <Layout
        // /image/img/table01.png
        style={{
          backgroundImage: `url("https://i.postimg.cc/qMxWWyN2/table-02.png")`,
          backgroundSize: "888px",
          backgroundPosition: "center 230px ",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <Content style={{ padding: "0 32px", }}>

          <Breadcrumb style={{ margin: '16px 0', fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>
            <Breadcrumb.Item><Link to={'/experiment'} style={{ textDecoration: "none" }}>ทดลองจัดวางของไหว้เจ้า</Link></Breadcrumb.Item>
            <Breadcrumb.Item>ชุดไหว้เจ้าวันไฉ่ซิงเอี๊ย</Breadcrumb.Item>
          </Breadcrumb>

          <Title style={{ fontFamily: "'Athiti', sans-serif", fontSize: "28px", fontWeight: "500", textAlign: "center" }}>
            ชุดไหว้เจ้าวันไฉ่ซิงเอี๊ย
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
                  width="100"
                />
                <img
                  id="fish"
                  targetKey="fishBox"
                  src="https://i.ibb.co/vYyDxHV/fish.png"
                  draggable="true"
                  onDragStart={drag}
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
                  src="/image/img/tea-grop.png"
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
          <Modal
            title="วิธีการเล่นชุดไหว้เจ้าวันไฉ่ซิงเอี๊ย"
            style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}
            visible={isModalOpen}
            width={600}
            footer={[
              <Button onClick={handleOk} style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", color: "#ffffff", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px", width: "-webkit-fill-available" }}>
                เริ่มเกม
              </Button>,
            ]}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col>
                <img
                  src="https://s13.gifyu.com/images/SCYke.gif"
                  width="100%"
                />
              </Col>
              <Col style={{ display: "flex", alignContent: "center", flexDirection: "column", marginTop: "15px" }}>
                <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>หากคุณต้องการภาพชุดไหว้เจ้าวันไฉ่ซิงเอี๊ยชุดนี้ที่จัดสำเร็จแล้วโหลดได้ที่ปุ่มด้านล่าง ถ้าไม่ต้องการสามารถกดปุ่มเริ่มเกมได้เลย</p>
                <Button onClick={handleDownload} icon={<DownloadOutlined />} shape="round"
                  style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", background: '#ffffff', borderColor: '#bf9f64', color: "#bf9f64", borderRadius: "60px" }}>
                  โหลดรูปภาพการจัดไหว้สำเร็จ
                </Button>

              </Col>
            </Row>
          </Modal>

          <Modal
            title="คุณจัดวางสำเร็จ !"
            style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}
            visible={isSuccessModalOpen}
            // onOk={handleSuccessModalOk}
            // onCancel={handleSuccessModalOk}
            width={600}
            footer={[
              <Button href="/" shape="round"
                style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", background: '#ffffff', borderColor: '#bf9f64', color: "#bf9f64", borderRadius: "60px" }}>
                กลับหน้าหลัก
              </Button>,
              <Button href="/detailProduct?id=8" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", fontWeight: "500", color: "#ffffff", background: '#bf9f64', borderColor: '#bf9f64', borderRadius: "60px" }}>
                ไปยังหน้าสินค้า
              </Button>
            ]}
          >
            <Row style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Col style={{ marginTop: "20px" }}>
                <img
                  src="https://i.ibb.co/TPsWqHw/corect.png"
                  width="100px"
                />
              </Col>
              <Col style={{ marginTop: "20px" }}>
                <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px", }}>หากต้องการซื้อสินค้าชุดไหว้เจ้าวันไฉ่ซิงเอี๊ยชุดนี้กดปุ่มด้านล่างนี้</p>
              </Col>
            </Row>
          </Modal>
        </Content >
        <FooterPage />
      </Layout >
    </>
  );
};

export default SetCaiXingYea;

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
border: 2px dashed #5b5b5b;
box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.06);
margin-top: 150px;
align-items: center;
margin-bottom: 70px; 
position: sticky;
  bottom: 20px;
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