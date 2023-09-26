import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space } from 'antd';
import { createCatagory, createSubCatagory, deleteCatagory, getCatagory } from '../../services/catagory';
import { theme, Col, Row } from 'antd';

const { Header, Content } = Layout;

// function getItem(label, key, icon, children) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }

const AddCatagories = () => {

    const [createCatagoryForm] = Form.useForm();
    const [createSubCatagoryForm] = Form.useForm();
    const formDataCatagory = Form.useWatch([], createCatagoryForm);
    const formDataSubCatagory = Form.useWatch([], createSubCatagoryForm);

    const [catagories, setCatagory] = useState([]);

    const handleGetCatagory = async () => {
        const res = await getCatagory()
        setCatagory(res?.data)
        console.log(typeof res?.data);
    }
    const onCreateCatagoryFinish = async (value) => {
        console.log(value);
        await createCatagory(value);
        handleGetCatagory();
        createCatagoryForm.setFieldValue("name", "")
    };

    const onFinish = async (value) => {
        console.log(value);
        await createSubCatagory(value);
        handleGetCatagory();
        createSubCatagoryForm.setFieldValue("name", "")
    };

    const onDeleteCatagory = async (id) => {
        await deleteCatagory(id);
        handleGetCatagory();
    };

    const columns = [
        {
            title: 'ชื่อหมวดหมู่สินค้า',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => onDeleteCatagory(record.id)}>Delete</Button>

                </Space>),
        },
    ];

    const maindata = catagories?.map(d => {
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
        handleGetCatagory()
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
                    <div className="font-24">หมวดหมู่สินค้า</div>
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
                                    <div className="font-24 mb-3">เพิ่มหมวดหมู่สินค้าหลัก
                                    </div>
                                    <Form form={createCatagoryForm} layout="vertical" onFinish={onCreateCatagoryFinish}>
                                        <Form.Item name="name" label="ชื่อหมวดหมู่สินค้าหลัก*" >
                                            <Input value={formDataCatagory?.name} />
                                        </Form.Item>
                                        <div className="center">
                                            <Button type="primary" htmlType="submit" style={{ background: '#C54142' }}>
                                                เพิ่ม
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBoxRadius>
                                <CardBoxRadius>
                                    <div className="font-24 mb-3">เพิ่มหมวดหมู่สินค้าย่อย
                                    </div>
                                    <Form form={createSubCatagoryForm} layout="vertical" onFinish={onFinish}>
                                        <Form.Item name="name" label="ชื่อหมวดหมู่สินค้าย่อย*">
                                            <Input value={formDataSubCatagory?.name} />
                                        </Form.Item>
                                        <Form.Item name="parent_id" label="อยู่ในหมวดหมู่สินค้าหลัก*" >
                                            <Select>
                                                {catagories?.map(e => {
                                                    return <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <div className="center">
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

export default AddCatagories