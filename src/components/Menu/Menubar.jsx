import React, { useState } from 'react';
import { AppstoreOutlined, ShoppingCartOutlined, ShoppingOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
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
        getItem(<Link to="/listStock" style={{ textDecoration: 'none' }}>รายการสินค้า</Link>, 'product'),
        getItem(<Link to="/addProduct" style={{ textDecoration: 'none' }}>เพิ่มสินค้า</Link>, 'addItem'),
        getItem(<Link to="/addCatagory" style={{ textDecoration: 'none' }}>หมวดหมู่สินค้า</Link>, 'addCatagory', undefined),
        getItem(<Link to="/addEvent" style={{ textDecoration: 'none' }}>หมวดหมู่เทศกาล</Link>, 'addEvent', undefined),
    ]),
    getItem('บทความเทศกาล', 'sub2', <CalendarOutlined />, [
        getItem(<Link to="/listEvents" style={{ textDecoration: 'none' }}>บทความเทศกาล</Link>, 'listEvents'),
        getItem(<Link to="/addInfoEvent" style={{ textDecoration: 'none' }}>เพิ่มบทความเทศกาล</Link>, 'addInfoEvent'),
    ]),
    getItem(<Link to="/infoUsers" style={{ textDecoration: 'none' }}>ลูกค้า</Link>, 'infoUsers', <TeamOutlined />),
];

const Menubar = () => {
    return (
        <Layout>
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
            // style={{ position: 'fixed' }}
            />
        </Layout >

    )
}

export default Menubar