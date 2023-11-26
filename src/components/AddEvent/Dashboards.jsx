import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image, Card, Row, Statistic } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
const Dashboards = () => {

    return (
        <>
            <Layout style={{ minHeight: '100vh', }}>
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">Dashboard</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Card bordered={false}>
                                <Statistic
                                    title="รายได้ทั้งหมด"
                                    value={2950}
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
                                    title="จำนวนออเดอร์"
                                    value={5}
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
                                    value="11"
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
                                    value={5}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    suffix="คน"
                                />
                            </Card>
                        </Col>
                    </Row>
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

export default Dashboards