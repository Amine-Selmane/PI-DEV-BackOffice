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
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [quantity, setQuantity] = useState(0); // Initialize quantity state

  useEffect(() => {
    axios.get(`http://localhost:5000/books/getbookbyid/${id}`)
      .then((response) => {
        const { title, description, price, file, image, quantity } = response.data;
        form.setFieldsValue({ title, description, price });
        setFileList([{ uid: '-1', name: file, status: 'done', url: file }]);
        setImageList([{ uid: '-1', name: image, status: 'done', url: image }]);
        setQuantity(quantity); // Set quantity state
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
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('file', fileList[0]?.originFileObj);
    formData.append('image', imageList[0]?.originFileObj);
    formData.append('quantity', quantity); // Include quantity in form data

    axios.put(`http://localhost:5000/books/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <Input type="number" placeholder="Enter price" addonBefore="$" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity" // Add quantity field
          initialValue={quantity} // Set initial value
          rules={[{ required: true, message: 'Please enter quantity' }]}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item
          name="file"
          label="File"
          rules={[{ required: true, message: 'Please upload file' }]}
        >
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false} // Disable automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: 'Please upload image' }]}
        >
          <Upload
            fileList={imageList}
            onChange={({ fileList }) => setImageList(fileList)}
            beforeUpload={() => false} // Disable automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
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
