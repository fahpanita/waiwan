import liff from "@line/liff";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import { useAuth } from "../../Providers/AuthProvider";

const LineLogin = () => {
  const [profile, setProfile] = useState();
  const { error, isLoggedIn, isReady } = useLiff();
  const { onLogin, onLogout } = useAuth();

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
      return <Button onClick={onLogin}>Login</Button>;
    }
    return (
      <>
        <Button onClick={onLogout}>Logout</Button>
      </>
    );
  };

  return <div>{showDisplayName()}</div>;
};

export default LineLogin;
