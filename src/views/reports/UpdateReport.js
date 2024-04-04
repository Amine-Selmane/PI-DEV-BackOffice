import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';

const UpdateReport = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    teacherName: '',
    studentName: '',
    courseName: '',
    mark: ''
  //  markquiz: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/reports/getbyid/${id}`)
      .then(response => {
        const { teacher, student, course, mark } = response.data.report;
        setFormData({
          teacherName: `${teacher.firstName} ${teacher.lastName}`,
          studentName: `${student.firstName} ${student.lastName}`,
          courseName: course.name,
          mark
         // markquiz
        });
      })
      .catch(error => console.error('Error fetching report:', error));
  }, [id]);
  
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/reports/update/${id}`, formData)
      .then(response => {
        console.log('Report updated successfully:', response.data.report);
        window.location.href = '/reports';
      })
      .catch(error => console.error('Error updating report:', error));
  };

  return (
    <div>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        {/*--------------------------------------------------------------------------------*/}
        {/* Ordinary Form                                                                  */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <Col md={{ size: 6, offset: 3 }}> Centrer le formulaire */}
        <Col md={{ size: 6, offset: 3 }} >
          <ComponentCard title={<span style={{ color: 'blue' }}>Update Report</span>}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="teacherName">Teacher Name</Label>
                <Input
                  type="text"
                  name="teacherName"
                  id="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange} disabled
                  placeholder="Enter Teacher Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange} disabled
                  placeholder="Enter Student Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  type="text"
                  name="courseName"
                  id="courseName"
                  value={formData.courseName}
                  onChange={handleChange} disabled
                  placeholder="Enter Course Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="mark">Mark</Label>
                <Input
                  type="number"
                  name="mark"
                  id="mark"
                  value={formData.mark}
                  onChange={handleChange}
                  placeholder="Enter Mark"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label htmlFor="markquiz">MarkQuiz</Label>
                <Input
                  type="number"
                  name="markquiz"
                  id="markquiz"
                  value={formData.markquiz}
                  onChange={handleChange}
                  placeholder="Enter MarkQuiz"
                />
              </FormGroup> */}
              <Button color="primary" type="submit">Update Report</Button>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );  
};

export default UpdateReport;
