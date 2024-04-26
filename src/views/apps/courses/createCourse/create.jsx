import { useEffect, useState } from "react";
import axios from "axios";
import "../createCourse/create.css";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    teacher: "",
    halfYearlyPrice: "", // New state variable for half yearly price
    yearlyPrice: ""     // New state variable for yearly price
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/courses/getCoursebyId/${id}`);
      setPost(data);
    };
    fetchPost();

    const fetchTeachers = async () => {
      const response = await axios.get("http://localhost:5000/teachers");
      setTeachers(response.data); // Assuming response.data is an array of teacher objects
    };
    fetchTeachers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post("http://localhost:5000/api/courses", post);
      return navigate("/");
    } else {
      await axios.put(`http://localhost:5000/api/courses/${id}`, post);
      return navigate("/");
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Content..."
            name="content"
            value={post.content}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Half Yearly Price..."
            name="halfYearlyPrice"
            value={post.halfYearlyPrice}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Yearly Price..."
            name="yearlyPrice"
            value={post.yearlyPrice}
            onChange={handleChange}
          />
          <select name="teacher" value={post.teacher} onChange={handleChange}>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
