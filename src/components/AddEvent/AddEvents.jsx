import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space } from 'antd';
import { createEvent, createSubEvent, deleteEvent, getEvent } from '../../services/event';
import { theme, Col, Row } from 'antd';

const { Header, Content } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const AddEvents = () => {

    const [createEventForm] = Form.useForm();
    const [createSubEventForm] = Form.useForm();
    const formDataEvent = Form.useWatch([], createEventForm);
    const formDataSubEvent = Form.useWatch([], createSubEventForm);

    const [events, setEvents] = useState([]);

    const handleGetEvent = async () => {
        const res = await getEvent()
        // if (typeof res?.data === "object") {
        //     setEvents(res?.data)
        // }
        setEvents(res?.data)
        console.log(typeof res?.data);
    }
    const onCreateEventFinish = async (value) => {
        console.log(value);
        await createEvent(value);
        handleGetEvent();
        createEventForm.setFieldValue("name", "")
    };

    const onFinish = async (value) => {
        console.log(value);
        await createSubEvent(value);
        handleGetEvent();
        createSubEventForm.setFieldValue("name", "")
    };

    const onDeleteEvent = async (id) => {
        await deleteEvent(id);
        handleGetEvent();
    };

    const columns = [
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => onDeleteEvent(record.id)}>Delete</Button>

                </Space>),
        },
    ];

    const maindata = events?.map(d => {
        return {
            key: d.id,
            id: d.id,
            name: d.name,
            children: d.sub?.map(s => {
                return {
                    key: s.id + "sub",
                    id: s.id,
                    name: s.name,
                }
            })
        }
    });

    useEffect(() => {
        handleGetEvent()
    }, [])

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                    // background: '#F5F5F5',
                }}
            >
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">หมวดหมู่เทศกาล</div>
                </Header >
                <Content
                    style={{
                        margin: '24px 24px 0',
                    }}
                >
                    <div
                        style={{
                            // minHeight: '100vh',
                            background: '#F5F5F5',
                        }}
                    >
                        <Row>
                            <Col span={16}>
                                <CardBox>
                                    <Table
                                        columns={columns}
                                        dataSource={maindata}
                                    />
                                </CardBox>
                            </Col>

                            <Col span={8}>
                                <CardBoxRadius>
                                    <div className="font-24 mb-3">เพิ่มหมวดหมู่เทศกาลหลัก
                                    </div>
                                    <Form form={createEventForm} layout="vertical" onFinish={onCreateEventFinish}>
                                        <Form.Item name="name" label="ชื่อหมวดหมู่เทศกาลหลัก*" >
                                            <Input value={formDataEvent?.name} />
                                        </Form.Item>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button type="primary" htmlType="submit" style={{ background: '#C54142' }}>
                                                เพิ่ม
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBoxRadius>
                                <CardBoxRadius>
                                    <div className="font-24 mb-3">เพิ่มหมวดหมู่เทศกาลย่อย
                                    </div>
                                    <Form form={createSubEventForm} layout="vertical" onFinish={onFinish}>
                                        <Form.Item name="name" label="ชื่อหมวดหมู่เทศกาลย่อย*">
                                            <Input value={formDataSubEvent?.name} />
                                        </Form.Item>
                                        <Form.Item name="parent_id" label="อยู่ในหมวดหมู่เทศกาลหลัก*" >
                                            <Select>
                                                {events?.map(e => {
                                                    return <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button type="primary" htmlType="submit" style={{ background: '#C54142' }}>
                                                เพิ่ม
                                            </Button>
                                        </div>

                                    </Form>
                                </CardBoxRadius>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </>
    )
}

export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
/* padding: 10px; */
`;

export const CardBoxRadius = styled.div`
border-radius: 13px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
padding: 16px;
`;

export default AddEvents