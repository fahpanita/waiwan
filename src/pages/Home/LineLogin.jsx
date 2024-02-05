import liff from "@line/liff";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import { useAuth } from "../../Providers/AuthProvider";
import Link from "../../components/Link";
import { UserOutlined, ContainerOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Divider, theme } from "antd";
import { BsLine } from "react-icons/bs";
const { useToken } = theme;
const items = [
  {
    key: "1",
    label: (
      <Link to="/stocklist" icon={<ContainerOutlined />} style={{ fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }} >
        รายการที่ต้องชำระ
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/stock" icon={<UserOutlined />} style={{ fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }} >
        บัญชีผู้ใช้
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
    if (error) return <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>Something is wrong.</p>;
    if (!isReady) return <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>Loading...</p>;

    if (!isLoggedIn) {
      return (
        <Button type="primary" onClick={onLogin} style={{ backgroundColor: "#00b900", fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
          <BsLine />  Login Line
        </Button>
      );
    }
    return (
      <>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          // autoAdjustOverflow={true}
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
                <Button type="primary" onClick={onLogout} style={{ color: "#fff", backgroundColor: "rgb(68 68 68)", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
                  Logout
                </Button>
              </Space>
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#000", fontFamily: "Chakra Petch, sans- serif", fontSize: "16px" }}>
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
