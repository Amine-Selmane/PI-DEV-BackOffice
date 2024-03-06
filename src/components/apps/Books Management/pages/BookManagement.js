import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Table, Popconfirm, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

const baseURL = 'http://localhost:5000';

const BookManagement = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [searchTitle, setSearchTitle] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseURL}/books`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${baseURL}/books/deletebook/${id}`);
      setData(data.filter(book => book._id !== id));
      message.success('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
  
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        await axios.put(`${baseURL}/books/update/${id}`, row);
        message.success('Book updated successfully!');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        message.success('Book updated successfully!');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      message.error('Failed to update book!');
    }
  };
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${baseURL}/books/search`, {
        params: { title: searchTitle }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleReset = async () => {
    try {
      await fetchBooks(); // Reset the list by fetching all books
      setSearchTitle(''); // Clear the search title
    } catch (error) {
      console.error('Error resetting list:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '25%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
    },
    {
      title: 'Operations',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              icon={<SaveOutlined />}
              onClick={() => save(record.id)}
              style={{ marginRight: 8, backgroundColor: 'blue', color: 'white' }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button icon={<CloseOutlined />} style={{ backgroundColor: '#F62217', color: 'white' }} />
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Link to={`/books/update/${record._id}`}>
              <Button
                icon={<EditOutlined />}
                style={{ marginRight: 8, backgroundColor: '#1E90FF', color: 'white' }}
              >
                
              </Button>
            </Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteBook(record._id)}
            >
              <Button icon={<DeleteOutlined />} type="danger" style={{ backgroundColor: 'red', color: 'white' }} />
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Link to="/books/create">
          <Button type="primary">New</Button>
        </Link>
        <div>
          <Input
            placeholder="Search by title"
            style={{ width: 200, marginRight: 8 }}
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Search</Button>
          <Button onClick={handleReset}>Reset</Button> {/* Add a reset button */}
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </Form>
    </div>
  );
};

export default BookManagement;
