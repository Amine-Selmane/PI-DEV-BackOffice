import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Image } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HTMLFlipBook from 'react-pageflip';

const CreateBook = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [formFilled, setFormFilled] = useState(false);
  const [htmlContent, setHtmlContent] = useState(null);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('file', fileList[0]?.originFileObj);
      formData.append('image', imageList[0]?.originFileObj);

      // Upload the file to the server
      const response = await axios.post('http://localhost:5000/books/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Extract the HTML content from the response (assuming the server converts PDF to HTML)
      setHtmlContent(response.data.htmlContent);

      message.success('Book added successfully!');
      form.resetFields();
      setFileList([]);
      setImageList([]);
      setFormFilled(false);
    } catch (error) {
      console.error('Error adding book:', error);
      message.error('Failed to add book');
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFormFilled(true);
  };

  const onImageChange = ({ fileList }) => {
    setImageList(fileList);
    setFormFilled(true);
  };

  const isFormEmpty = () => {
    const fields = form.getFieldsValue();
    return Object.values(fields).every(value => value === undefined || value === '');
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
        <Input type="number" placeholder="Enter price" addonBefore="$" />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
        <Input type="number" placeholder="Enter quantity" />
      </Form.Item>
      <Form.Item name="file" label="File" rules={[{ required: true, message: 'Please upload file' }]}>
        <Upload fileList={fileList} onChange={onFileChange} beforeUpload={() => false} name="file">
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Form.Item>

      {/* Display HTMLFlipBook if HTML content is available */}
      {htmlContent && (
        <HTMLFlipBook width={800} height={600}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </HTMLFlipBook>
      )}

      <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please upload image' }]}>
        <Upload fileList={imageList} onChange={onImageChange} beforeUpload={() => false} name="image">
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        {imageList.length > 0 && imageList[0]?.originFileObj && (
          <Image width={200} src={URL.createObjectURL(imageList[0]?.originFileObj)} />
        )}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!formFilled}>
          Add Book
        </Button>
        {!isFormEmpty() && (
          <Link to="/books">
            <Button type="default" icon={<ArrowLeftOutlined />}>Back</Button>
          </Link>
        )}
      </Form.Item>
    </Form>
  );
};

export default CreateBook;