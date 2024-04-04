import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';

const baseURL = 'http://localhost:5000';

const QuizList = () => {
  const [data, setData] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${baseURL}/quiz/getAllQuizzes`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/quiz/deleteQuiz/${id}`);
      message.success('Quiz deleted successfully!');
      fetchQuizzes(); // Mettre à jour les données après la suppression
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const columns = [
    {
      title: 'Grade',
      dataIndex: 'studentGrade',
      width: '10%',
      render: (text, record) => <span>{record.studentGrade}</span>,
    },
    {
      title: 'Course',
      dataIndex: 'course',
      width: '10%',
      render: (text, record) => <span>{record.course.name}</span>,
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
      width: '25%',
      render: (text, record) => (
        <ul>
          {record.questions.map(question => (
            <li key={question._id}> {question.content}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '10%',
      render: (text, record) => <span>{new Date(record.date).toLocaleDateString()}</span>,
    },
    {
      title: 'Begin Time',
      dataIndex: 'beginTime',
      width: '10%',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/quiz/update/${record._id}`} style={{ marginRight: 8 }}> {/* Utilisation de Link */}
          <Button type="primary" icon={<EditOutlined />} />
        </Link>
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record._id)}
          // disabled={editingKey !== ''}
        >
          <Button type="danger" icon={<DeleteOutlined />} style={{ backgroundColor: 'red', color: 'white', width: 40 }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>List Of Quizzes</h2>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Link to="/quiz/new">
          <Button type="primary">New</Button>
        </Link>
      </div>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
      />
    </div>
  );
};

export default QuizList;
