import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'; // Import the ArrowLeftOutlined icon
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const CreateOrder = () => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      const orderData = {
        customerId: values.customerId,
        items: values.items.map(item => ({ itemId: item, quantity: 1 })), // Map selected book IDs to item objects
        subtotal: 0, // Assuming subtotal needs to be calculated on the server
        total: parseFloat(values.totalPrice), // Parse total price as a number
       // shipping: {}, // Assuming shipping information needs to be handled separately
        delivery_status: 'pending', // Assuming default delivery status is 'pending'
        payment_status: 'pending' // Assuming default payment status is 'pending'
      };

      await axios.post('http://localhost:5000/orders/create', orderData);

      message.success('Order added successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error adding order:', error);
      message.error('Failed to add order');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="customerId" label="Customer ID" rules={[{ required: true, message: 'Please enter customer ID' }]}>
        <Input placeholder="Enter customer ID" />
      </Form.Item>
      <Form.Item name="items" label="Items" rules={[{ required: true, message: 'Please select items' }]}>
        <Select mode="multiple" placeholder="Select items">
          {books.map(book => (
            <Option key={book._id} value={book._id}>{book.title}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subtotal" label="subtotal " rules={[{ required: true, message: 'Please enter subtotal price' }]}>
        <Input type="number" placeholder="Enter subtotal price" />
      </Form.Item>
      <Form.Item name="total" label="total " rules={[{ required: true, message: 'Please enter total price' }]}>
        <Input type="number" placeholder="Enter total price" />
      </Form.Item>
      <Form.Item name="delivery_status" label="delivery_status">
        <Select>
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item name="
payment_status" label="
payment_status">
        <Select>
          <Option value="paid">paid</Option>
        </Select>
      </Form.Item>
      <Form.Item>

        <Button type="primary" htmlType="submit">
          Add Order
        </Button>
        <Link to="/orders">
          <Button type="default" icon={<ArrowLeftOutlined />}>Back</Button> {/* Use ArrowLeftOutlined icon */}
        </Link>
      </Form.Item>
    </Form>
  );
};

export default CreateOrder;
