import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout, Divider, Radio, Table, Row, Col, Button, Space } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { getUser } from '../../services/user';
import { deleteProduts, getProducts } from '../../services/product';

const onDeleteProduct = async (id) => {
    await deleteProduts(id);
    handleGetProducts();
};

const columns = [
    {
        title: 'รหัสสินค้า',
        dataIndex: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'รูป',
        dataIndex: 'picture',
    },
    {
        title: 'ชื่อสินค้า',
        dataIndex: 'name',
    },
    {
        title: 'ราคา',
        dataIndex: 'price',
    },
    {
        title: 'ประเภทสินค้า',
        dataIndex: 'typeProduct',
    },
    {
        title: 'Action',
        render: (_, record) => (
            <Space size="middle">
                <Button >Edit</Button>
                <Button danger onClick={() => onDeleteProduct(record.id)}>Delete</Button>
            </Space>),
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const ListStocks = () => {

    const [selectionType] = useState('checkbox');
    const [products, setProducts] = useState([]);

    const handleGetProducts = async () => {
        const res = await getProducts()

        const data = products[
            {
                key: products?.id,
                picture: products?.picture,
                name: products?.name,
                price: products?.price,
                typeProduct: products?.typeProduct,
            }
        ];

        setProducts(res?.data)
        console.log(typeof res?.data);
    }

    useEffect(() => {
        handleGetProducts()
    }, [])

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',

                }}
            >
                <Header style={{ background: '#fff', }}>
                    <div className="font-24">รายการสินค้า</div>
                </Header >
                <Content style={{ margin: '24px 24px 0', }}>
                    <div style={{ background: '#F5F5F5', }}>

                        <Col>
                            <Table
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }}
                                columns={columns}
                                dataSource={products}
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

export default ListStocks