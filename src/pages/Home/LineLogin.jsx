import liff from "@line/liff";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";

const LineLogin = () => {
    const [profile, setProfile] = useState();
    const { error, isLoggedIn, isReady } = useLiff();

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
            return <Button onClick={liff.login}>Login</Button>;
        }
        return (
            <>
                <p>
                    Welcome to the react-liff demo app, {console.log(profile)}!
                </p>
                <Button onClick={liff.logout}>Logout</Button>
            </>
        );
    };

    return <div>{showDisplayName()}</div>;
};

export default LineLogin;
