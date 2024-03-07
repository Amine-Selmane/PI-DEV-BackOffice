import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'; // Add EyeOutlined icon

const baseURL = 'http://localhost:5000';
const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(''); // Add state for filter criteria
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // Add state for selected order
  const [exchangeRate, setExchangeRate] = useState(2.6); // Example exchange rate from TND to EUR

  useEffect(() => {
    fetchOrders();
  }, [filterCriteria]);

  useEffect(() => {
    // Fetch exchange rate here
    fetchExchangeRate();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${baseURL}/orders?criteria=${filterCriteria}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      // Call your exchange rate API here or use a predefined value
      // For example:
      // const response = await axios.get('YOUR_EXCHANGE_RATE_API');
      // setExchangeRate(response.data.rate);
      setExchangeRate(2.6); // Example exchange rate from TND to EUR
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
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
      title: 'Total Price (TND)',
      dataIndex: 'totalPrice',
      key: 'totalPriceTND',
      render: (text) => <span>{text} TND</span>,
    },
    {
      title: 'Total Price (EUR)',
      dataIndex: 'totalPrice',
      key: 'totalPriceEUR',
      render: (text) => <span>{(text / exchangeRate).toFixed(2)} EUR</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/orders/updateOrder/${record._id}`}>
            <Button icon={<EditOutlined />}                
             style={{ marginRight: 8, backgroundColor: '#1E90FF', color: 'white', width: 40 }}
 />
          </Link>
          <Button icon={<EyeOutlined />} style={{ marginRight: 8 }} onClick={() => handleViewOrder(record)} />

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteOrder(record._id)}
          >
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
            <p>Total Price (TND): {selectedOrder.totalPrice} TND</p>
            <p>Total Price (EUR): {(selectedOrder.totalPrice / exchangeRate).toFixed(2)} EUR</p>
            <p>Status: {selectedOrder.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
