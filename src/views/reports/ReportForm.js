import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
//import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';

const baseURL = 'http://localhost:5000';

const ReportForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [mark, setMark] = useState('');
  const [markquiz, setMarkQuiz] = useState('');

  const fetchTeachers = async () => {
      try {
          const response = await axios.get(`${baseURL}/teachers`);
          setTeachers(response.data);
      } catch (error) {
          console.error('Error fetching teachers:', error);
      }
  };

  const fetchStudents = async () => {
      try {
          const response = await axios.get(`${baseURL}/students`);
          setStudents(response.data);
      } catch (error) {
          console.error('Error fetching students:', error);
      }
  };

  const fetchCourses = async () => {
      try {
          const response = await axios.get(`${baseURL}/courses`);
          setCourses(response.data);
      } catch (error) {
          console.error('Error fetching courses:', error);
      }
  };

  useEffect(() => {
      fetchTeachers();
      fetchStudents();
      fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post(`${baseURL}/reports/add`, {
              teacherId,
              studentId,
              courseId,
              mark,
              markquiz
          });
          console.log('Report added successfully');
          window.location.href = '/reports';
          setTeacherId('');
          setStudentId('');
          setCourseId('');
          setMark('');
          setMarkQuiz('');
      } catch (error) {
          console.error('Error adding report:', error);
      }
  };

// const ReportForm = () => {
//   const { id } = useParams();
//   const [teacherId, setTeacherId] = useState('');
//   const [studentId, setStudentId] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [mark, setMark] = useState('');
//   const [markquiz, setMarkQuiz] = useState('');

//   const fetchReport = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/reports/getbyid/${id}`);
//       const { teacherId: fetchedTeacherId, studentId: fetchedStudentId, courseId: fetchedCourseId, mark: fetchedMark } = response.data.report;
//       setTeacherId(fetchedTeacherId);
//       setStudentId(fetchedStudentId);
//       setCourseId(fetchedCourseId);
//       setMark(fetchedMark);
//       setMarkQuiz(markquiz); // Assurez-vous que vous définissez également markquiz
//     } catch (error) {
//       console.error('Error fetching report:', error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchReport();
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/reports/add', {
//         teacherId,
//         studentId,
//         courseId,
//         mark,
//         markquiz,
//       });
//       console.log('Report added successfully:', response.data);
//       window.location.href = '/reports';
//       setTeacherId('');
//       setStudentId('');
//       setCourseId('');
//       setMark('');
//       setMarkQuiz('');
//       // Utilisez redirectTo pour rediriger après l'ajout du rapport
      
//     } catch (error) {
//       console.error('Error adding report:', error);
//     }
//   };

  return (

    <div>
  <Row>
    <Col md={{ size: 6, offset: 3 }}>
      <ComponentCard title={<span style={{ color: 'blue' }}>Add Report</span>}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="teacherName">Teacher</Label>
            <Input
              type="select"
              name="teacherName"
              id="teacherName"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="studentName">Student</Label>
            <Input
              type="select"
              name="studentName"
              id="studentName"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="courseName">Course</Label>
            <Input
              type="select"
              name="courseName"
              id="courseName"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="mark">Mark</Label>
            <Input
              type="number"
              name="mark"
              id="mark"
              placeholder="Enter mark"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="markQuiz">Mark Quiz</Label>
            <Input
              type="number"
              name="markQuiz"
              id="markQuiz"
              placeholder="Enter mark quiz"
              value={markquiz}
              onChange={(e) => setMarkQuiz(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">Add Report</Button>
        </Form>
      </ComponentCard>
    </Col>
  </Row>
</div>
  );
};
  //   <div>
  //     <Row>
  //       <Col md={{ size: 6, offset: 3 }}>
  //         <ComponentCard title={<span style={{ color: 'blue' }}>Add Report</span>}>
  //           <Form onSubmit={handleSubmit}>
  //             <FormGroup>
  //               <Label htmlFor="teacherName">Teacher Name</Label>
  //               <Input
  //                 type="text"
  //                 name="teacherName"
  //                 id="teacherName"
  //                 placeholder="Enter teacher Id"
  //                 value={teacherId}
  //                 onChange={(e) => setTeacherId(e.target.value)}
  //               />
  //             </FormGroup>
  //             <FormGroup>
  //               <Label htmlFor="studentName">Student Name</Label>
  //               <Input
  //                 type="text"
  //                 name="studentName"
  //                 id="studentName"
  //                 placeholder="Enter student Id"
  //                 value={studentId}
  //                 onChange={(e) => setStudentId(e.target.value)}
  //               />
  //             </FormGroup>
  //             <FormGroup>
  //               <Label htmlFor="courseName">Course Name</Label>
  //               <Input
  //                 type="text"
  //                 name="courseName"
  //                 id="courseName"
  //                 placeholder="Enter course Id"
  //                 value={courseId}
  //                 onChange={(e) => setCourseId(e.target.value)}
  //               />
  //             </FormGroup>
  //             <FormGroup>
  //               <Label htmlFor="mark">Mark</Label>
  //               <Input
  //                 type="number"
  //                 name="mark"
  //                 id="mark"
  //                 placeholder="Enter mark"
  //                 value={mark}
  //                 onChange={(e) => setMark(e.target.value)}
  //               />
  //             </FormGroup>
  //             <FormGroup>
  //               <Label htmlFor="markQuiz">MarkQuiz</Label>
  //               <Input
  //                 type="number"
  //                 name="markQuiz"
  //                 id="markQuiz"
  //                 placeholder="Enter mark quiz"
  //                 value={markquiz}
  //                 onChange={(e) => setMarkQuiz(e.target.value)}
  //               />
  //             </FormGroup>
  //             <Button color="primary" type="submit">Add Report</Button>
  //           </Form>
  //         </ComponentCard>
  //       </Col>
  //     </Row>
  //   </div>
  // );


// Ajout de la validation des props
// ReportForm.propTypes = {
//   redirectTo: PropTypes.func.isRequired, // redirectTo doit être une fonction requise
// };

export default ReportForm;
