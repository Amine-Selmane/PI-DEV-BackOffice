import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Upload, Popconfirm, notification } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const EditBook = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch book data and set form fields
    axios.get(`http://localhost:5000/books/getbookbyid/${id}`)
      .then((response) => {
        form.setFieldsValue(response.data); // Set form fields with fetched data
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      });
  }, [id, form]);

  const onFinish = () => {
    form.submit();
  };

  const handleFinish = (values) => {
    setLoading(true);
    axios.put(`http://localhost:5000/books/update/${id}`, values)
      .then(() => {
        setLoading(false);
        navigate('/books');
        notification.success({
          message: 'Book Updated',
          description: 'The book has been updated successfully.',
          placement: 'bottomRight',
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error updating book:', error);
      });
  };

  const handleCancel = () => {
    navigate('/books');
  };

  const confirmUpdate = () => {
    form.submit();
  };

  return (
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ price: 0 }} // Set initial value for price field
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
  <Input
    type="number"
    placeholder="Enter price (e.g., $)"
    addonBefore="$"
  />
</Form.Item>
        <Form.Item
          name="file"
          label="File"
          rules={[{ required: true, message: 'Please upload file' }]}
        >
          <Upload
            beforeUpload={() => false} // Disable automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Are you sure you want to update this book?"
            onConfirm={confirmUpdate}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" loading={loading}>
              Save
            </Button>
          </Popconfirm>
          <Button type="default" onClick={handleCancel} className="ml-4">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBook;
