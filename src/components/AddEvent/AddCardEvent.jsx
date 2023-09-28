import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Filter from '../Tree/Filter';
import TextArea from 'antd/es/input/TextArea';
import { Footer, Header, Content } from 'antd/es/layout/layout';


const handleChangeType = (value) => {
    console.log(`selected ${value}`);
}

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const AddCardEvent = () => {

    const [createProductForm] = Form.useForm();
    const formDataProduct = Form.useWatch([], createProductForm);

    const [products, setProduct] = useState([]);

    const handleGetProduct = async () => {
        const res = await getCatagory()
        setCatagory(res?.data)
        console.log(typeof res?.data);
    }
    const onCreateProductFinish = async (value) => {
        console.log(value);
        await createProduts(value);
        handleGetProduct();
        createProductForm.setFieldValue("name", "")
    };

    const [value, setValue] = useState('');

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChangeImg = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, }}>
                Upload
            </div>
        </div>
    );

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Form form={createProductForm} layout="vertical" onFinish={onCreateProductFinish}>
                    <Header style={{ background: '#fff', }}>
                        <div className="font-24">เพิ่มการ์ดเทศกาล</div>
                    </Header >
                    <Content style={{ margin: '24px 24px 0', }}>
                        <div style={{ background: '#F5F5F5', }}>
                            <Row>
                                <Col span={16}>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ข้อมูลทั่วไปของเทศกาล</div>
                                        <Form.Item name="name" label="ชื่อเทศกาล" >
                                            <Input value='' />
                                        </Form.Item>

                                        <Form.Item name="history" label="ประวัติคร่าว ๆ" >
                                            <Input value='' />
                                        </Form.Item>

                                        <Form.Item name="symbol" label="สัญลักษณ์ของเทศกาล" >
                                            <Input value='' />
                                        </Form.Item>

                                        <Form.Item name="arrangement" label="การจัดโต๊ะไหว้" >
                                            <Input value='' />
                                        </Form.Item>

                                        <Form.Item name="step" label="พิธีไหว้*" >
                                            <Input value='' />
                                        </Form.Item>
                                    </CardBoxRadius>
                                </Col>

                                <Col span={8}>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ภาพปกเทศกาล</div>
                                        <Form.Item name="picture" >
                                            <Upload
                                                name="picture"
                                                value=''
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChangeImg}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    </CardBoxRadius>

                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ภาพสัญลักษณ์เทศกาล</div>
                                        <Form.Item name="picture" >
                                            <Upload
                                                name="picture"
                                                value=''
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChangeImg}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    </CardBoxRadius>

                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ภาพการจัดโต๊ะ</div>
                                        <Form.Item name="picture" >
                                            <Upload
                                                name="picture"
                                                value=''
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChangeImg}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    </CardBoxRadius>
                                </Col>
                            </Row>
                        </div>
                    </Content>

                    <FooterCustom>
                        <Col align={'right'}>
                            <Button danger type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                บันทึก
                            </Button>
                            <Button type="primary" danger ghost>
                                ยกเลิก
                            </Button>
                        </Col>
                    </FooterCustom>
                </Form>
            </Layout>
        </>
    )
}
export const CardBox = styled.div`
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
/* padding: 10px; */
`;

const FooterCustom = styled(Footer)`
background: #F5F5F5;
box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.20);
bottom: 0;
position: fixed;
width: -webkit-fill-available;
`;

export const CardBoxRadius = styled.div`
border-radius: 13px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
margin: 10px;
padding: 16px;
`;

export default AddCardEvent