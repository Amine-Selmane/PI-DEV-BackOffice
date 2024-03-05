import React, { useEffect, useState } from 'react';
import { Table , Button } from 'reactstrap';
import axios from 'axios'; // Make sure to import axios or your preferred HTTP client
import { FaArchive } from 'react-icons/fa';
import { FiEdit ,FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import user1 from '../../../assets/images/users/user4.jpg';


const ProjectTables = () => {
  const [users, setUsers] = useState([]); // Renamed User to users
  const navigate = useNavigate();
  
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios.get('http://localhost:5000/api/getall')
      .then(response => {
        // Update the state with the data received from the backend
        setUsers(response.data); // Updated setUser to setUsers
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleAddUser = () => {
    navigate('/addUser');
  };

  const handleUpdate = (userId) => {
    // Implement your update logic here
    console.log(`Update user with ID: ${userId}`);
    navigate(`/user-update/${userId}`); 
  };


//   const handleDelete = async (id) => {
//     try{
//         const res = await axios.delete('http://localhost:5000/api/deleteuser/' , id);
//         if(res.data.success){
//             alert(res.data.msg);
//         }
//     }
//     catch(err){
//         console.error(err);
//     }
// }
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteuser/${userId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Remove the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
     // Implement your update logic here
     console.log(`Deleting user with ID: ${userId}`);
  };
  
  return (
    <div>
      <Button onClick={handleAddUser} className="mb-3">
        <FiUserPlus size={20} className="me-2" />
        New User
      </Button>
      <Table className="no-wrap align-middle" responsive borderless>
        <thead>
          <tr>
            <th className='px-4 text-center' style={{ width: '20%' }}>User</th>
            <th className='px-4 text-center'>Birthdate</th>
            <th className='px-4 text-center' style={{ width: '20%' }}>Address</th>
            <th className='px-4 text-center'>Phone</th>
            <th className='px-4 text-center'>Role</th>
            <th className='px-4 text-center' style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((tdata) => (
            <tr key={tdata.id} className="border-top">
              {/* Adjust the structure based on your data */}
              <td style={{ width: '30%' }}>
                <div className="d-flex align-items-center p-2">
                  <img
                    src={tdata.profile || user1}
                    className="rounded-circle"
                    alt="avatar"
                    width="45"
                    height="45"
                  />
                  <div className="ms-3">
                    <h5 className="mb-0 fw-medium">{tdata.firstName} {tdata.lastName}</h5>
                    <span className="text-muted">{tdata.email}</span>
                  </div>
                </div>
              </td>
              <td className="text-center">{formatDate(tdata.dateNaiss)}</td>
              <td style={{ width: '40%' }} className="text-center">{tdata.address}</td>
              <td className="text-center">{tdata.mobile}</td>
              <td className="text-center">{tdata.role}</td>
              <td className="text-center">
                <Button onClick={() => handleUpdate(tdata._id)}>
                  <FiEdit size={20} />
                </Button>{' '}
                <Button onClick={() => {
                            console.log("Deleting user:", tdata);
                            handleDelete(tdata._id);
                          }}>
                            <FaArchive size={20} />
                </Button>


              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
          };

export default ProjectTables;
