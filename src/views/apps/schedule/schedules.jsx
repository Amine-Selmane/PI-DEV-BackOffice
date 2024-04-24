import React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker, DatePicker, TimePicker } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';


const Schedules = () => {

  const [showSelect, setShowSelect] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [message, setMessage] = useState(3);

  const [selectedTeachers, setSelectedTeachers] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [scheduleData, setScheduleData] = useState({
    dateValue: null,
    heureDebut: null,
    heureFin: null,
    teachers: [],
    students: []
  });

  
 
  
  // const fetchUsers = async () => {
  //     const res = await axios.get('http://localhost:5000/api/getall');
  //     setUsers(res.data);
  //   }; 

  useEffect(() => {
    if (scheduleData.dateValue != null
      && scheduleData.heureDebut != null
      && scheduleData.heureFin != null) {
      if (!showSelect) {
        getAvailability(scheduleData.dateValue.format("dddd").toLowerCase(),
          scheduleData.heureDebut.format('HH:mm'),
          scheduleData.heureFin.format('HH:mm'));
      }
    }
  }, [scheduleData, showSelect])

  const getAvailability = async (jour, heureDebut, heureFin) => {
    try {
      const res = await axios.get(`http://localhost:5000/scheduleSessions/available`, {
        params: {
          jour: jour,
          heureDebut: heureDebut,
          heureFin: heureFin
        },
      })

      if (res.data.students.length !== 0) {
        setScheduleData((prevFormData) => ({
          ...prevFormData,
          students: res.data.students
        }));
        setAvailability(true);
      }

      if (res.data.teachers.length !== 0) {
        setScheduleData((prevFormData) => ({
          ...prevFormData,
          teachers: res.data.teachers
        }));
        setAvailability(true);
      }


      if (availability) {
        setShowSelect(true);
      } else {
        setShowSelect(false);
      }

      toast(res.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const addSchdule = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      teacher: selectedTeachers,
      students: selectedStudents,
      startDateTime: scheduleData.heureDebut.format('HH:mm'),
      endDateTime: scheduleData.heureFin.format('HH:mm'),
      day: scheduleData.dateValue.format("dddd").toLowerCase()
    });
    //console.log(body);
    await axios.post(`http://localhost:5000/scheduleSessions`, body, config)
      .then((res) => {
        toast(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setAvailability(false);
        setScheduleData({
          dateValue: null,
          heureDebut: null,
          heureFin: null,
          teachers: [],
          students: []
        })
      }).catch((err) => {
        console.log(err);
      })
  }

  const handleClick = async () => {
    try {
      await addSchdule();

    } catch (error) {
      
      console.error("Error adding schedule:", error);
     
      toast.error('An error occurred while adding the schedule.', {
        
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DesktopTimePicker']}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} md={4}>
            <DatePicker label="Day"
              value={scheduleData.dateValue}
              onChange={(newDate) => {
                setScheduleData((prevFormData) => ({
                  ...prevFormData,
                  dateValue: newDate
                }));
                setShowSelect(false)
              }}
            />
          </Grid>
          <Grid item xs={2} md={4}>
            <TimePicker
              label="Start Time"
              value={scheduleData.heureDebut}
              ampm={false}
              onChange={(newValue) => {
                setScheduleData((prevFormData) => ({
                  ...prevFormData,
                  heureDebut: newValue
                }));
                setShowSelect(false)
              }}
            />
          </Grid>
          <Grid item xs={2} md={4}>
            <TimePicker
              label="End Time"
              value={scheduleData.heureFin}
              ampm={false}
              onChange={(newValue) => {
                setScheduleData((prevFormData) => ({
                  ...prevFormData,
                  heureFin: newValue
                }));
                setShowSelect(false)
              }}
            />
          </Grid>

          {availability && (
            showSelect && (
              <>
                <Grid item xs={2} md={4}>
                  {scheduleData.students.length !== 0 &&
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Students</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={selectedStudents}
                        multiple
                        onChange={(newData) => {
                          setSelectedStudents(newData.target.value);
                          console.log(selectedStudents);
                        }}
                      >
                        {scheduleData.students.map((user, index) => (
                          <MenuItem
                            key={index}
                            value={user._id}
                          >
                            {user.firstName} {user.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }
                </Grid>

                <Grid item xs={2} md={4}>
                  {scheduleData.teachers.length !== 0 &&
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Teachers</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={selectedTeachers}
                        onChange={(newData) => {
                          setSelectedTeachers(newData.target.value);
                          console.log(selectedTeachers);
                        }}
                      >
                        {scheduleData.teachers.map((user, index) => (
                          <MenuItem
                            key={index}
                            value={user._id}
                          >
                            {user.firstName} {user.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button className='primary' onClick={handleClick}>Submit Class Schedule</Button>
                  
                </Grid>
              </>
              
            )
          )}

        </Grid>
      </DemoContainer>

      
    </LocalizationProvider>
    
  );
};

export default Schedules;
