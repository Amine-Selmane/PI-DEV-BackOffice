import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const baseURL = 'http://localhost:5000';
const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [filterCriteria]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${baseURL}/orders?criteria=${filterCriteria}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${baseURL}/orders/deleteOrder/${id}`);
      setOrders(orders.filter(order => order._id !== id));
      message.success('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleViewOrder = (record) => {
    setSelectedOrder(record);
    setModalVisible(true);
  };

  const handleFilterChange = (value) => {
    setFilterCriteria(value);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Total Price ($)',
      dataIndex: 'total',
      key: 'totalPrice',
      render: (text) => <span>{text} $</span>,
    },
    {
      title: 'Status',
      dataIndex: 'delivery_status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/orders/updateOrder/${record._id}`}>
            <Button icon={<EditOutlined />} style={{ marginRight: 8, backgroundColor: '#1E90FF', color: 'white', width: 40 }} />
          </Link>
          <Button icon={<EyeOutlined />} style={{ marginRight: 8 }} onClick={() => handleViewOrder(record)} />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteOrder(record._id)}>
            <Button icon={<DeleteOutlined />} type="danger" style={{ backgroundColor: 'red', color: 'white', width: 40 }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Link to="/orders/create">
          <Button type="primary">New Order</Button>
        </Link>
      </div>
      <Select
        defaultValue=""
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleFilterChange}
        dropdownStyle={{ backgroundColor: '#f0f2f5', border: '1px solid #d9d9d9' }}
      >
        <Option value="">All Orders</Option>
        <Option value="pending">Pending Orders</Option>
        <Option value="processing">Processing Orders</Option>
        <Option value="completed">Completed Orders</Option>
      </Select>
      <Table dataSource={orders} columns={columns} rowKey="_id" />

      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>Customer ID: {selectedOrder.customerId}</p>
            <p>Total Price ($): {selectedOrder.total} TND</p>
            <p>Status: {selectedOrder.delivery_status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
