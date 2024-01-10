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

    const drop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(data));
    };

    return (
        <div className="container">
            <DropZone>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <DropBox onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Tea</a>
                    </DropBox>
                    <DropBox onDrop={drop} onDragOver={allowDrop}>
                        <a>Tea</a>
                    </DropBox>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox2 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Rice</a>
                    </DropBox2>
                    <DropBox2 onDrop={drop} onDragOver={allowDrop}>
                        <a>Rice</a>
                    </DropBox2>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox3 onDrop={drop} onDragOver={allowDrop} >
                        <a>chopsticks</a>
                    </DropBox3>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Dish</a>
                    </DropBox4>
                    <DropBox4 onDrop={drop} onDragOver={allowDrop}>
                        <a>Dish</a>
                    </DropBox4>
                </div>
            </DropZone>

            <DropZone>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                    <DropBox5 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Fruit</a>
                    </DropBox5>
                    <DropBox5 onDrop={drop} onDragOver={allowDrop} style={{ marginRight: "10px" }}>
                        <a>Paper</a>
                    </DropBox5>
                    <DropBox5 onDrop={drop} onDragOver={allowDrop}>
                        <a>Fruit</a>
                    </DropBox5>
                </div>
            </DropZone>

            <BoxStyle>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} onDrop={drop} onDragOver={allowDrop}>

                    <img
                        id="dish1"
                        src="image/img/dish1.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish10"
                        src="image/img/dish10.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />
                    <img
                        id="dish12"
                        src="image/img/dish12.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish13"
                        src="image/img/dish13.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish4"
                        src="image/img/dish4.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish11"
                        src="image/img/dish11.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish8"
                        src="image/img/dish8.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish5"
                        src="image/img/dish5.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish3"
                        src="image/img/dish3.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish7"
                        src="image/img/dish7.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish2"
                        src="image/img/dish2.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish14"
                        src="image/img/dish14.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish9"
                        src="image/img/dish9.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                    <img
                        id="dish6"
                        src="image/img/dish6.png"
                        draggable="true"
                        onDragStart={drag}
                        width="100"
                    />

                </div>
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

