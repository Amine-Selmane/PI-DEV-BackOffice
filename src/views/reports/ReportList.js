import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Input } from 'antd';
import {DeleteOutlined,EditOutlined,SearchOutlined} from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import '../tables/ReactBootstrapTable.scss'; // Assurez-vous d'importer les styles CSS

//import PropTypes from 'prop-types';
const { Search } = Input;
//const { Option } = Select;

const baseURL = 'http://localhost:5000';

const ReportList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [histogramData, setHistogramData] = useState({});
  //const [searchValue, setSearchValue] = useState('');
 // const [sortOrders, setSortOrders] = useState({});
//  const [sortField, setSortField] = useState(''); // State pour stocker le champ de tri sélectionné

  //const [editingKey, setEditingKey] = useState('');

  const updateHistogramData = (statistics) => {
    // Initialiser les tableaux pour stocker les données
    const courseNames = [];
    const numberOfStudents = [];
    const averageMarks = [];
  
    // Parcourir les statistiques pour extraire les données pertinentes
    statistics.forEach(stat => {
      courseNames.push(stat['course name']); // Ajouter le nom du cours
      numberOfStudents.push(stat['number of students']); // Ajouter le nombre d'étudiants
      averageMarks.push(stat['average mark']); // Ajouter la moyenne des notes
    });
  
    // Mettre à jour l'état de l'histogramme avec les nouvelles données
    setHistogramData({
      labels: courseNames,
      datasets: [
        {
          label: 'Number of Students',
          data: numberOfStudents,
          backgroundColor: '#5e72e4', // Couleur de remplissage de l'histogramme
          borderColor: '#5e72e4', // Couleur de la bordure de l'histogramme
          borderWidth: 1, // Largeur de la bordure de l'histogramme
        },
        {
          label: 'Average Mark',
          data: averageMarks,
          backgroundColor: '#2dce89', // Couleur de remplissage de l'histogramme
          borderColor: '#2dce89', // Couleur de la bordure de l'histogramme
          borderWidth: 1, // Largeur de la bordure de l'histogramme
        },
      ],
    });
  };
  
  

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${baseURL}/reports/getall?sortOrder=${sortOrder}`);
      setData(response.data.reports);
      updateHistogramData(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${baseURL}/statistics`);
      // Supposons que la réponse contienne les données des statistiques sous forme d'objet
      const statisticsData = response.data;
      // Mettre à jour les données de l'histogramme
      // Assurez-vous de traiter les données pour les adapter à votre format d'histogramme si nécessaire
      setHistogramData(statisticsData);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [sortOrder]);

  useEffect(() => {
    if (showStatistics) {
      fetchStatistics();
    }
  }, [showStatistics]);
  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/reports/deletereport/${id}`);
      setData(data.filter(report => report._id !== id));
      message.success('Report deleted successfully!');
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };
  const handleSearch = async (value) => {
    try {
        const response = await axios.get(`${baseURL}/reports/search/${value}`);
        setData(response.data.reports);
        updateHistogramData(response.data.reports);

    } catch (error) {
        console.error('Error searching reports:', error);
    }
};

const handleInputChange = async (e) => {
  const { value } = e.target;
  handleSearch(value);
};

const toggleSearchInput = () => {
  setShowSearchInput(!showSearchInput);
};

// const handleInputChange = async (e) => {
//   const { value } = e.target;
//   try {
//     const response = await axios.get(`${baseURL}/reports/search/${value}`);
//     setData(response.data.reports);
//   } catch (error) {
//     console.error('Error searching reports:', error);
//   }
// };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Inverser l'ordre de tri actuel
    setSortOrder(newSortOrder);
  };

  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      width: '25%',
      render: (text, record) => record.teacher ? <span>{record.teacher.firstName} {record.teacher.lastName}</span> : null,

    },
    {
      title: 'Student',
      dataIndex: 'student',
      width: '25%',
      render: (text, record) => record.student ? <span>{record.student.firstName} {record.student.lastName}</span> : null,

    },
    {
      title: 'Course',
      dataIndex: 'course',
      width: '25%',
      render: (text, record) => record.course ? <span>{record.course.name}</span> : null,
    },
    
    {
      title: 'Mark',
      dataIndex: 'mark',
      width: '10%',
 
    },
    // {
    //   title: 'MarkQuiz',
    //   dataIndex: 'markquiz',
    //   width: '10%',
    // },
    // {
    //   title: 'Average',
    //   dataIndex: 'average',
    //   width: '10%',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
     
      render: (_, record) => (
        <span>
          <Link to={`/reports/update/${record._id}`} style={{ marginRight: 8 }}> {/* Utilisation de Link */}
          <Button type="primary" icon={<EditOutlined />} />
        </Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
           // disabled={editingKey !== ''}
          >
          {/* <Button icon={<DeleteOutlined />} type="danger" style={{ backgroundColor: 'red', color: 'white', width: 40 }} /> */}
          <Button type="danger" icon={<DeleteOutlined />}/>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>List Of Reports</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Button type="primary" onClick={handleSort}>
            Sort by Mark
          </Button>
        </div>
        <div>
          <Link to="/reports/new">
            <Button type="primary">New</Button>
          </Link>
          <Link to="/statistics">
          <Button type="primary" onClick={toggleStatistics} style={{ marginLeft: 16 }}>
           Show Statistics
         </Button>
         </Link>
        </div>
      </div>
  
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          {!showSearchInput ? (
            <SearchOutlined type="primary" style={{ fontSize: 20, color: 'blue' }} onClick={toggleSearchInput} />
          ) : (
            <Search
              placeholder="Search by course name"
              allowClear
              onChange={handleInputChange}
              onSearch={handleSearch}
              onBlur={toggleSearchInput}
              autoFocus
            />
          )}
        </div>
      </div>
  
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
      />
      {showStatistics && (
  <div style={{ width: '50%', margin: '0 auto' }}>
    <h2 style={{ color: 'blue', textAlign: 'center' }}>Histogram</h2>
    <Bar data={histogramData} />
  </div>
)}
    </div>
  );
  
};

export default ReportList;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {Button} from 'reactstrap';

// const baseURL = 'http://localhost:5000';

// const ReportList = () => {
//   const [reports, setReports] = useState([]);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/reports/getall`);
//       setReports(response.data.reports);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${baseURL}/reports/deletereport/${id}`);
//       // Utilisez `_id` à la place de `id` pour la suppression
//       setReports(reports.filter(report => report._id !== id));
//     } catch (error) {
//       console.error('Error deleting report:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ color: 'blue', textAlign:"center" }}>List Of Reports</h2>
//       <div className="d-flex justify-content-end mb-3"> {/* Utilisez la classe Bootstrap d-flex et justify-content-end pour aligner à droite */}
//         <Link to="/reports/new">
//           <Button color="primary">New</Button>
//         </Link>
//       </div>
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Teacher</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Student</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Mark</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>MarkQuiz</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Average</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports && reports.map(report => (
//             <tr key={report._id}>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.teacher.firstName} {report.teacher.lastName}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.student.firstName} {report.student.lastName}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.course.name}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.mark}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.markquiz}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{report.average}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>
//                 <Link to={`/reports/update/${report._id}`}>
//                   <button type="button" >Update</button>
//                 </Link>
//                 <button type="button"  onClick={() => handleDelete(report._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportList;
