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
                        id="cat"
                        src="https://www.veterinarypracticenews.com/wp-content/uploads/2019/10/bigstock-Four-Kittens-On-A-White-Backgr-2730282.jpg"
                        draggable="true"
                        onDragStart={drag}
                        width="150"
                    />

                    <img
                        id="dog"
                        src="https://www.wallpaperflare.com/static/800/62/574/puppies-white-background-paws-yellow-wallpaper-preview.jpg"
                        draggable="true"
                        onDragStart={drag}
                        width="150"
                    />
                    <img
                        id="mouse"
                        src="https://www.dherb.co.th/wp-content/uploads/2019/10/blog-5-1-600x405.jpg"
                        draggable="true"
                        onDragStart={drag}
                        width="150"
                    />

                    <img
                        id="fish"
                        src="https://cdn.mos.cms.futurecdn.net/uhLVL2jTdtQ7ScXCeoeAU6-650-80.jpg.webp"
                        draggable="true"
                        onDragStart={drag}
                        width="150"
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

