import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const UpdateOrder = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
    fetchBooks();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/getorderbyid/${id}`);
      setOrder(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      message.error('Failed to fetch order details');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      message.error('Failed to fetch book details');
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/orders/updateOrder/${id}`, {
        customerId: values.customerId,
        items: values.items.map(item => ({ itemId: item, quantity: 1 })), 
        subtotal: order.subtotal, 
        total: values.totalPrice,
        shipping: order.shipping,
        delivery_status: values.status,
        payment_status: order.payment_status 
      });
      message.success('Order updated successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error updating order:', error);
      message.error('Failed to update order');
      setLoading(false);
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
      <Form.Item name="status" label="Status">
        <Select>
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true, message: 'Please enter total price' }]}>
        <Input type="number" placeholder="Enter total price" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Order
        </Button>
        <Link to={`/orders`}>
          <Button type="default" icon={<ArrowLeftOutlined />}>Back</Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default UpdateOrder;
