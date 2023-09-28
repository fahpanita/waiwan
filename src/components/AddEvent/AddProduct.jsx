import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Filter from '../Tree/Filter';
import TextArea from 'antd/es/input/TextArea';
import { Footer } from 'antd/es/layout/layout';
import { getCatagory } from '../../services/catagory';
import { createProduts } from '../../services/product';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
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

const AddProduct = () => {


    const [createProductForm] = Form.useForm();
    const formDataProduct = Form.useWatch([], createProductForm);

    const navigate = useNavigate();

    const [products, setProduct] = useState([]);

    const [catagories, setCatagory] = useState([]);

    const handleGetCatagory = async () => {
        const res = await getCatagory()

        const data = res?.data?.map(c => {
            return {
                title: c.name,
                value: c.id,
                key: c.id,
                children: c.sub.map(s => {
                    return {
                        title: s.name,
                        value: s.id,
                        key: s.id,
                    }
                }),
            }
        })

        setCatagory(data)
        console.log(res?.data);
    }

    const handleGetProduct = async () => {
        const res = await getCatagory()
        setCatagory(res?.data)
        console.log(typeof res?.data);
    }
    const onCreateProductFinish = async (value) => {
        console.log(value);
        await createProduts(value);
        navigate("/dashboard")
        // createProductForm.setFieldValue("name", "")
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

    useEffect(() => {
        handleGetCatagory()
    }, []);

    return (
        <>
            <Layout>
                <Form form={createProductForm} layout="vertical" onFinish={onCreateProductFinish}>
                    <Header style={{ background: '#fff', }}>
                        <div className="font-24">เพิ่มสินค้า</div>
                    </Header >
                    <Content style={{ margin: '24px 24px 0', }}>
                        <div style={{ background: '#F5F5F5', }}>
                            <Row>
                                <Col span={16}>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ข้อมูลทั่วไปของสินค้า</div>
                                        <Form.Item name="name" label="ชื่อสินค้า*" >
                                            <Input value={formDataProduct?.name} />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ราคาสินค้า</div>

                                        <Form.Item name="price" label="ราคาขาย*" >
                                            <Input value={formDataProduct?.price} prefix="฿" suffix="บาท" />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ภาพสินค้า</div>
                                        <Form.Item name="picture" >
                                            <Upload
                                                name="picture"
                                                value={formDataProduct?.picture}
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
                                    <CardBoxRadius style={{ marginBottom: '150px' }}>
                                        <div className="font-24 mb-3">รายละเอียด</div>
                                        <Form.Item name="detailProduct" label="รายละเอียดสินค้า*" >
                                            <TextArea value={formDataProduct?.detailProduct} placeholder="โปรดรายละเอียดสินค้า" autoSize={{
                                                minRows: 5,
                                                maxRows: 6,
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="detailShipping" label="รายละเอียดการจัดส่ง*" >
                                            <TextArea value={formDataProduct?.detailShipping} placeholder="โปรดรายละเอียดการจัดส่ง" autoSize={{
                                                minRows: 5,
                                                maxRows: 6,
                                            }} />

                                        </Form.Item>
                                        <Form.Item name="condition" label="เงื่อนไขอื่น ๆ" >
                                            <TextArea value={formDataProduct?.condition} placeholder="โปรดกรอกเงื่อนไขอื่น ๆ" autoSize={{
                                                minRows: 5,
                                                maxRows: 6,
                                            }} />

                                        </Form.Item>
                                    </CardBoxRadius>
                                </Col>
                                <Col span={8}>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">เลือกหมวดหมู่สินค้า*</div>
                                        <Form.Item name="filterCat">
                                            <Filter filterData={catagories} />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">เลือกหมวดหมู่เทศกาล*
                                        </div>
                                        <Filter />
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ประเภทสินค้า*
                                        </div>
                                        <Form.Item name="typeProduct" layout="vertical" >
                                            <Select
                                                defaultValue="readySend"
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleChangeType}
                                                options={[
                                                    {
                                                        value: 'preorder',
                                                        label: 'สินค้าPreorder',
                                                    },
                                                    {
                                                        value: 'readySend',
                                                        label: 'สินค้าพร้อมส่ง',
                                                    },
                                                ]}
                                            />
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
            </Layout >
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

export default AddProduct