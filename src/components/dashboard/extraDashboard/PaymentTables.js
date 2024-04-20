import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Nav, NavItem } from 'reactstrap';
import { FiUserPlus, FiEdit } from 'react-icons/fi';
import { FaArchive } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user1 from '../../../assets/images/users/user4.jpg';

const PaymentTables = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');



  const [editingUserId, setEditingUserId] = useState(null);
  const [montant, setMontant] = useState('');
  const [subscriptionType, setSubscriptionType] = useState({});

  const handleMontantChange = (event) => {
    setMontant(event.target.value);
  };

  const handleSubscriptionChange = (userId, type) => {
    setSubscriptionType((prev) => ({
      ...prev,
      [userId]: type,
    }));
  
    updateUser(userId, { annual: type });
  };
  
  

  const handleMontantBlur = async (userId) => {
    if (montant.trim() !== '') {
      try {
        await updateUser(userId, { montant });
        setMontant('');
        window.location.reload(); // Rafraîchissement de la page après la mise à jour du montant
      } catch (error) {
        console.error('Error updating montant:', error);
      }
    }
  };
  
  const handleSubscriptionBlur = async (userId) => {
    const type = subscriptionType[userId];
    if (type !== undefined) {
      try {
        await updateUser(userId, { subscriptionType: type });
        setSubscriptionType((prev) => ({
          ...prev,
          [userId]: '',
        }));
        window.location.reload(); // Rafraîchissement de la page après la mise à jour de l'abonnement
      } catch (error) {
        console.error('Error updating subscription type:', error);
      }
    }
  };
  

  const updateUser = async (userId, data) => {
    try {
      await fetch(`http://localhost:5000/api/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error('Failed to update user');
    }
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/getall')
      .then(response => {
        const students = response.data.filter(user => user.role === 'student');
        setUsers(students);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  useEffect(() => {
    if (selectedRole === 'student') {
      setFilteredUsers(users);
    } 
    
  }, [selectedRole, users]);



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };


  

 

  const handleButtonClick = async (userId, email, firstName, lastName) => {
    try {
      const currentDate = new Date(); // Get current date
      const updatedUser = await axios.put(`http://localhost:5000/api/update/${userId}`, {
        isPayer: true,
        datePay: currentDate,
      });
  
      // Update the users state with the updated user
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? updatedUser.data : user
        )
      );
  
      window.location.reload(); 
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

      <Table className="no-wrap align-middle" responsive borderless>
        <thead>
          <tr>
            <th className='px-4 text-center' style={{ width: '20%' }}>User</th>
            <th className='px-4 text-center'>Subscription type</th>
            <th className='px-4 text-center'>Amount</th>
            <th className='px-4 text-center'>Date</th>
            <th className='px-4 text-center'>Grade</th>
            <th className='px-4 text-center'>Is Payed</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
              <td className="text-center">
              {user.role === 'student' && (
  <div>
    {user.isPayer || user.annual ? (
      // Si isPayer est true ou annual n'est pas null, affiche la valeur de annual
      user.annual
    ) : (
      // Si isPayer est false et annual est null, affiche les cases à cocher
      <>
        <input
          type="checkbox"
          id={`annual-${user._id}`}
          checked={subscriptionType[user._id] === 'Annual'}
          onChange={() => handleSubscriptionChange(user._id, 'Annual')}
          onBlur={() => handleSubscriptionBlur(user._id)}
        />
        <label htmlFor={`annual-${user._id}`}>Annual</label>
        <input
          type="checkbox"
          id={`semiAnnual-${user._id}`}
          checked={subscriptionType[user._id] === 'Semi_Annual'}
          onChange={() => handleSubscriptionChange(user._id, 'Semi_Annual')}
          onBlur={() => handleSubscriptionBlur(user._id)}
        />
        <label htmlFor={`semiAnnual-${user._id}`}>Semi_Annual</label>
      </>
    )}
  </div>
)}


          </td>
          <td className="text-center" onDoubleClick={() => setEditingUserId(user._id)}>
            {editingUserId === user._id ? (
              <input
                type="text"
                value={montant}
                onChange={handleMontantChange}
                onBlur={() => handleMontantBlur(user._id)}
              />
            ) : (
              user.montant
            )}
          </td>
              <td className="text-center">{formatDate(user.datePay)}</td>
              <td className="text-center">{user.grade}</td>
              <td className="text-center">
              {user.role === 'student' && (
                user.isPayer ? (
                  <Button
                    className="btn"
                    outline
                    color="success"
                   
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

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentTables;
