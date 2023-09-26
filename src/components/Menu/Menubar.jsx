import React, { useState } from 'react';
import { AppstoreOutlined, ShoppingCartOutlined, ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>, 'Dashboard', <AppstoreOutlined />),
    getItem('การขาย', 'seller', <ShoppingCartOutlined />),
    getItem('สินค้า', 'sub1', <ShoppingOutlined />, [
        getItem('รายการสินค้า', 'product'),
        getItem(<Link to="/addProduct" style={{ textDecoration: 'none' }}>เพิ่มสินค้า</Link>, 'addItem'),
        getItem(<Link to="/addCatagory" style={{ textDecoration: 'none' }}>หมวดหมู่สินค้า</Link>, 'addCatagory', undefined),
        getItem(<Link to="/addEvent" style={{ textDecoration: 'none' }}>หมวดหมู่เทศกาล</Link>, 'addEvent', undefined),
    ]),
    getItem('ลูกค้า', '9', <TeamOutlined />),
];

const Menubar = () => {
    return (
        <Layout>
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ position: 'fixed' }}
            />
        </Layout >

    )
}

export default Menubar