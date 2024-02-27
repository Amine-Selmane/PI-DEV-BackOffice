import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import axios from 'axios';

const FirebaseUpload = ({ onFileUpload }) => {
  const [firebaseData, setFirebaseData] = useState();

  const fetchFirebaseData = async () => {
    try {
      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append('file', new File([], 'dummy'));  // 'dummy' is a placeholder, you may need to adjust this depending on your use case
  
      // Send a POST request with the FormData
      const response = await axios.post('http://localhost:5000/test-upload', formData);
  
      setFirebaseData(response.data);
    } catch (error) {
      message.error('Failed to fetch Firebase data');
    }
  };
  

  const init = async () => {
    try {
      await fetchFirebaseData();
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const imageName = fileList[0].url.split('/').pop();
      onFileUpload(imageName);
    }
  };

 

  const getExtraData = () => ({
    key: Date.now(),
    // Add other necessary data for Firebase upload
  });

  const beforeUpload = async (file) => {
    if (!firebaseData) return false;

    // Add other logic if needed

    return file;
  };

  const uploadProps = {
    name: 'file',
    action: firebaseData?.host,
    onChange: handleChange,
    data: getExtraData,
    beforeUpload,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

// Add propTypes for onFileUpload
FirebaseUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FirebaseUpload;
