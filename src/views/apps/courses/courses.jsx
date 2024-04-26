import React, { useEffect, useState } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComponentCard from '../../../components/ComponentCard';
import "./courses.css";

const Courses = () => {
  const [modal, setModal] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [teachersFetch, setfetchTeachers] = useState([]);
  const toggle = () => setModal(!modal);

  const fetchTeacher = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/getall');
      const teachers = res.data.filter(user => user.role === 'teacher');
      setfetchTeachers(teachers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const handleEdit = (post) => {
    setFormMode("update");
    setPostToUpdate(post);
    toggle();
  }

  const handleAdd = () => {
    setFormMode("create");
    toggle();
    setPostToUpdate(null);
  }

  const navigate = useNavigate();
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [postid, setPostId] = useState({
    course: "",
    classroom: "",
    duration: 30,
    teacher: ""
    
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/courses/getCoursebyId/${id}`);
      setPostId(data);
    };
    fetchPost();
  }, []);

  const handleChange = (e) => {
    const postClone = { ...postid };
    postClone[e.target.name] = e.target.value;
    setPostId(postClone);
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses/getCourse');
      console.log('Response:', res.data); // Log the response data to see its structure
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    setPosts(posts.filter((p) => p._id !== postId));
    await axios.delete(`http://localhost:5000/courses/deleteCourse/${postId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "create") {
      await axios.post(`http://localhost:5000/courses/setCourse`, postid);
    } else {
      await axios.put(`http://localhost:5000/courses/updateCourse/${postToUpdate._id}`, postid);
    }
    window.location.reload(false);
  };

  return (
    <Row>
      <Col lg="12">
        <ComponentCard title="Courses">
          <div className="posts">
            <div className="container">
              <div>
                <Button color="primary" className="addBtn" onClick={handleAdd}>
                  Add Course
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Course {formMode}</ModalHeader>
                  <ModalBody className="input-add">
                    <div>
                      <input
                        defaultValue={postToUpdate?.name}
                        type="text"
                        placeholder="Course name..."
                        name="name"
                        value={postid.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        defaultValue={postToUpdate?.classroom}
                        type="number"
                        placeholder="Classroom..."
                        name="classroom"
                        value={postid?.classroom}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        defaultValue={postToUpdate?.halfYearlyPrice}
                        type="number"
                        placeholder="Half Yearly Price..."
                        name="halfYearlyPrice"
                        value={postid?.halfYearlyPrice}
                        onChange={handleChange}
                      />
                    </div><div>
                      <input
                        defaultValue={postToUpdate?.yearlyPrice}
                        type="number"
                        placeholder=" Yearly Price..."
                        name="YearlyPrice"
                        value={postid?.yearlyPrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        defaultValue={postToUpdate?.duration}
                        placeholder="Class duration"
                        name="duration"
                        disabled
                        value={postid?.duration}
                      />
                    </div>
                    <div>
                      <select
                        defaultValue={postToUpdate?.teacher_name}
                        placeholder="Teacher Name"
                        name="teacher_name"
                        value={postid?.teacher}
                        onChange={handleChange}
                      >
                        {teachersFetch.map((teacher) => (
                          <option key={teacher.id}>
                            {teacher.firstName} {teacher.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                      {formMode}
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Classroom</th>
                    <th>Duration(minutes)</th>
                    <th>Teacher</th>
                    <th>halfYearlyPrice</th>
                    <th>yearlyPrice</th>
                    
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
  {Array.isArray(posts) && posts.map((post) => (
    <tr key={post.id}>
      <td> {post.name} </td>
      <td> {post.classroom} </td>
      <td> {post.duration} </td>
      <td> {post.teacher_name} </td>
      <td> {post.halfYearlyPrice} </td>
   <td> {post.yearlyPrice} </td>


      <td>
        <div>
          <Button type="primary" onClick={() => handleEdit(post)} icon={<EditOutlined />} />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(post._id)}
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Courses;