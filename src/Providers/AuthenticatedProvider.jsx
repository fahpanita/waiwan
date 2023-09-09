import React, { useEffect } from "react";
import { useLiff } from "react-liff";

const AuthenticatedProvider = ({ children }) => {
    const { isLoggedIn } = useLiff();
    useEffect(() => {
        if (!isLoggedIn && location.pathname !== "/")
            location.replace(route("home"));
    }, []);
    return <>{children}</>;
};

export default AuthenticatedProvider;
