import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid'// Importer la fonction uuidv4 pour générer des identifiants uniques
import { Alert } from 'reactstrap';

const baseURL = 'http://localhost:5000';

const QuestionForm = () => {
  const [content, setContent] = useState('');
  const [options, setOptions] = useState([{ id: uuidv4(), value: '' }]); // Utiliser un tableau d'objets avec un identifiant unique pour chaque option
  const [correctOptionIndex, setCorrectOptionIndex] = useState('');
  const [errors, setErrors] = useState({});

  const handleChangeOption = (value, id) => {
    const updatedOptions = options.map(option =>
      option.id === id ? { ...option, value } : option
    );
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { id: uuidv4(), value: '' }]);
  };

  const handleRemoveOption = id => {
    const filteredOptions = options.filter(option => option.id !== id);
    setOptions(filteredOptions);
  };



  // const handleSubmit = async () => {
  //   try {
  //     await axios.post(`${baseURL}/questions/createQuestion`, {
  //       content,
  //       options: options.map(option => option.value),
  //       correctOptionIndex: parseInt(correctOptionIndex, 10)
  //     });
  //     window.location.href = '/questions';
  //   } catch (error) {
  //     console.error('Error adding question:', error);
  //   }
  // };

  const validateForm = () => {
    const errors = {};
    if (!content.trim()) {
      errors.content = 'Content is required';
    }
    if (options.length < 2) {
      errors.options = 'Please provide at least 2 options';
    }
    if (!correctOptionIndex) {
      errors.correctOptionIndex = 'Correct Option Index is required';
    } else if (isNaN(correctOptionIndex) || correctOptionIndex < 0 || correctOptionIndex >= options.length) {
      errors.correctOptionIndex = 'Invalid correct option index';
    }
    return errors;
  };
  

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(`${baseURL}/questions/createQuestion`, {
          content,
          options: options.map(option => option.value),
          correctOptionIndex: parseInt(correctOptionIndex, 10)
        });
        window.location.href = '/questions';
      } catch (error) {
        console.error('Error adding question:', error);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>Add New Question</h2>
      <Row justify="center">
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item label="Content">
              <Input value={content} onChange={e => setContent(e.target.value)} />
              {errors.content && <Alert color="danger">{errors.content}</Alert>}
            </Form.Item>
            <Form.Item label="Options">
              {options.map(option => (
                <div key={option.id}>
                  <Input
                    value={option.value}
                    onChange={e => handleChangeOption(e.target.value, option.id)}
                  />
                  <Button onClick={() => handleRemoveOption(option.id)}>Remove</Button>
                </div>
              ))}
              <Button onClick={handleAddOption}>Add Option</Button>
              {errors.options && <Alert color="danger">{errors.options}</Alert>}
            </Form.Item>
            <Form.Item label="Correct Option Index">
              <Input type="number" value={correctOptionIndex} onChange={e => setCorrectOptionIndex(e.target.value)} />
              {errors.correctOptionIndex && <Alert color="danger">{errors.correctOptionIndex}</Alert>}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>Add Question</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionForm;
