import React from "react";
import { UserOutlined, ContainerOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

const MenuAccount = () => {
  const { profile } = useAuth();
  // console.log(profile);

  return (
    <>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[""]}>
        <Menu.Item key={1} icon={<ContainerOutlined />}>
          <Link to="/stocklist" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
            ประวัติการสั่งซื้อ
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<UserOutlined />}>
          <Link to="/stock" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
            บัญชีผู้ใช้
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {profile?.role === "admin" && (
          <Menu.Item icon={<ShopOutlined />}>
            <Link to="/dashboard" style={{ textDecoration: "none", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
              เข้าหลังบ้าน
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default MenuAccount;
