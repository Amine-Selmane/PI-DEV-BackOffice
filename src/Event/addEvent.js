import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Button, TimePicker, message, Row, Col } from 'antd';
import axios from 'axios';
import FirebaseImageUpload from './FirebaseImageUpload';

const { TextArea } = Input;

const EventAddForm = () => {
  const [form] = Form.useForm();
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const onFinish = async (values) => {
    try {
      // Convert date to ISO format
      values.date = values.date.format();

      // Include the uploaded image URL in the form data
      values.imageUrl = uploadedImageUrl;

      // Send a POST request to the server to add the event
      await axios.post('http://localhost:5000/events/add', values);

      // Reset the form after successful submission
      form.resetFields();

      // Clear the uploaded image URL
      setUploadedImageUrl('');

      message.success('Event added successfully!');
    } catch (error) {
      console.error('Failed to add event:', error);
      message.error('Failed to add event');
    }
  };

  return (
    <div>
       <Link to="/Events">
          
          <Button style={{ backgroundColor: 'rgb(58, 58, 226)', borderColor: 'rgb(58, 58, 226)' }}>Events</Button>
  
          </Link>
      <Row justify="center">
        <Col span={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the event name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select the event date!' }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Begin Time" name="beginTime" rules={[{ required: true, message: 'Please select the begin time!' }]}>
                  <TimePicker style={{ width: '100%' }} format="hh:mm A" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="End Time" name="endTime" rules={[{ required: true, message: 'Please select the end time!' }]}>
                  <TimePicker style={{ width: '100%' }} format="hh:mm A" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input the event location!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the event description!' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Price" name="price" rules={[{ required: true, type: 'number', message: 'Please input the event price!' }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Number of Places" name="nbrPlaces" rules={[{ required: true, type: 'number', message: 'Please input the number of places!' }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
             <Button type="primary" htmlType="submit"  style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <FirebaseImageUpload onImageUpload={setUploadedImageUrl} />
            </Form.Item>
          
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EventAddForm;
