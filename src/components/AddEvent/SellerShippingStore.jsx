import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image, Input, Modal, Form } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { getConfirmShippingStore, getShippingStore, getallSeller } from '../../services/backend';


const columns = [
    {
        title: 'หมายเลขคำสั่งซื้อ',
        dataIndex: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'ชื่อผู้สั่ง',
        dataIndex: 'name',
    },
    {
        title: 'รายละเอียดคำสั่งซื้อ',
        dataIndex: 'detail',
    },
    {
        title: 'วันที่รับสินค้า',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const SellerShippingStore = () => {

    const [shippingStore, setShippingStore] = useState([]);
    const [allSeller, setallSeller] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [createShippingForm] = Form.useForm();
    const formDataShipping = Form.useWatch([], createShippingForm);

    const handleLineNoti = async (line_id, order_id) => {
        try {
            const values = await createShippingForm.validateFields();
            const res = await getConfirmShippingStore({ line_id, order_id, ...values });
            // handle response
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    const handleGetShippingStore = async () => {
        const res = await getShippingStore()

        setShippingStore(res?.data?.map(u => {
            return {
                key: u?.order_id,
                id: u?.order_id,
                name: u?.address_names || "-",
                address: <></>,
                detail:
                    <>
                        <Button type="primary" onClick={() => showModal(u?.order_id)}>
                            ดูรายละเอียด
                        </Button>
                    </>,
                date:
                    <>
                        <Form.Item name="receive_day" rules={[{ required: true, message: "กรุณากรอกวันที่รับสินค้า" }]}>
                            <Input placeholder="กรอกวันที่รับสินค้า" value={formDataShipping?.receive_day} />
                        </Form.Item>

                    </>,
                action:
                    <>
                        <Button type="primary" onClick={() => handleLineNoti(u?.line_id, u?.order_id)}>
                            ยืนยันการรับสินค้า
                        </Button>
                    </>
                ,
            }
        }))
    }

    const showModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGetallSeller = async () => {
        const res = await getallSeller();
        setallSeller(res?.data);
    }

    useEffect(() => {
        handleGetShippingStore(),
            handleGetallSeller()
    }, [])

    const filteredOrder = allSeller?.find(order => order?.order_id === selectedOrderId);

    return (
        <>
            <Layout style={{ minHeight: '100vh', }}>
                <Content>
                    <CardBox >
                        <div style={{ background: '#F5F5F5', }}>
                            <Col>
                                <Form form={createShippingForm}>
                                    <Table
                                        rowSelection={{
                                            type: "checkbox",

                                        }}
                                        columns={columns}
                                        dataSource={shippingStore}
                                    />
                                </Form>

                            </Col>
                        </div>
                    </CardBox>
                </Content>
                <Modal title="รายละเอียดคำสั่งซื้อ	" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="ตกลง">
                    {filteredOrder && (
                        <div key={filteredOrder?.order_id}>
                            <p>หมายเลขสั่งซื้อ: {filteredOrder?.order_id}</p>
                            <p>ชื่อลูกค้า: {filteredOrder?.address_names}</p>
                            <p>เบอร์โทร: {filteredOrder?.phones}</p>
                            {filteredOrder?.product_names && filteredOrder?.amounts && (
                                <>
                                    <p>รายละเอียดสินค้าที่สั่งซื้อ:</p>
                                    <ul>
                                        {filteredOrder.product_names.split(',').map((product, index) => (
                                            <li key={index}>{product} {filteredOrder.amounts.split(',')[index]} ชิ้น</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <p>ราคารวม: {Number(filteredOrder?.payment_prices).toLocaleString()} บาท</p>

                        </div>
                    )}
                </Modal>
            </Layout >
        </>
    )
}

export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
padding: 20px;
margin-bottom: 20px;
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

export default SellerShippingStore