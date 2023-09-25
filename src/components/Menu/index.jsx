import React from 'react'
import { AppstoreOutlined, ShoppingCartOutlined, ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styled from 'styled-components';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const Imglogo = styled.img`
  width: 150px;
  margin-left: 50px;
  padding: 20px 0;
`;

const items = [
    // getItem(<Imglogo src="image/img/logowaiwan.png" />),
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('การขาย', 'seller', <ShoppingCartOutlined />),
    getItem('สินค้า', 'sub1', <ShoppingOutlined />, [
        getItem('รายการสินค้า', 'product'),
        getItem('เพิ่มสินค้า', 'addItem'),
        getItem('เพิ่มหมวดหมู่', 'addCatagory'),
        getItem('เพิ่มเทศกาล', 'addEvent'),
    ]),
    getItem('ลูกค้า', 'customer', <TeamOutlined />),

];
const MenuBar = () => {
    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <>
            <Imglogo src="image/img/logowaiwan.png" />
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['dashboard']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </>

    );
};

export default MenuBar;