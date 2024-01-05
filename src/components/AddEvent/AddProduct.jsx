import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Filter from '../Tree/Filter';
import TextArea from 'antd/es/input/TextArea';
import { Footer } from 'antd/es/layout/layout';
import { getCatagory } from '../../services/catagory';
import { createProduts } from '../../services/product';
import { useNavigate } from 'react-router-dom';
import { getEvent } from '../../services/event';
import { BASE_URL } from '../../constands/api';
import { uploadImages } from '../../services/upload';

const { Header, Content } = Layout;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = async (file) => {

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

    const [catagories, setCatagory] = useState([]);
    const [events, setEvent] = useState([]);

    const uploadImageFromAnd = async ({ file, onSuccess, onError }) => {
        try {
            const res = await uploadImages(file)
            onSuccess(res?.data?.path)
        } catch (error) {
            onError("Error")
        }

    }

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
    }

    const handleGetEvent = async () => {
        const res = await getEvent()

        const data = res?.data?.map(e => {
            return {
                title: e.name,
                value: e.id,
                key: e.id,
                children: e.sub.map(t => {
                    return {
                        title: t.name,
                        value: t.id,
                        key: t.id,
                    }
                }),
            }
        })

        setEvent(data)
        console.log(res?.data);
    }

    const onCreateProductFinish = async (value) => {
        const res = await createProduts(value);
        if (res) {
            navigate("/listStock")
        }

    };

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
        createProductForm.setFieldValue("thumbnail", info.file.response)
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, }}>
                Upload
            </div>
        </div>
    );

    const [fileList, setFileList] = useState([
    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        createProductForm.setFieldValue("gallery", newFileList?.map(f => f.response))
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        handleGetCatagory(),
            handleGetEvent()
    }, []);

    return (
        <>
            <Layout>
                <Form form={createProductForm} layout="vertical" onFinish={onCreateProductFinish} onValuesChange={e => console.log(e)}>
                    <Header style={{ background: '#fff', }}>
                        <div className="font-24">เพิ่มสินค้า</div>
                    </Header >
                    <Content style={{ margin: '24px 24px 0', }}>
                        <div style={{ background: '#F5F5F5', }}>
                            <Row>
                                <Col span={16}>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ข้อมูลทั่วไปของสินค้า</div>
                                        <Form.Item name="name" label="ชื่อสินค้า" rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}>
                                            <Input value={formDataProduct?.name} />
                                        </Form.Item>
                                        <Form.Item name="price" label="ราคาขาย" rules={[{ required: true, message: "กรุณากรอกราคา" }]}>
                                            <Input value={formDataProduct?.price} prefix="฿" suffix="บาท" />
                                        </Form.Item>
                                        <Form.Item name="stock" label="จำนวนสินค้า" rules={[{ required: true, message: "กรุณากรอกจำนวนสินค้า" }]}>
                                            <Input value={formDataProduct?.stock} suffix="ชิ้น" />
                                        </Form.Item>
                                    </CardBoxRadius>

                                    <CardBoxRadius>

                                        <div className="font-24 mb-3">ภาพปกสินค้า</div>
                                        <Form.Item name="thumbnail" rules={[{ required: true, message: "กรุณาใส่รูป" }]}>
                                            <ImgCrop rotationSlider cropperProps={{ restrictPosition: false }} aspect={1 / 1}>
                                                <Upload
                                                    name="thumbnail"
                                                    value={formDataProduct?.thumbnail}
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    customRequest={uploadImageFromAnd}
                                                    beforeUpload={beforeUpload}
                                                    onChange={handleChangeImg}
                                                    onPreview={onPreview}
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
                                            </ImgCrop>
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ภาพอื่น ๆ</div>
                                        <Form.Item name="gallery" >
                                            <ImgCrop rotationSlider cropperProps={{ restrictPosition: false }} aspect={1 / 1}>
                                                <Upload
                                                    name="gallery"
                                                    customRequest={uploadImageFromAnd}
                                                    beforeUpload={beforeUpload}
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={onChange}
                                                    onPreview={onPreview}
                                                >
                                                    {fileList.length < 5 && '+ Upload'}
                                                </Upload>
                                            </ImgCrop>
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius style={{ marginBottom: '150px' }}>
                                        <div className="font-24 mb-3">รายละเอียด</div>
                                        <Form.Item name="detailProduct" label="รายละเอียดสินค้า" rules={[{ required: true, message: "กรุณากรอกรายละเอียดสินค้า" }]}>
                                            <TextArea value={formDataProduct?.detailProduct} placeholder="โปรดรายละเอียดสินค้า" autoSize={{
                                                minRows: 5,
                                                maxRows: 6,
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="detailShipping" label="รายละเอียดการจัดส่ง" rules={[{ required: true, message: "กรุณากรอกรายละเอียดการจัดส่ง" }]}>
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
                                        <div className="font-24 mb-3">เลือกหมวดหมู่สินค้า</div>
                                        <Form.Item name="categories_id" rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่สินค้า" }]}>
                                            <Filter filterData={catagories} />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">เลือกหมวดหมู่เทศกาล
                                        </div>
                                        <Form.Item name="events_id" rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่เทศกาล" }]}>
                                            <Filter filterData={events} />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ประเภทสินค้า
                                        </div>
                                        <Form.Item name="typeProduct" layout="vertical" rules={[{ required: true, message: "กรุณาเลือกประเภทสินค้า" }]}>
                                            <Select
                                                defaultValue="พร้อมส่ง"
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={[
                                                    {
                                                        value: 'พรีออเดอร์',
                                                        label: 'สินค้าพรีออเดอร์',
                                                    },
                                                    {
                                                        value: 'พร้อมส่ง',
                                                        label: 'สินค้าพร้อมส่ง',
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </CardBoxRadius>
                                    <CardBoxRadius>
                                        <div className="font-24 mb-3">ประเภทการจัดส่ง
                                        </div>
                                        <Form.Item name="typeShipping" layout="vertical" rules={[{ required: true, message: "กรุณาเลือกประเภทการจัดส่ง" }]}>
                                            <Select
                                                defaultValue="ส่งไปรษณีย์"
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={[
                                                    {
                                                        value: 50,
                                                        label: 'ส่งไปรษณีย์',
                                                    },
                                                    {
                                                        value: 150,
                                                        label: 'ส่งแช่แข็ง',
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