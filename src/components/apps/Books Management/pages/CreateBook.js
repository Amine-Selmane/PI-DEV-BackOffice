import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import axios from 'axios';

const CreateBook = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('file', fileList[0]?.originFileObj); // Get the uploaded file object

      await axios.post('http://localhost:5000/books/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      message.success('Book added successfully!');
      form.resetFields();
      setFileList([]); // Reset file list after successful submission
    } catch (error) {
      console.error('Error adding book:', error);
      message.error('Failed to add book');
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
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
        <Input type="number" placeholder="Enter price" />
      </Form.Item>
      <Form.Item name="file" label="File" rules={[{ required: true, message: 'Please upload file' }]}>
        <Upload
          fileList={fileList}
          onChange={onFileChange}
          beforeUpload={() => false} // Disable automatic upload
        >
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
      <Link to="/books">

        <Button type="primary" htmlType="submit">
          Add Book
        </Button>
</Link>
      </Form.Item>
    </Form>
  );
};

export default CreateBook;