import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select } from 'antd';
// import { Table } from 'antd';
import { Table } from 'antd';
import { createEvent, createSubEvent, deleteEvent, getEvent } from '../../services/event';

const AddEvent = () => {

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
            title: 'เทศกาลหลัก',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Action',
            render: (_, record) => <Button danger onClick={() => onDeleteEvent(record.id)}>Delete</Button>,
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
        <Container>
            <div className="card border-none ">
                <div className="card-header font-36">เพิ่มเทศกาล</div>
                <div className="col-md-12 row">
                    <div className="col-md-8 ">
                        <CardBoxRadius>
                            <Table
                                columns={columns}
                                dataSource={maindata}
                            />
                        </CardBoxRadius>
                    </div>
                    <div className="col-md-4">
                        <CardBoxRadius>
                            <div className="font-24 mb-3">เพิ่มเทศกาลหลัก
                            </div>
                            <Form form={createEventForm} layout="vertical" onFinish={onCreateEventFinish}>
                                <Form.Item name="name" label="ชื่อเทศกาลหลัก*">
                                    <Input value={formDataEvent?.name} />
                                </Form.Item>
                                <div className="center">
                                    <Button type="primary" htmlType="submit">
                                        เพิ่ม
                                    </Button>
                                </div>
                            </Form>
                        </CardBoxRadius>
                        <CardBoxRadius>
                            <div className="font-24 mb-3">เพิ่มเทศกาลย่อย
                            </div>
                            <Form form={createSubEventForm} layout="vertical" onFinish={onFinish}>
                                <Form.Item name="name" label="ชื่อเทศกาลย่อย*">
                                    <Input value={formDataSubEvent?.name} />
                                </Form.Item>
                                <Form.Item name="parent_id" label="Select">
                                    <Select>
                                        {events?.map(e => {
                                            return <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <div className="center">
                                    <Button type="primary" htmlType="submit">
                                        เพิ่ม
                                    </Button>
                                </div>

                            </Form>
                        </CardBoxRadius>
                    </div>
                </div>

            </div>


        </Container>

    );
};


export const Container = styled.div`
  .font-36 {
    font-size: 36px;
}
  .border-none {
    border: none;
}
.font-24 {
    font-size: 24px;
}
.center {
    text-align: center;
}
`;

export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09); 
margin: 25px;
`;

export const CardBoxRadius = styled.div`
border-radius: 16px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09); 
margin-top: 25px;
padding: 20px;
`;

export default AddEvent;