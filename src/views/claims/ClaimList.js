import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';

const baseURL = 'http://localhost:5000';

const ClaimList = () => {
  const [claims, setClaims] = useState([]);

  const fetchClaims = async () => {
    try {
      const response = await axios.get(`${baseURL}/claims/getAllClaims`);
      setClaims(Object.values(response.data.claims)); // Convertir l'objet en tableau
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/claims/deleteClaim/${id}`);
      message.success('Claim deleted successfully!');
      fetchClaims(); // Mettre à jour les données après la suppression
    } catch (error) {
      console.error('Error deleting claim:', error);
    }
  };

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      width: '20%',
      render: (text, record) => <span>{record.student.firstName} {record.student.lastName}</span>,
    },
    {
      title: 'Audio',
      dataIndex: 'audio',
      width: '30%',
      render: (text, record) => <span>{record.audio}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '15%',
      render: (_, record) => (
        <span>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            {/* <Button type="danger" icon={<DeleteOutlined />} style={{ backgroundColor: 'red', color: 'white', width: 40 }} /> */}
            <Button type="danger" icon={<DeleteOutlined />}/>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* <h2 style={{ color: 'blue', textAlign: 'center' }}>List Of Claims</h2> */}
      <Table
        bordered
        dataSource={claims}
        columns={columns}
        rowClassName="editable-row"
      />
    </div>
  );
};

export default ClaimList;
