import React from "react";
import { UserOutlined, ContainerOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

const MenuAccount = () => {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key={1} icon={<UserOutlined />}>
          <Link to="/stock" style={{ textDecoration: "none" }}>
            บัญชีของฉัน
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<ContainerOutlined />}>
          <Link to="/stocklist" style={{ textDecoration: "none" }}>
            รายการที่ต้องชำระ
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {profile?.role === "admin" && (
          <Menu.Item>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              เข้าหลังบ้าน
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default MenuAccount;
