import { Button, Flex } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
// import './styles.css';



const ImageDropZone = () => {
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
                case 'riceBox':
                    handleRiceDrop();
                    break;
                case 'chopsticksBox':
                    handleChopsticksDrop();
                    break;
                case 'dishBox':
                    handleDishDrop();
                    break;
                case 'fruitBox':
                    handleFruitDrop();
                    break;
                case 'paperBox':
                    handlePaperDrop();
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
    const handleRiceDrop = () => {
        alert("You put the rice in the box!");
    };
    const handleChopsticksDrop = () => {
        alert("You put the chopsticks in the box!");
    };
    const handleDishDrop = () => {
        alert("You put the dish in the box!");
    };
    const handleFruitDrop = () => {
        alert("You put the fruit in the box!");
    };
    const handlePaperDrop = () => {
        alert("You put the paper in the box!");
    };

    return (
        <div className="container">
            <DropZone>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <DropBox onDrop={(event) => drop(event, 'alcoholBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Alcohol</a>
                    </DropBox>
                    <DropBox onDrop={(event) => drop(event, 'teaBox')} onDragOver={allowDrop}>
                        <a>Tea</a>
                    </DropBox>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox2 onDrop={(event) => drop(event, 'riceBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Rice</a>
                    </DropBox2>
                    <DropBox2 onDrop={(event) => drop(event, 'riceBox')} onDragOver={allowDrop}>
                        <a>Rice</a>
                    </DropBox2>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox3 onDrop={(event) => drop(event, 'chopsticksBox')} onDragOver={allowDrop} >
                        <a>Chopsticks</a>
                    </DropBox3>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={(event) => drop(event, 'dishBox')} onDragOver={allowDrop} >
                        <a>Dish</a>
                    </DropBox4>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                    <DropBox5 onDrop={(event) => drop(event, 'fruitBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Fruit</a>
                    </DropBox5>
                    <DropBox5 onDrop={(event) => drop(event, 'paperBox')} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Paper</a>
                    </DropBox5>
                    <DropBox5 onDrop={(event) => drop(event, 'fruitBox')} onDragOver={allowDrop}>
                        <a>Fruit</a>
                    </DropBox5>
                </div>
            </DropZone>

            <BoxStyle>
                <ImageContainer onDrop={drop} onDragOver={allowDrop}>

                    <img
                        id="dish1"
                        targetKey="dishBox"
                        src="image/img/dish1.png"
                        draggable="true"
                        onDragStart={drag}
                        style={{ display: draggableVisibility }}
                        width="100"
                    />
                    <img
                        id="chopsticks"
                        targetKey="chopsticksBox"
                        src="image/img/chopsticks.png"
                        draggable="true"
                        onDragStart={drag}
                        style={{ display: draggableVisibility }}
                        width="100"
                    />
                    <img
                        id="rice"
                        targetKey="riceBox"
                        src="image/img/rice.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish4"
                        targetKey="dishBox"
                        src="image/img/dish4.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="tea"
                        targetKey="teaBox"
                        src="image/img/tea.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish5"
                        targetKey="dishBox"
                        src="image/img/dish5.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish3"
                        targetKey="dishBox"
                        src="image/img/dish3.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="fruit"
                        targetKey="fruitBox"
                        src="image/img/fruit.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish2"
                        targetKey="dishBox"
                        src="image/img/dish2.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="alcohol"
                        targetKey="alcoholBox"
                        src="image/img/alcohol.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="fruit2"
                        targetKey="fruitBox"
                        src="image/img/fruit.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish6"
                        targetKey="dishBox"
                        src="image/img/dish6.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="rice2"
                        targetKey="riceBox"
                        src="image/img/rice.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="paper"
                        targetKey="paperBox"
                        src="image/img/paper.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                </ImageContainer>
            </BoxStyle>
        </div >
    );
};

export default ImageDropZone;

export const DropZone = styled.div`
      display: flex;
    justify-content: center;
`;

export const DropBox = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 37px;
    width: 37px;
    border-radius: 50%;
    border: 1px solid #aaaaaa;
    padding: 1rem;
`;

export const DropBox2 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 56px;
    width: 56px;
    border-radius: 50%;
    border: 1px solid #aaaaaa;
    padding: 1rem;
`;
export const DropBox3 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 147px;
    height: 20px;
    border: 1px solid #aaaaaa;
    padding: 1rem;
`;

export const DropBox4 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px solid #aaaaaa;
    border-radius: 50%;
    padding: 1rem;
`;

export const DropBox5 = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 220px;
    border: 1px solid #aaaaaa;
    border-radius: 50%;
    padding: 1rem;
`;


export const BoxStyle = styled.div`
width: 100%;
height: 103px;
flex-shrink: 0;
border-radius: 15px;
background: #F2F0E6;
box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.06);
`;

export const ImageContainer = styled.div`
  display: flex;
  overflow-x: auto; /* or overflow-x: scroll; to show scrollbar always */
  width: 100%;
  height: 100%;
  padding: 10px; /* Adjust as needed */
  box-sizing: border-box;
`;