import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { BASE_URL } from '../../constands/api';
import { deleteCartEvents, getCartEvents } from '../../services/cartEvents';

const onDeleteCartEvents = async (id) => {
    await deleteCartEvents(id);
    handleGetCartEvents();
};

const columns = [
    {
        title: 'รหัสเทศกาล',
        dataIndex: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'รูป',
        dataIndex: 'thumbnail',
        render: (text) => <Image src={`${BASE_URL}/${text}`} width={70} />,
    },
    {
        title: 'ชื่อเทศกาล',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        render: (_, record) => (
            <Space size="middle">
                <Button >Edit</Button>
                <Button danger onClick={() => onDeleteCartEvents(record.id)}>Delete</Button>
            </Space>),
    },
];

const ListEvent = () => {
    const [cardEvents, setCartEvents] = useState([]);

    const handleGetCartEvents = async () => {
        const res = await getCartEvents()

        const data = cardEvents[
            {
                key: cardEvents?.id,
                thumbnail: cardEvents?.thumbnail,
                name: cardEvents?.name,
            }
        ];

        setCartEvents(res?.data)
    }

    useEffect(() => {
        handleGetCartEvents()
    }, [])

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',

                }}
            >
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">บทความเทศกาล</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <div style={{ background: '#F5F5F5', }}>

                        <Col>
                            <Table
                                rowSelection={{
                                    type: "checkbox",

                                }}
                                columns={columns}
                                dataSource={cardEvents}
                            />
                        </Col>
                    </div>
                </Content>
            </Layout >
        </>
    )
}

export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
/* padding: 10px; */
`;

const FooterCustom = styled(Footer)`
background: #F5F5F5;
box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.20);
bottom: 0;
position: fixed;
width: -webkit-fill-available;
`;

export const CardBoxRadius = styled.div`
border-radius: 13px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
padding: 16px;
`;

export default ListEvent