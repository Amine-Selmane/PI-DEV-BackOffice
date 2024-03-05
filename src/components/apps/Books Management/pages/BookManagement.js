import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Table, Popconfirm, Typography, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'; // Import icons
import { UploadOutlined } from '@ant-design/icons';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook

const baseURL = 'http://localhost:5000';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? <Input type="number" /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please input ${title}!` }]}
          initialValue={record[dataIndex]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BookManagement = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook
  const history = useHistory(); // Initialize useHistory hook

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
      setData(data.filter(report => book.id !== id));
      message.success('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
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
              <Button icon={<CloseOutlined />} style={{ backgroundColor: 'red', color: 'white' }} />
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ marginRight: 8, backgroundColor: 'blue', color: 'white' }}
            >
              
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteBook(record.id)} // Call handleDeleteBook function with id parameter
            //  disabled={editingKey !== ''}
            >
              <Button icon={<DeleteOutlined />} type="danger" style={{ backgroundColor: 'red', color: 'white' }} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Link to="/books/create">
          <Button type="primary">New</Button>
        </Link>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
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
