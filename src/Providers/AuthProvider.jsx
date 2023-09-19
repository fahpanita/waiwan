import liff from "@line/liff";
import React, { useEffect } from "react";
import { useLiff } from "react-liff";

const initialState = {
  token: undefined,
  onLogin: () => null,
  onLogout: () => null,
  idToken: undefined,
  profile: undefined,
};

const AuthContext = React.createContext(initialState);
export const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [idToken, setIdToken] = React.useState(null);
  const { error, isLoggedIn, isReady } = useLiff();
  // const navigate = useNavigate();
  const [profile, setProfile] = React.useState(null);

  const handleLogin = async () => {
    if (!isLoggedIn) {
      await liff.login();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const token = await liff.getAccessToken();
      const idToken = await liff.getIDToken();
      const profile = await liff.getProfile();
      setToken(token);
      setIdToken(idToken);
      setProfile(profile);
    })();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setToken(null);
    setIdToken(null);
    liff.logout();
    window.location.replace("/");
  };

  const value = {
    token,
    idToken,
    profile,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
