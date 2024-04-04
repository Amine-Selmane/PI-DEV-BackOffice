import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';

const UpdateQuestion = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    content: '',
    options: [{ id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }],
    correctOptionIndex: ''
  });

  useEffect(() => {
    console.log('Fetching question with ID:', id); 
    axios.get(`http://localhost:5000/questions/getQuestionById/${id}`)
      .then(response => {
        console.log('Response:', response); // Afficher la réponse complète
        console.log('Question data:', response.data.question); // Afficher les données de la question
        const questionData = response.data.question;
        if (!questionData) {
          console.error('Question data is invalid:', questionData);
          return;
        }
        const { content, options, correctOptionIndex } = questionData;
        setFormData({
          content,
          options: options.map(option => ({ id: uuidv4(), value: option })),
          correctOptionIndex
        });
      })
      .catch(error => console.error('Error fetching question:', error));
  }, [id]);
  
  const handleChange = (e, optionId) => {
    const { name, value } = e.target;
    if (name.startsWith('options')) {
      // Si la modification concerne une option, mettez à jour l'état des options
      const updatedOptions = formData.options.map(option => {
        if (option.id === optionId) {
          return { ...option, value };
        }
        return option;
      });
      setFormData(prevFormData => ({
        ...prevFormData,
        options: updatedOptions
      }));
    } else {
      // Sinon, mettez simplement à jour les autres champs du formulaire
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = e => {
    e.preventDefault();
    // Convertir les options en un tableau de chaînes de caractères
    const formattedData = {
      content: formData.content,
      options: formData.options.map(option => option.value),
      correctOptionIndex: formData.correctOptionIndex
    };
    console.log('Formatted data:', formattedData);
    axios.put(`http://localhost:5000/questions/updateQuestion/${id}`, formattedData)
      .then(response => {
        console.log('Question updated successfully:', response.data.question);
        window.location.href = '/questions';
      })
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <div>
      <Row>
        <Col md={{ size: 6, offset: 3 }} >
          <h2 style={{ color: 'blue', textAlign: 'center' }}>Update Question</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="content">Content</Label>
              <Input
                type="text"
                name="content"
                id="content"
                value={formData.content}
                onChange={e => handleChange(e)}
                placeholder="Content"
              />
            </FormGroup>
            <FormGroup>
              <Label>Options</Label>
              {formData.options.map(option => (
                <Input
                key={option.id}
                type="text"
                name={`options-${option.id}`}
                value={option.value}
                onChange={(e) => handleChange(e, option.id)} // Utilisation de la syntaxe de raccourci de propriété de fonction
                placeholder={`Option ${formData.options.indexOf(option) + 1}`}
            />
              ))}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="correctOptionIndex">Correct Option Index</Label>
              <Input
                type="number"
                name="correctOptionIndex"
                id="correctOptionIndex"
                value={formData.correctOptionIndex}
                onChange={e => handleChange(e)}
                placeholder="Correct Option Index"
              />
            </FormGroup>
            <Button color="primary" type="submit">Update Question</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateQuestion;
