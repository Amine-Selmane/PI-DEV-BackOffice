import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const baseURL = 'http://localhost:5000';

const StudentStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${baseURL}/reports/statistics`);
      if (response.data && typeof response.data.statistics === 'object') {
        // Convert the object into an array of statistics objects
        const statisticsArray = Object.values(response.data.statistics);
        setStatistics(statisticsArray);
        setLoading(false);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setFetchError('Failed to fetch statistics');
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (statistics.length === 0 || loading || fetchError) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    if (!chartInstance.current) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: statistics.map(item => item.courseName),
          datasets: [{
            label: 'Average Mark',
            data: statistics.map(item => item.averageMark),
            backgroundColor: '#5e72e4',
            borderColor: '#5e72e4',
            borderWidth: 1
          }, {
            label: 'Number of Students',
            data: statistics.map(item => item.numberOfStudents),
            backgroundColor: '#2dce89',
            borderColor: '#2dce89',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      chartInstance.current.data.labels = statistics.map(item => item.courseName);
      chartInstance.current.data.datasets[0].data = statistics.map(item => item.averageMark);
      chartInstance.current.data.datasets[1].data = statistics.map(item => item.numberOfStudents);
      chartInstance.current.update();
    }
  }, [statistics, loading, fetchError]);

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>Student Statistics by Course</h2>
      {loading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div>Error: {fetchError}</div>
      ) : (
        <div style={{ width: '50%', margin: '0 auto' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default StudentStatistics;
