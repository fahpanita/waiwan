import React, { useEffect, useState, useRef } from 'react'
import styled from "styled-components";
import { Form, Input, Button, Select, Table, Layout, Space, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Footer, Header, Content } from 'antd/es/layout/layout';
import { Editor } from '@tinymce/tinymce-react';
import { createCartEvents } from '../../services/cartEvents';
import { uploadImages } from '../../services/upload';


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

const uploadImageFromAnd = async ({ file, onSuccess, onError }) => {
    try {
        const res = await uploadImages(file)
        onSuccess(res?.data?.path)
    } catch (error) {
        onError("Error")
    }

}

const AddCardEvent = () => {

    const [createCartEventsForm] = Form.useForm();
    const formDataCartEvents = Form.useWatch([], createCartEventsForm);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            return (editorRef.current.getContent());
        }
    };

    const handleChangeDetail = () => {
        //createCartEventsForm.setFieldValue('detail', log())
        console.log(log())
    };

    const onCreateCartEventsFinish = async (value) => {
        const newValue = { ...value, detail: log() }

        console.log(newValue)
        try {
            const res = await createCartEvents(newValue);
            console.log(res)
            if (res) {
                navigate("/addInfoEvent")
            }

        } catch (error) {

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
        createCartEventsForm.setFieldValue("thumbnail", info.file.response)
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, }}>
                Upload
            </div>
        </div>
    );

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

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Form form={createCartEventsForm} layout="vertical" onFinish={onCreateCartEventsFinish}>
                    <Header style={{ background: '#fff', }}>
                        <div className="font-24">เพิ่มการ์ดเทศกาล</div>
                    </Header >
                    <Content style={{ margin: '24px 24px 0', }}>
                        <div style={{ background: '#F5F5F5', }}>
                            <Row>
                                <Col span={24}>
                                    <CardBoxRadius style={{ marginBottom: '150px' }}>
                                        <div className="font-24 mb-3">ข้อมูลทั่วไปของเทศกาล</div>
                                        <Form.Item name="name" label="ชื่อเทศกาล" >
                                            <Input value={formDataCartEvents?.name} />
                                        </Form.Item>
                                        <Form.Item name="thumbnail" label="ภาพปกเทศกาล">
                                            <ImgCrop rotationSlider>
                                                <Upload
                                                    name="thumbnail"
                                                    value={formDataCartEvents?.thumbnail}
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
                                        <Form.Item name="detail" label="รายละเอียดเทศกาล" style={{ display: 'none' }} />
                                        <Editor
                                            onChange={handleChangeDetail}
                                            //value={formDataCartEvents?.detail}
                                            apiKey='7ioen7hcz2mc303clydftkxt1ez6ao4nggsb7esgdovg35a7'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue="<p>Please put your content in here...</p>"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                    'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                    'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'image editimage',
                                                ],
                                                toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                                                    'alignleft aligncenter alignright alignjustify | ' +
                                                    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help' + ' image',
                                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />

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