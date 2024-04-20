import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Nav, NavItem } from 'reactstrap';
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

  useEffect(() => {
    axios.get('http://localhost:5000/api/getall')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedRole === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.role === selectedRole);
      setFilteredUsers(filtered);
    }
  }, [selectedRole, users]);

  
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.address && user.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.mobile && user.mobile.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.grade && user.grade.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleFilterByRole = (role) => {
    setSelectedRole(role);
  };

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

      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleButtonClick = async (userId, email, firstName, lastName) => {
    try {
      const currentDate = new Date(); // Get current date
      const updatedUser = await axios.put(`http://localhost:5000/api/update/${userId}`, {
        isPayer: true,
        datePay: currentDate
        
      });
  
      // Update the users state with the updated user
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? updatedUser.data : user
        )
      );
  
     
    } catch (error) {
      console.error("Error updating user or sending email:", error);
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
            <th className='px-4 text-center'>Grade</th>
            <th className='px-4 text-center' style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-top">
              <td style={{ width: '30%' }}>
                <div className="d-flex align-items-center p-2">
                  <img
                    src={user.profile || user1}
                    className="rounded-circle"
                    alt="avatar"
                    width="45"
                    height="45"
                  />
                  <div className="ms-3">
                    <h5 className="mb-0 fw-medium">{user.firstName} {user.lastName}</h5>
                    <span className="text-muted">{user.email}</span>
                  </div>
                </div>
              </td>
              <td className="text-center">{formatDate(user.dateNaiss)}</td>
              <td style={{ width: '40%' }} className="text-center">{user.address}</td>
              <td className="text-center">{user.mobile}</td>
              <td className="text-center">{user.role}</td>
              <td className="text-center">
              {user.role === 'student' && (
  user.isPayer ? (
    <Button
      className="btn"
      outline
      color="success"
      onClick={() => handleButtonClick(user._id, user.email, user.firstName, user.lastName)}
    >
      Yes
    </Button>
  ) : (
    <Button
      className="btn"
      outline
      color="danger"
      onClick={() => handleButtonClick(user._id, user.email, user.firstName, user.lastName)}
    >
      No
    </Button>
  )
)}

              </td>
              <td className="text-center">{user.grade}</td>
              <td className="text-center">
                <Button onClick={() => handleUpdate(user._id)}>
                  <FiEdit size={20} />
                </Button>{' '}
                <Button onClick={() => handleDelete(user._id)}>
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
