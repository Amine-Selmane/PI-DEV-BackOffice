import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';

const baseURL = 'http://localhost:5000';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${baseURL}/reports/getall`);
      setReports(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/reports/deletereport/${id}`);
      // Utilisez `_id` à la place de `id` pour la suppression
      setReports(reports.filter(report => report._id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign:"center" }}>List Of Reports</h2>
      <div className="d-flex justify-content-end mb-3"> {/* Utilisez la classe Bootstrap d-flex et justify-content-end pour aligner à droite */}
        <Link to="/reports/new">
          <Button color="primary">New</Button>
        </Link>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Teacher</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Student</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Mark</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>MarkQuiz</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Average</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.map(report => (
            <tr key={report._id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.teacher.firstName} {report.teacher.lastName}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.student.firstName} {report.student.lastName}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.course.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.mark}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.markquiz}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.average}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <Link to={`/reports/update/${report._id}`}>
                  <button type="button" >Update</button>
                </Link>
                <button type="button"  onClick={() => handleDelete(report._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
