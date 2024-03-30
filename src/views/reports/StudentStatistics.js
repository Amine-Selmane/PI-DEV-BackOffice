import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const baseURL = 'http://localhost:5000';

const StudentStatistics = () => {
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${baseURL}/reports/statistics`);
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Average Mark',
      dataIndex: 'averageMark',
      key: 'averageMark',
    },
    {
      title: 'Number of Students',
      dataIndex: 'numberOfStudents',
      key: 'numberOfStudents',
    },
  ];

  const data = Object.keys(statistics).map((courseId) => {
    return {
      key: courseId,
      courseName: statistics[courseId].courseName,
      averageMark: statistics[courseId].averageMark.toFixed(2),
      numberOfStudents: statistics[courseId].numberOfStudents,
    };
  });

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>Student Statistics by Course</h2>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default StudentStatistics;
