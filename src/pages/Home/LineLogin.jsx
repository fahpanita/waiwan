import liff from "@line/liff";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import { useAuth } from "../../Providers/AuthProvider";
import Link from "../../components/Link";
import { UserOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Divider, theme } from "antd";
const { useToken } = theme;
const items = [
  {
    key: "1",
    label: (
      <Link to="/stock" icon={<UserOutlined />}>
        จัดการบัญชีผู้ใช้
      </Link>
    ),
  },
];

const LineLogin = () => {
  const [profile, setProfile] = useState();
  const { error, isLoggedIn, isReady } = useLiff();
  const { onLogin, onLogout } = useAuth();

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const profile = await liff.getAccessToken();
      setProfile(profile);
    })();
  }, [liff, isLoggedIn]);

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!isReady) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return (
        <Button type="primary" onClick={onLogin}>
          Login
        </Button>
      );
    }
    return (
      <>
        <Dropdown
          menu={{
            items,
          }}
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              {React.cloneElement(menu, {
                style: menuStyle,
              })}
              <Divider
                style={{
                  margin: 0,
                }}
              />
              <Space
                style={{
                  padding: 8,
                }}
              >
                <Button type="primary" onClick={onLogout}>
                  Logout
                </Button>
              </Space>
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              บัญชี
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </>
    );
  };

  return <div>{showDisplayName()}</div>;
};

export default LineLogin;
