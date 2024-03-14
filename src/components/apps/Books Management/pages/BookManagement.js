import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Table, Popconfirm, message, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, EyeOutlined,SearchOutlined } from '@ant-design/icons';
import { BsInfoCircle } from 'react-icons/bs';

const baseURL = 'http://localhost:5000';

const BookManagement = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [searchTitle, setSearchTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null); // Add state for selected book
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

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
  }, [sortOrder]);

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

  const handleViewDetails = (record) => {
    setSelectedBook(record); // Set selected book
    setModalVisible(true); // Show modal
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Clear selected book
    setModalVisible(false); // Hide modal
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

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Inverser l'ordre de tri actuel
    setSortOrder(newSortOrder);
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
        return (
          <span>
            <Link to={`/books/update/${record._id}`}>
              <Button
                icon={<EditOutlined />}
                style={{ marginRight: 8, backgroundColor: '#1E90FF', color: 'white', width: 40 }}
              />
            </Link>
            <Button
              icon={<EyeOutlined />}
              style={{ marginRight: 8, width: 40 }}
              onClick={() => handleViewDetails(record)} // Add click handler for details
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteBook(record._id)}
            >
              <Button icon={<DeleteOutlined />} type="danger" style={{ backgroundColor: 'red', color: 'white', width: 40 }} />
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
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={handleSort}>
          {`Sort by Price `}
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </Form>

      {/* Modal to display book details */}
      <Modal
        title="Book Details"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedBook && (
          <div>
            <p>Title: {selectedBook.title}</p>
            <p>Description: {selectedBook.description}</p>
            <p>Price: {selectedBook.price}</p>
            {/* Additional book details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookManagement;