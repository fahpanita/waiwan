import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Table, Col, Button, Space, Image, Input, Select, Form, Card, Avatar, Row, Divider } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { getHistoryUser } from '../../services/backend';
import { useAuth } from '../../Providers/AuthProvider';
import { BASE_URL } from "../../constands/api";

const HistoryUser = () => {

    const [historyUser, setHistoryUser] = useState([]);
    const { profile } = useAuth();

    const handleGetHistoryUser = async () => {
        if (profile) {
            const { user_id } = profile;
            const res = await getHistoryUser(user_id);
            setHistoryUser(res?.data);
        }
    }

    console.log(historyUser);

    useEffect(() => {
        handleGetHistoryUser();
    }, [profile]);


    return (
        <>
            <Layout style={{ minHeight: '100vh', backgroundColor: "white" }}>
                <Content style={{ marginTop: "20px", backgroundColor: "white" }}>
                    <Row>
                        <Col style={{ width: "100%" }}>
                            {historyUser?.map(d => (
                                <Card key={d?.order_id}>
                                    <div >
                                        <a>หมายเลขคำสั่งซื้อ : {d?.order_id}</a>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Image preview={false} width={100} src={`${BASE_URL}/${d?.thumbnail}`} style={{ border: "1px solid #d3d3d3", marginTop: "10px" }} />
                                            <div style={{ marginLeft: "20px" }}>
                                                <h3>{d?.product_names}</h3>
                                                <a>จำนวน {d?.amounts} ชิ้น</a>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: "20px", marginTop: "0px" }}>
                                            <a>฿ {d?.order_item_prices} </a>
                                        </div>
                                    </div>

                                    <Divider style={{ margin: "10px 0" }} />

                                </Card>
                            ))}


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

export default HistoryUser