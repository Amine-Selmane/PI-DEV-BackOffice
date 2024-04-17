import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, FileExcelOutlined } from '@ant-design/icons';
import Chart from 'chart.js/auto';

const baseURL = 'http://localhost:5000';
const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatistics, setOrderStatistics] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchOrderStatistics();
  }, [filterCriteria]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${baseURL}/orders`, {
        params: { criteria: filterCriteria }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

 const fetchOrderStatistics = async () => {
  try {
    const response = await axios.get(`${baseURL}/orders/statistics`);
    setOrderStatistics(response.data);
  } catch (error) {
    console.error('Error fetching order statistics:', error);
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

  const handleFilterChange = async (deliveryStatus) => {
    try {
      const response = await axios.get(`${baseURL}/orders/filter/${deliveryStatus}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + orders.map(order => `${order.customerId},${order.total},${order.delivery_status},${order.orderedAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (orderStatistics) {
      const ctx = document.getElementById('orderChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Total Orders', 'Total Revenue', 'Average Order Value'],
          datasets: [{
            label: 'Order Statistics',
            data: [orderStatistics.totalOrders, orderStatistics.totalRevenue, orderStatistics.averageOrderValue],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [orderStatistics]);

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderedAt',
      key: 'orderDate',
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
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
            <Button icon={<EditOutlined />} className="action-btn edit-btn" />
          </Link>
          <Button icon={<EyeOutlined />} className="action-btn view-btn" onClick={() => handleViewOrder(record)} />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteOrder(record._id)}>
            <Button icon={<DeleteOutlined />} type="danger" className="action-btn delete-btn" />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Select
          defaultValue=""
          className="filter-select"
          onChange={handleFilterChange}
        >
          <Option value="">All Orders</Option>
          <Option value="pending">Pending Orders</Option>
          <Option value="processing">Processing Orders</Option>
          <Option value="completed">Completed Orders</Option>
        </Select>
        <Link to="/orders/create">
          <Button type="primary">New Order</Button>
        </Link>
        <Button icon={<FileExcelOutlined />} onClick={exportToCSV}>Export to CSV</Button>
      </div>
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

      <canvas id="orderChart" width="400" height="200"></canvas>
    </div>
  );
};

export default OrderManagement;
