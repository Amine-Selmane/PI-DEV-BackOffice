
// EventAddForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import './EventAddForm.css'; // Import your CSS file

// import FirebaseUpload from './FirebaseUpload'; // Update the path accordingly

const { TextArea } = Input;

const EventAddForm = () => {
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);

  const onFinish = async (values) => {
    try {
      // Add the uploaded image to the values
      values.image = uploadedImage;

      // Convert date to ISO format
      values.date = values.date.format();

      // Send a POST request to the server to add the event
      await axios.post('http://localhost:5000/events/add', values);

      // Reset the form after successful submission
      form.resetFields();

      // Clear the uploaded image
      setUploadedImage(null);

      message.success('Event added successfully!');
    } catch (error) {
      console.error('Failed to add event:', error);
      message.error('Failed to add event');
    }
  };

  // const handleFileUpload = (imageName) => {
  //   setUploadedImage(imageName);
  // };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/Events">Go to List Event Page</Link>
      </Button>
      {/* Pass the onFileUpload prop to handle uploaded image */}
      {/* <FirebaseUpload onFileUpload={handleFileUpload} /> */}
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select the event date!' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input the event location!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the event description!' }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, type: 'number', message: 'Please input the event price!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Number of Places" name="nbrPlaces" rules={[{ required: true, type: 'number', message: 'Please input the number of places!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventAddForm;








// import React from 'react';
// import { Form, Input, InputNumber, DatePicker, Button, message } from 'antd';
// import axios from 'axios';


// const { TextArea } = Input;

// const EventAddForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     try {
//       // Convert date to ISO format
//       values.date = values.date.format();

//       // Send a POST request to the server to add the event
//       await axios.post('http://localhost:5000/events/add', values);

//       // Reset the form after successful submission
//       form.resetFields();

//       message.success('Event added successfully!');
//     } catch (error) {
//       console.error('Failed to add event:', error);
//       message.error('Failed to add event');
//     }
//   };

//   return (
//     <Form
//       form={form}
//       labelCol={{
//         span: 4,
//       }}
//       wrapperCol={{
//         span: 14,
//       }}
//       onFinish={onFinish}
//       style={{
//         maxWidth: 600,
//       }}
//     >
//       <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the event name!' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select the event date!' }]}>
//         <DatePicker />
//       </Form.Item>
//       <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input the event location!' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the event description!' }]}>
//         <TextArea rows={4} />
//       </Form.Item>
//       <Form.Item label="Price" name="price" rules={[{ required: true, type: 'number', message: 'Please input the event price!' }]}>
//         <InputNumber />
//       </Form.Item>
//       <Form.Item label="Number of Places" name="nbrPlaces" rules={[{ required: true, type: 'number', message: 'Please input the number of places!' }]}>
//         <InputNumber />
//       </Form.Item>
//       <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default EventAddForm;
