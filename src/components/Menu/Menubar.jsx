import React, { useState } from 'react';
import { AppstoreOutlined, ShoppingCartOutlined, ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';

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
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('การขาย', 'seller', <ShoppingCartOutlined />),
    getItem('สินค้า', 'sub1', <ShoppingOutlined />, [
        getItem('รายการสินค้า', 'product'),
        getItem('เพิ่มสินค้าสินค้า', 'addItem'),
        getItem('หมวดหมู่สินค้า', 'addCatagory'),
        getItem('หมวดหมู่เทศกาล', 'addEvent'),
    ]),
    getItem('ลูกค้า', '9', <TeamOutlined />),
];

const Menubar = () => {
    return (
        <Layout>
            <Menu
                mode="inline"
                defaultSelectedKeys={['4']}
                items={items}
            />
        </Layout >
        // <Layout
        //     style={{
        //         minHeight: '100vh',
        //         background: '#F5F5F5',
        //     }}
        // >
        //     <Sider style={{
        //         background: '#fff',
        //         // boxShadow: '2px 4px 15px 0px rgba(0, 0, 0, 0.09)',
        //     }}
        //     // collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        //     >
        //         <Menu style={{
        //             background: '#fff',
        //         }}
        //             defaultSelectedKeys={['1']} mode="inline" items={items}
        //         />
        //     </Sider>
        // </Layout>
    )
}

export default Menubar