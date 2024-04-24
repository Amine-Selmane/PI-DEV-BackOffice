import React, { useEffect, useState } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button,Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComponentCard from '../../../components/ComponentCard';
import "./courses.css"


const Courses = (args) => {

  const [modal, setModal] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null)
  const [formMode, setFormMode] = useState("create");
  const [teachersFetch, setfetchTeachers] = useState([]);

  const toggle = () => { setModal(!modal) };

  const fetchTeacher = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/getall');
      const teachers = res.data.filter(user => user.role === 'teacher');
      setfetchTeachers(teachers);
      console.log(teachersFetch)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
 
  useEffect(() => {
    fetchTeacher();
  }, []);


  const handleEdit = (post) => {
    console.log(post);
    setFormMode("update");
    setPostToUpdate(post)
    toggle()
  }

  const handleAdd = () => {
    setFormMode("create");
    toggle()
    console.log(formMode);
    setPostToUpdate(null);
  }
  const navigate = useNavigate();
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [postid, setPostId] = useState({
    course: "",
    classroom: "",
    duration: 30,
    teacher: "",
    nbrQuiz: ""
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
    const res = await axios.get('http://localhost:5000/courses/getCourse');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    console.log("post", post);
    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`http://localhost:5000/courses/deleteCourse/${post._id}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "create") {
      await axios.post(`http://localhost:5000/courses/setCourse`, postid);
    }
    else {
      await axios.put(`http://localhost:5000/courses/updateCourse/${postToUpdate._id}`, postid);
    }
    window.location.reload(false);
  };



  // console.log(posts);

  return (
    <Row>
      <Col lg="12">
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <ComponentCard title="Courses">
          <div className="posts">
            <div className="container">
              <div>
                <Button color="primary" className="addBtn" onClick={() => handleAdd()}>
                  Add Course
                </Button>
                <Modal isOpen={modal} toggle={toggle} {...args}>
                  <ModalHeader toggle={toggle}>Course {formMode}</ModalHeader>
                  <ModalBody className="input-add" >
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
                      {/* <input
                      defaultValue={postToUpdate?.teacher_name}
                        type="text"
                        placeholder="Teacher name..."
                        name="teacher_name"
                        value={postid.teacher_name}
                        onChange={handleChange}
                      /> */}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td> {post.name} </td>
                      <td> {post.classroom} </td>
                      <td> {post.duration} </td>
                      <td> {post.teacher_name} </td>
                      <td>
  <div>
    <Button type="primary" onClick={() => handleEdit(post)} icon={<EditOutlined />} />

    <Button type="danger" onClick={() => handleDelete(post)} icon={<DeleteOutlined />} />
  </div>
</td>
                    </tr>
                  ))}

render: (_, post) => (
        <span>
        <Popconfirm

        title="Sure to delete?"
            onConfirm={() => handleEdit(post._id)}
           // disabled={editingKey !== ''}
          <Button type="primary" icon={<EditOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(post._id)}
          
          <Button type="danger" icon={<DeleteOutlined />}/>
          </Popconfirm>
        </span>
      ),
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