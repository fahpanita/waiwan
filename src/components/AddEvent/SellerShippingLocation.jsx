import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image, Input, Select } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { getShippingLocation } from '../../services/backend';


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
        title: 'ที่อยู่การจัดส่ง',
        dataIndex: 'address',
    },
    {
        title: 'ขนส่ง',
        dataIndex: 'transport',
    },
    {
        title: 'Tracking Number',
        dataIndex: 'tracking_number',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const SellerShippingLocation = () => {

    const [shippingLocation, setShippingLocation] = useState([]);

    const handleGetShippingLocation = async () => {
        const res = await getShippingLocation()

        // console.log(res);

        setShippingLocation(res?.data?.map(u => {
            return {
                key: u?.order_id,
                id: u?.order_id,
                name: u?.address_names || "-",
                address: `${u?.streets || "-"}, ${u?.districts || "-"}, ${u?.subdistricts || "-"}, ${u?.provinces || "-"}, ${u?.zip_codes || "-"}`,
                transport:
                    <>
                        <Select
                            defaultValue="ไปรษณีย์ไทย"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'ไปรษณีย์ไทย',
                                    label: 'ไปรษณีย์ไทย',
                                },
                                {
                                    value: 'SCG Express',
                                    label: 'SCG Express',
                                },
                                {
                                    value: 'NIM Express',
                                    label: 'NIM Express',
                                },
                            ]}
                        />
                    </>,
                tracking_number:
                    <>
                        <Input placeholder="กรอก Tracking Nnumber" />
                    </>,
                action:
                    <>
                        <Button type="primary" >
                            ยืนยันการจัดส่ง
                        </Button>
                    </>
                ,
            }
        }))

        // console.log(typeof res?.data);
    }

    useEffect(() => {
        handleGetShippingLocation()
    }, [])

    return (
        <>
            <Layout style={{ minHeight: '100vh', }}>
                <Content>
                    <CardBox >
                        <div style={{ background: '#F5F5F5', }}>
                            <Col>
                                <Table
                                    rowSelection={{
                                        type: "checkbox",

                                    }}
                                    columns={columns}
                                    dataSource={shippingLocation}
                                />
                            </Col>
                        </div>
                    </CardBox>
                </Content>
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

export default SellerShippingLocation