import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Card,
  Image,
  Breadcrumb,
  Modal,
  notification,
  message,
} from "antd";
import FooterPage from "../../components/Footer/FooterPage";
import ImageDropZone from "../../components/game/ImageDropZone";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { DownloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const SetChengMeng = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const location = useLocation();
  const [droppedItems, setDroppedItems] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/image/img/setChengMeng.png";

    link.download = "setChengMeng.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const [successfulDropsCount, setSuccessfulDropsCount] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const drop = (event, targetKey) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const draggedElementTargetKey = draggedElement.getAttribute("targetKey");

    const canDrop = checkIfCanDrop(targetKey, draggedElementTargetKey);

    if (canDrop) {
      setDroppedItems((prevItems) => [...prevItems, { id: data, targetKey }]);
      event.target.appendChild(draggedElement);

      setSuccessfulDropsCount((prevCount) => prevCount + 1);

      if (successfulDropsCount + 1 === 14) {
        setIsSuccessModalOpen(true);
      } else {
        const errorSound = new Audio("/sound/Effect-coorect.mp3");
        errorSound.play();
        message.success(
          <Text
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "18px",
            }}
          >
            เก่งมาก! คุณวางได้ถูกต้อง
          </Text>
        );
      }
    } else {
      draggedElement.style.transition = "transform 0.5s";
      draggedElement.style.transform = "translate(0, 0)";
      setTimeout(() => {
        draggedElement.style.transition = "";
      }, 500);

      handleErrorDrop();
    }
  };

  const checkIfCanDrop = (targetKey, draggedElementTargetKey) => {
    return targetKey === draggedElementTargetKey;
  };

  const handleErrorDrop = () => {
    const errorSound = new Audio("/sound/SoundEffect-error.mp3");
    errorSound.play();
    message.error(
      <Text
        style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px" }}
      >
        กรุณาวางใหม่อีกครั้ง
      </Text>
    );
  };

  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modalParam = params.get("modal");
    if (modalParam === "true") {
      setIsModalOpen(true);
    }
  }, [location.search]);

  return (
    <>
      <Layout>
        <Navbar />
        <Content style={{ padding: "0 32px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "16px",
            }}
          >
            <Breadcrumb.Item>
              <Link to={"/experiment"} style={{ textDecoration: "none" }}>
                ทดลองจัดวางของไหว้เจ้า
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>ชุดไหว้เจ้าวันเช็งเม้ง</Breadcrumb.Item>
          </Breadcrumb>

          <Title
            style={{
              fontFamily: "'Athiti', sans-serif",
              fontSize: "28px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            ชุดไหว้เจ้าวันเช็งเม้ง
          </Title>

          <div
            style={{
              backgroundImage: `url("https://i.ibb.co/QnqQ36H/1.png")`,
              backgroundSize: "810px",
              backgroundPosition: "center 25px ",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <div
              className="container"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                marginTop: "20px",
                fontSize: "16px",
                position: "relative",
                top: "-10px",
              }}
            >
              <DropZone>
                <div style={{ display: "flex" }}>
                  <DropBox
                    onDrop={(event) => drop(event, "teaBox")}
                    onDragOver={allowDrop}
                  >
                    <a>น้ำชา</a>
                  </DropBox>
                </div>
              </DropZone>
              <DropZone>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-14px",
                  }}
                >
                  <DropBox2
                    onDrop={(event) => drop(event, "fruitBox")}
                    onDragOver={allowDrop}
                  >
                    <a>ผลไม้</a>
                  </DropBox2>
                  <DropBox3
                    onDrop={(event) => drop(event, "alcoholBox")}
                    onDragOver={allowDrop}
                  >
                    <a>เหล้า</a>
                  </DropBox3>
                </div>
              </DropZone>

              <DropZone>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "-32px",
                    alignItems: "center",
                  }}
                >
                  <DropBox4
                    onDrop={(event) => drop(event, "riceBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a>ข้าว</a>
                  </DropBox4>
                  <DropBox4
                    onDrop={(event) => drop(event, "riceBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a>ข้าว</a>
                  </DropBox4>
                  <DropBox5
                    onDrop={(event) => drop(event, "paperBox")}
                    onDragOver={allowDrop}
                  >
                    <a style={{ textAlign: "center" }}>กระดาษเงิน/ทอง</a>
                  </DropBox5>
                </div>
              </DropZone>

              <DropZone>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "-3px",
                    marginBottom: "10px",
                  }}
                >
                  <DropBox6
                    onDrop={(event) => drop(event, "sweetBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "24px" }}
                  >
                    <a style={{ textAlign: "center" }}>ขนมหวาน</a>
                  </DropBox6>
                  <DropBox7
                    onDrop={(event) => drop(event, "dishBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>อาหารคาว</a>
                  </DropBox7>
                  <DropBox7
                    onDrop={(event) => drop(event, "dishBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>อาหารคาว</a>
                  </DropBox7>
                  <DropBox7
                    onDrop={(event) => drop(event, "dishBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>อาหารคาว</a>
                  </DropBox7>
                  <DropBox7
                    onDrop={(event) => drop(event, "dishBox")}
                    onDragOver={allowDrop}
                  >
                    <a style={{ textAlign: "center" }}>อาหารคาว</a>
                  </DropBox7>
                </div>
              </DropZone>

              <DropZone>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <DropBox8
                    onDrop={(event) => drop(event, "pigBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>หัวหมู</a>
                  </DropBox8>
                  <DropBox8
                    onDrop={(event) => drop(event, "fishBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>ปลา</a>
                  </DropBox8>
                  <DropBox8
                    onDrop={(event) => drop(event, "chickenBox")}
                    onDragOver={allowDrop}
                    style={{ marginRight: "10px" }}
                  >
                    <a style={{ textAlign: "center" }}>ไก่</a>
                  </DropBox8>
                </div>
              </DropZone>

              <BoxStyle>
                <div style={{ position: "absolute", top: "-30px" }}>
                  ของไหว้เจ้าวันเช็งเม้ง
                </div>
                <ImageContainer onDrop={drop} onDragOver={allowDrop}>
                  <img
                    id="dish1"
                    targetKey="dishBox"
                    src="/image/img/dish1.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="dish2"
                    targetKey="dishBox"
                    src="/image/img/dish2.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="sweet"
                    targetKey="sweetBox"
                    src="https://i.ibb.co/Svz1zYH/sweet.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="fish"
                    targetKey="fishBox"
                    src="https://i.ibb.co/vYyDxHV/fish.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="pig"
                    targetKey="pigBox"
                    src="https://i.ibb.co/Hnw4bLW/pig.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="rice1"
                    targetKey="riceBox"
                    src="/image/img/rice.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="dish3"
                    targetKey="dishBox"
                    src="/image/img/dish3.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="tea-grop"
                    targetKey="teaBox"
                    src="/image/img/tea-two.png"
                    draggable="true"
                    onDragStart={drag}
                    width="60"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="dish4"
                    targetKey="dishBox"
                    src="/image/img/dish4.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="fruit"
                    targetKey="fruitBox"
                    src="https://i.ibb.co/XxDGmBW/fruit.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="rice2"
                    targetKey="riceBox"
                    src="/image/img/rice.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="alcohol-grop"
                    targetKey="alcoholBox"
                    src="/image/img/alcohol-two.png"
                    draggable="true"
                    onDragStart={drag}
                    width="60"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="chicken"
                    targetKey="chickenBox"
                    src="https://i.ibb.co/q1z62Lx/chicken.png"
                    draggable="true"
                    onDragStart={drag}
                    width="100"
                    style={{ margin: "0 10px" }}
                  />
                  <img
                    id="paper"
                    targetKey="paperBox"
                    src="/image/img/paper-2.png"
                    draggable="true"
                    onDragStart={drag}
                    width="80"
                    style={{ margin: "0 10px" }}
                  />
                </ImageContainer>
              </BoxStyle>
            </div>
          </div>

          <Modal
            title="วิธีการเล่นชุดไหว้เจ้าวันเช็งเม้ง"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "16px",
            }}
            visible={isModalOpen}
            width={600}
            footer={[
              <Button
                onClick={handleOk}
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#bf9f64",
                  borderColor: "#bf9f64",
                  borderRadius: "60px",
                  width: "-webkit-fill-available",
                }}
              >
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
              <Col
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexDirection: "column",
                  marginTop: "15px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  *หากคุณกำลังเล่นในโทรศัพท์ให้หมุนหน้าจอเป็นแนวนอนแล้วกดปุ่มเริ่มเล่นเกมได้เลย!
                  {/* หากคุณต้องการภาพชุดไหว้เจ้าวันตรุษจีนชุดนี้ที่จัดสำเร็จแล้วโหลดได้ที่ปุ่มด้านล่าง
                  ถ้าไม่ต้องการสามารถกดปุ่มเริ่มเกมได้เลย */}
                </p>
                <Button
                  onClick={handleDownload}
                  icon={<DownloadOutlined />}
                  shape="round"
                  style={{
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontSize: "16px",
                    fontWeight: "500",
                    background: "#ffffff",
                    borderColor: "#bf9f64",
                    color: "#bf9f64",
                    borderRadius: "60px",
                  }}
                >
                  โหลดรูปภาพการจัดไหว้สำเร็จ
                </Button>
              </Col>
            </Row>
          </Modal>

          <Modal
            title="คุณจัดวางสำเร็จ !"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "16px",
            }}
            visible={isSuccessModalOpen}
            // onOk={handleSuccessModalOk}
            // onCancel={handleSuccessModalOk}
            width={600}
            footer={[
              <Button
                href="/"
                shape="round"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  background: "#ffffff",
                  borderColor: "#bf9f64",
                  color: "#bf9f64",
                  borderRadius: "60px",
                }}
              >
                กลับหน้าหลัก
              </Button>,
              <Button
                href="/detailProduct?id=1"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#bf9f64",
                  borderColor: "#bf9f64",
                  borderRadius: "60px",
                }}
              >
                ไปยังหน้าสินค้า
              </Button>,
            ]}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Col style={{ marginTop: "20px" }}>
                <img src="https://i.ibb.co/TPsWqHw/corect.png" width="100px" />
              </Col>
              <Col style={{ marginTop: "20px" }}>
                <p
                  style={{
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  หากต้องการซื้อสินค้าชุดไหว้เจ้าวันตรุษจีนชุดนี้กดปุ่มด้านล่างนี้
                </p>
              </Col>
            </Row>
          </Modal>
        </Content>
        <FooterPage />
      </Layout>
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
  width: 100px;
  height: 45px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
  margin-top: 230px;
`;

export const DropBox2 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
  margin-left: -150px;
  margin-right: 50px;
`;
export const DropBox3 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 45px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
`;

export const DropBox4 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
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
  border: 2px dashed #1d1d1f;
  padding: 1rem;
  margin-left: 74px;
  margin-right: -193px;
`;

export const DropBox6 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
  margin-left: -102px;
  margin-top: -45px;
`;

export const DropBox7 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
`;

export const DropBox8 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  border: 2px dashed #1d1d1f;
  padding: 1rem;
`;

export const BoxStyle = styled.div`
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #f2f0e6;
  border: 2px dashed #5b5b5b;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.06);
  margin-top: 190px;
  align-items: center;
  margin-bottom: 50px;
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
  overflow-x: scroll;
  justify-content: center;
`;

export const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;
