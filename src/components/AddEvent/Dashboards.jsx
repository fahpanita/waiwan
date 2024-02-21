import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image, Card, Row, Statistic } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getDataDashboard } from '../../services/backend';
import { Line } from '@ant-design/charts';
const Dashboards = () => {

    const [dataDashboard, setDataDashboard] = useState([]);
    // console.log(dataDashboard);

    const handleGetDashboards = async () => {
        const res = await getDataDashboard()
        setDataDashboard(res?.data)
    }

    useEffect(() => {
        handleGetDashboards()
    }, [])

    const data = [
        { month: 'JAN', price: 3 },
        { month: 'FEB', price: 4 },
        { month: 'MAR', price: 3.5 },
        { month: 'APR', price: 5 },
        { month: 'MAY', price: 4.9 },
        { month: 'JUN', price: 6 },
        { month: 'JUL', price: 7 },
        { month: 'AUG', price: 9 },
        { month: 'SEP', price: 13 },
        { month: 'OCT', price: 10 },
        { month: 'NOV', price: 4 },
        { month: 'DEC', price: 6 },
    ];

    const props = {
        data,
        xField: 'month',
        yField: 'price',
    };


    return (
        <>
            <Layout style={{ minHeight: '100vh', }}>
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">รายงานการขาย</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Card bordered={false}>
                                <Statistic
                                    title="รายได้ทั้งหมด"
                                    value={dataDashboard?.totalPrice}
                                    precision={2}
                                    valueStyle={{
                                        color: '#C54142',
                                    }}
                                    prefix="฿"
                                />
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card bordered={false}>
                                <Statistic
                                    title="จำนวนออเดอร์(ชำระเสร็จสิ้น)"
                                    value={dataDashboard?.numberOfPayments}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="ครั้ง"
                                />
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card bordered={false}>
                                <Statistic
                                    title="ยอดเข้าชม"
                                    value={dataDashboard?.totalUsers}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    suffix="คน"
                                />
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card bordered={false}>
                                <Statistic
                                    title="ลูกค้าทั้งหมดที่สั่งซื้อ"
                                    value={dataDashboard?.totalUniqueUsers}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    suffix="คน"
                                />
                            </Card>
                        </Col>
                        <CardBox bordered={false}>
                            <Line {...props} />
                        </CardBox>

                    </Row>
                </Content>
            </Layout >
        </>
    )
}

export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
border-radius: 10px;
padding: 20px;
margin-bottom: 20px;
width: 500px;
height: 400px;
margin: 20px 12px ;
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

export default Dashboards