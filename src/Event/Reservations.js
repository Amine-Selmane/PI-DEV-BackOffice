import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
        message.error('Failed to fetch reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const generateEventKey = (reservationId, eventName) => `${reservationId}-${eventName}`;

  const columns = [
    {
      title: 'Customer Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'events',
      render: (events, reservation) => (
        <ul>
          {events.map((event) => (
            <li key={generateEventKey(reservation._id, event.name)}>
              {event.name} - Quantity: {event.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <div>
      <h1>Reservation Management</h1>
      <Table
        dataSource={reservations}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default ReservationManagement;
