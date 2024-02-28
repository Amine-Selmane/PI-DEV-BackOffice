import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComponentCard from '../../../components/ComponentCard';
import "./courses.css"


const Courses = (args) => {

  const [modal, setModal] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null)
  const [formMode, setFormMode] = useState("create");
  const toggle = () => {setModal(!modal)};
  

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
    teacher: ""
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/courses/getCoursebyId/${id}`);
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
    const res = await axios.get('http://localhost:5000/api/courses/getCourse');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    console.log("post", post);
    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`http://localhost:5000/api/courses/deleteCourse/${post._id}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "create") {
      await axios.post(`http://localhost:5000/api/courses/setCourse`, postid);
    }
   else{
    await axios.put(`http://localhost:5000/api/courses/updateCourse/${postToUpdate._id}`, postid);
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
                          type="text"
                          placeholder="Classroom..."
                          name="classroom"
                          value={postid?.classroom}
                          onChange={handleChange}
                        />
                    </div>
                    <div>
                      <input
                      defaultValue={postToUpdate?.teacher_name}
                        type="text"
                        placeholder="Teacher name..."
                        name="teacher_name"
                        value={postid.teacher_name}
                        onChange={handleChange}
                      />
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
                    <th>Teacher</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td> {post.name} </td>
                      <td> {post.classroom} </td>
                      <td> {post.teacher_name} </td>
                      <td>
                        <div>
                          <Button color="warning"
                            onClick={() => handleEdit(post)}
                          >
                            Update
                          </Button>

                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(post)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
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
