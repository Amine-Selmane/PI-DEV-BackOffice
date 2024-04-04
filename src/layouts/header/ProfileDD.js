import React, { useState, useEffect } from 'react';
import { DropdownItem } from 'reactstrap';
import { User } from 'react-feather';
import axios from 'axios'; // Import Axios for making HTTP requests
import {  useNavigate } from 'react-router-dom';

import img1 from '../../assets/images/users/user4.jpg';

const ProfileDD = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  async function handleProfileClick() {
    
        navigate('/sample-pages/profile');
       
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/userToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData && (
        <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
          <img src={userData.profile || img1} alt="user" className="rounded-circle" width="55" />
          <span>
            <h5 className="mb-0 fw-medium">{userData.username}</h5>
            <small className="text-muted">{userData.email}</small>
          </span>
        </div>
      )}
      <DropdownItem className="px-4 py-3" onClick={handleProfileClick}>
        <User size={20} className="text-muted" />
        &nbsp; My Profile
      </DropdownItem>
      
     
     
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
