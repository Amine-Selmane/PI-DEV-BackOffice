import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';

const UpdateQuiz = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    selectedQuestions: [],
    allQuestions: [],
    date: '',
    beginTime: '',
    endTime: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/quiz/getQuizById/${id}`)
      .then(response => {
        const quizData = response.data.quiz;
        if (!quizData || !quizData.student || !quizData.course) {
          console.error('Quiz data is invalid:', quizData);
          return;
        }
        const { student, course, questions, date, beginTime, endTime } = quizData;
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const questionContents = questions.map(question => ({ _id: question._id, content: question.content }));
        const selectedQuestionIds = questions.map(question => question._id); // IDs des questions sélectionnées
        setFormData({
          studentName: `${student.firstName} ${student.lastName}`,
          courseName: course.name,
          selectedQuestions: selectedQuestionIds, // Utiliser les IDs des questions sélectionnées
          allQuestions: questionContents,
          date: formattedDate,
          beginTime,
          endTime
        });
      })
      .catch(error => console.error('Error fetching quiz:', error));
  }, [id]);
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSelectChange = e => {
  //   const selectedQuestionIds = Array.from(e.target.selectedOptions, option => option.value);
  //   setFormData({ ...formData, selectedQuestions: selectedQuestionIds });
  // };

  const handleSubmit = e => {
    e.preventDefault();
    const { date, beginTime, endTime, selectedQuestions } = formData;
    if (selectedQuestions.length === 0) {
      console.error('No questions selected');
      return;
    }
    axios.put(`http://localhost:5000/quiz/updateQuiz/${id}`, { date, beginTime, endTime, questionIds: selectedQuestions })
      .then(response => {
        console.log('Quiz updated successfully:', response.data.quiz);
        window.location.href = '/quiz';
      })
      .catch(error => console.error('Error updating quiz:', error));
  };

  return (
    <div>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ComponentCard title={<span style={{ color: 'blue' }}>Update Quiz</span>}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={formData.studentName}
                  disabled
                  placeholder="Student Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  type="text"
                  name="courseName"
                  id="courseName"
                  value={formData.courseName}
                  disabled
                  placeholder="Course Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="selectedQuestions">Questions</Label>
                <Input
    type="select"
    name="selectedQuestions"
    id="selectedQuestions"
    multiple
    disabled // Désactiver le champ de sélection
  >
    {formData.allQuestions.map(question => (
      <option key={question._id} value={question._id} disabled>{question.content}</option> // Désactiver les options
    ))}
  </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Date"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="beginTime">Begin Time</Label>
                <Input
                  type="time"
                  name="beginTime"
                  id="beginTime"
                  value={formData.beginTime}
                  onChange={handleChange}
                  placeholder="Begin Time"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  placeholder="End Time"
                />
              </FormGroup>
              <Button color="primary" type="submit">Update Quiz</Button>
            </Form>
            {formData.selectedQuestions.length === 0 && (
              <p style={{ color: 'red' }}>Please select at least one question</p>
            )}
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateQuiz;
