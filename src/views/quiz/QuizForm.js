import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const QuizForm = () => {
  const [grades, setGrades] = useState([]); // Utiliser pour stocker les grades distincts des étudiants
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentGrade: '',
    courseId: '',
    questionIds: [], 
    date: '',
    beginTime: '',
    endTime: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gradesResponse = await axios.get('http://localhost:5000/grades'); // Endpoint pour récupérer les grades distincts
        setGrades(gradesResponse.data);

        const coursesResponse = await axios.get('http://localhost:5000/courses');
        setCourses(coursesResponse.data);

        const questionsResponse = await axios.get('http://localhost:5000/questions');
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value, options } = e.target;
    if (name === "questionIds") {
      const selectedIds = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({ ...formData, [name]: selectedIds });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (formData.questionIds.length < 5) {
      return;
    }
    axios.post('http://localhost:5000/quiz/createQuiz', formData)
      .then(response => {
        console.log('Quiz added successfully:', response.data);
        window.location.href = '/quiz';
      })
      .catch(error => {
        console.error('Error adding quiz:', error);
      });
  };

  return (
    <div>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="studentGrade">Grade</Label>
              <Input
                type="select"
                name="studentGrade"
                id="studentGrade"
                value={formData.studentGrade}
                onChange={handleChange}
              >
                <option value="">Select Grade</option> 
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="courseId">Course</Label>
              <Input
                type="select"
                name="courseId"
                id="courseId"
                value={formData.courseId}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </Input>
              {submitted && formData.courseId === '' && <Alert color="danger">Course is required</Alert>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="questionIds">Question</Label>
              <Input
                type="select"
                name="questionIds"
                id="questionIds"
                value={formData.questionIds}
                onChange={handleChange}
                multiple 
              >
                <option value="">Select Question</option>
                {questions.map(question => (
                  <option key={question._id} value={question._id}>
                    {question.content}
                  </option>
                ))}
              </Input>
              {submitted && formData.questionIds.length < 5 && <Alert color="danger">Please select at least 5 questions</Alert>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
              {submitted && formData.date === '' && <Alert color="danger">Date is required</Alert>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="beginTime">Begin Time</Label>
              <Input
                type="time"
                name="beginTime"
                id="beginTime"
                value={formData.beginTime}
                onChange={handleChange}
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
              />
            </FormGroup>
            <Button color="primary" type="submit">Add Quiz</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default QuizForm;










//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (id, e) => {
//     const newQuestions = formData.questions.map(question => {
//       if (question.id === id) {
//         return { ...question, text: e.target.value };
//       }
//       return question;
//     });
//     setFormData({ ...formData, questions: newQuestions });
//   };

//   const addQuestionField = () => {
//     const newQuestionId = Math.random().toString(36).substring(7);
//     setFormData(prevState => ({
//       ...prevState,
//       questions: [...prevState.questions, { id: newQuestionId, text: '' }],
//       options: [...prevState.options, []],
//       correctAnswers: [...prevState.correctAnswers, '']
//     }));
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/quiz/createQuiz', formData)
//       .then(response => {
//         console.log('Quiz added successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error adding quiz:', error);
//       });
//   };

//   return (
//     <div>
//       <Row>
//         <Col md={{ size: 6, offset: 3 }}>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label htmlFor="student">Student:</Label>
//               <Input
//                 type="select"
//                 name="student"
//                 id="student"
//                 value={formData.student}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Student</option>
//                 {students.map(student => (
//                   <option key={student._id} value={student._id}>
//                     {student.firstName} {student.lastName}
//                   </option>
//                 ))}
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="course">Course:</Label>
//               <Input
//                 type="select"
//                 name="course"
//                 id="course"
//                 value={formData.course}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map(course => (
//                   <option key={course._id} value={course._id}>
//                     {course.name}
//                   </option>
//                 ))}
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <fieldset>
//                 <legend>Questions:</legend>
//                 {formData.questions.map((question, index) => (
//                   <div key={`question-${question.id}`}>
//                     <Label htmlFor={`question-${question.id}`}>{`Question ${index + 1}`}</Label>
//                     <Input
//                       type="text"
//                       id={`question-${question.id}`}
//                       value={question.text}
//                       onChange={e => handleQuestionChange(question.id, e)}
//                       placeholder={`Question ${index + 1}`}
//                     />
//                   </div>
//                 ))}
//               </fieldset>
//               <Button type="button" onClick={addQuestionField}>Add Question</Button>
//             </FormGroup>
//             <Button type="submit">Add Quiz</Button>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// };

