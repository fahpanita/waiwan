import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Divider, Radio, Table, Row, Col } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { getAllUser, getUser } from '../../services/user';

const columns = [
    {
        title: 'ชื่อลูกค้า',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'ที่อยู่',
        dataIndex: 'address',
    },
    {
        title: 'อีเมล',
        dataIndex: 'email',
    },
    {
        title: 'เบอร์โทรศัพท์',
        dataIndex: 'tel',
    },
    {
        title: 'ยอดการสั่งซื้อ',
        dataIndex: 'amount',
    },
];

const InfoUser = () => {

    const [users, setUser] = useState([]);

    const handleGetUser = async () => {
        const res = await getAllUser()

        setUser(res?.data?.map(u => {
            return {
                key: u?.id,
                name: u?.name,
                address: u?.address || "-",
                email: u?.email,
                tel: u?.tel || "-",
                amount: u?.amount || "-",
            }
        }))
        console.log(res);
        console.log(typeof res?.data);
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',

                }}
            >
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">รายชื่อลูกค้า</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <div style={{ background: '#F5F5F5', }}>

                        <Col>
                            <Table
                                rowSelection={{
                                    type: "checkbox",

                                }}
                                columns={columns}
                                dataSource={users}
                            />
                        </Col>

                        {/* <Radio.Group
                                onChange={({ target: { value } }) => {
                                    setSelectionType(value);
                                }}
                                value={selectionType}
                            >
                                <Radio value="checkbox">Checkbox</Radio>
                                <Radio value="radio">radio</Radio>
                        </Radio.Group>
                        <Divider /> */}
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

export default InfoUser