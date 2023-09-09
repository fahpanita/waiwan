import React from "react";
import styled from "styled-components";
import AuthenticatedProvider from "../../Providers/AuthenticatedProvider";
import LineLogin from "./LineLogin";
import { Image } from 'antd';
import Link from "../../components/Link";

const Home = () => {
    return (
        <AuthenticatedProvider>
            <Container>
                <div className="abc">123</div>
                <Img src="image/icons/line_2k.svg" />
                <Link to="/stock">Blogs</Link>
                <Imgrounder
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <LineLogin />
            </Container>
        </AuthenticatedProvider>
    );
};

export const Container = styled.div`
    max-width: 870px;
    margin: 0 auto;
    .abc {
        font-size: 50px;
    }
`;

export const Img = styled.img`
    width: 20px;
`;

export const Imgrounder = styled(Image)`
    border-radius: 100px;

    &.ant-image .ant-image-mask {

    color: aqua !important;
}
  
`;


export default Home;
