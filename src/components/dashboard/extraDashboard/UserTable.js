import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Nav, NavItem } from 'reactstrap'; // Assuming you are using Reactstrap
import { FiUserPlus, FiEdit } from 'react-icons/fi';
import { FaArchive } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user1 from '../../../assets/images/users/user4.jpg';

const ProjectTables = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPayer, setIsPayer] = useState(null);

  const handleButtonClick = () => {
    setIsPayer(prevIsPayer => {
      if (prevIsPayer === null) {
        return false;
      } 
        return !prevIsPayer;
      
    });
  };
  



  useEffect(() => {
    // Fetch all users from the backend
    axios.get('http://localhost:5000/api/getall')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter users based on selected role
    if (selectedRole === '') {
      setFilteredUsers(users); // If no role is selected, show all users
    } else {
      const filtered = users.filter(user => user.role === selectedRole);
      setFilteredUsers(filtered);
    }
  }, [selectedRole, users]);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery === '') {
      setFilteredUsers(users); // If no search query, show all users
    } else {
      const filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.toString().toLowerCase().includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  // Function to handle filtering by role
  const handleFilterByRole = (role) => {
    setSelectedRole(role);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleAddUser = () => {
    navigate('/addUser');
  };

  const handleUpdate = (userId) => {
    navigate(`/user-update/${userId}`);
  };

  const handleDelete = async (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
    try {
      await fetch(`http://localhost:5000/api/deleteuser/${userId}`, {
        method: 'DELETE'
      });

      // Remove the deleted disponibilite from the state
      setUsers(prevDispo => prevDispo.filter(Users => Users.userId !== userId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }

  };

  return (
    <div>
      <Nav className="me-auto d-none d-lg-flex " navbar>
      <NavItem className="app-search ps-3">
          <Input
            id="txt-srch"
            name="search"
            placeholder="Search & Enter"
            className="rounded-pill"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ borderColor: 'orange' }}
          />
      </NavItem>

      </Nav>
      <div style={{ textAlign: 'right' }}>
        {/* Buttons for filtering */}
        <Button onClick={() => handleFilterByRole('admin')} className="btn" outline color="primary">Admin</Button>{' '}
        <Button onClick={() => handleFilterByRole('teacher')} className="btn" outline color="primary">Teacher</Button>{' '}
        <Button onClick={() => handleFilterByRole('student')} className="btn" outline color="primary">Student</Button>{' '}
        <Button onClick={() => handleFilterByRole('')} className="btn" color="primary" size="lg" active>Show All</Button>
      </div>

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
            <th className='px-4 text-center'>Payed</th>

            <th className='px-4 text-center' style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((tdata) => (
            <tr key={tdata.id} className="border-top">
              {/* Adjust the structure based on your data */}
              <td style={{ width: '30%' }}>
                <div className="d-flex align-items-center p-2">
                  {/* Adjust the profile image based on your data */}
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
              {tdata.role === 'student' && ( // Utilisez === pour comparer, et entourez avec des accolades
                  <button
                    type="button"
                    style={{ backgroundColor: isPayer ? 'green' : 'red' }}
                    onClick={handleButtonClick}
                  >
                    {isPayer ? 'Yes' : 'No'}
                  </button>
                )}

                </td>
                <td className="text-center">
                <Button onClick={() => handleUpdate(tdata._id)}>
                  <FiEdit size={20} />
                </Button>{' '}
                <Button onClick={() => handleDelete(tdata._id)}>
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
