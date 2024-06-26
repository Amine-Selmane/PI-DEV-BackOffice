import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Table, Popconfirm, Typography, message, Button, Image, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons'; // Import Ant Design icons

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
    inputType === 'number' ? (
      <InputNumber />
    ) : inputType === 'time' ? (
      <TimePicker format="hh:mm A" />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
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

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  record: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
};

const EventManagement = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];

        // Update the event on the server
        await axios.put(`http://localhost:5000/events/update/${key}`, row);

        // Update the local state with the updated event
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey('');
        message.success('Event updated successfully!');
      } else {
        console.log('Addition not handled in this example');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const handleDelete = async (key) => {
    try {
      // Delete the event on the server
      await axios.delete(`http://localhost:5000/events/delete/${key}`);

      // Update the local state by removing the deleted event
      setData((prevData) => prevData.filter((item) => item.key !== key));
      message.success('Event deleted successfully!');
    } catch (error) {
      console.error('Failed to delete event:', error);
      message.error('Failed to delete event');
    }
  };

  const columns = [
    {
      title: 'IMAGE',
      dataIndex: 'imageUrl',
      width: '10%',
      render: (text, record) => <Image src={text} alt={record.name} width={50} />,
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '15%',
      editable: true,
      render: (text) => <span>{text ? new Date(text).toLocaleDateString('en-GB') : ''}</span>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      width: '20%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: 'Seats',
      dataIndex: 'nbrPlaces',
      width: '10%',
      editable: true,
    },
    {
      title: 'Begin Time',
      dataIndex: 'beginTime',
      width: '15%',
      editable: true,
      render: (text) => <span>{text ? new Date(text).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}</span>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      width: '15%',
      editable: true,
      render: (text) => <span>{text ? new Date(text).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              <SaveOutlined style={{ fontSize: '16px' }} />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a><CloseCircleOutlined style={{ fontSize: '16px' }} /></a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <Button type="primary" icon={<EditOutlined />} />
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              disabled={editingKey !== ''}
            >
          <Button type="danger" icon={<DeleteOutlined />}/>
            </Popconfirm>
          </>
       
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'date' ||
          col.dataIndex === 'price' ||
          col.dataIndex === 'nbrPlaces' ||
          col.dataIndex === 'beginTime' ||
          col.dataIndex === 'endTime'
            ? 'text'
            : 'text', // You can customize the input type for 'beginTime' and 'endTime'
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setData(response.data.map((event) => ({ ...event, key: event._id })));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Button to navigate to the Add Event page */}
      <Link to="/addEvent">
        <Button  style={{ backgroundColor: 'rgb(58, 58, 226)', borderColor: 'rgb(58, 58, 226)' , marginBottom: '20px' }}>New Event</Button>
      </Link>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default EventManagement;
