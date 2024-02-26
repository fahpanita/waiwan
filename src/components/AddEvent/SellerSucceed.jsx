import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { deleteProduts, getProducts } from '../../services/product';
import { BASE_URL } from '../../constands/api';
import { Link } from 'react-router-dom';

import { FileOutlined, CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Search from 'antd/es/input/Search';
import { getShippingComplete } from '../../services/backend';

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
        title: 'วันที่จัดส่ง-รับสินค้า',
        dataIndex: 'receiveDay',
    },
    {
        title: 'รูปแบบการจัดส่ง',
        dataIndex: 'typeShipping',
    },

];

const SellerSucceed = () => {

    const [sellerComplete, setSellerComplete] = useState([]);

    const handleGetSellerComplete = async () => {
        const res = await getShippingComplete()

        setSellerComplete(res?.data?.map(u => {
            return {
                key: u?.order_id,
                id: u?.order_id,
                name: u?.address_names,
                address: `${u?.streets || "-"}, ${u?.districts || "-"}, ${u?.subdistricts || "-"}, ${u?.provinces || "-"}, ${u?.zip_codes || "-"}`,
                receiveDay: u?.receive_day === "Null"
                    ? new Date(u?.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    : u?.receive_day,
                typeShipping: u?.type_shipping || "-",
            }
        }))
        // console.log(res);
        // console.log(typeof res?.data);
    }

    useEffect(() => {
        handleGetSellerComplete()
    }, [])

    return (
        <>
            <Layout style={{ minHeight: '100vh', }}>
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">รายการคำสั่งซื้อ</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <CardBox >
                        <Link to={"/seller"} style={{ marginRight: "10px" }}>
                            <Button
                                icon={<FileOutlined />}
                            >
                                ทั้งหมด
                            </Button>
                        </Link>
                        <Link to={"/sellercheck"} style={{ marginRight: "10px" }}>
                            <Button
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                </svg>}
                            >
                                รอตรวจสอบ
                            </Button>
                        </Link>
                        <Link to={"/sellershipping"} style={{ marginRight: "10px" }}>
                            <Button
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                </svg>}
                            >
                                รอจัดส่ง
                            </Button>
                        </Link>
                        <Link to={"/sellersucceed"} style={{ marginRight: "10px" }}>
                            <Button
                                icon={<CheckCircleOutlined />} style={{ color: "#C54142", border: "1px solid #C54142" }}
                            >
                                จัดส่งแล้ว
                            </Button>
                        </Link>
                    </CardBox>
                    <CardBox >
                        <div style={{ background: '#F5F5F5', }}>
                            <Col>
                                <Table
                                    rowSelection={{
                                        type: "checkbox",

                                    }}
                                    columns={columns}
                                    dataSource={sellerComplete}
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

export default SellerSucceed