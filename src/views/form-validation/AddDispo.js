import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../components/ComponentCard';

const AddDispo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);
  const [ setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetch('http://localhost:5000/api/getall')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const onSubmit = async (data) => {
    // Group the data in the format expected by the backend
    const disponibilites = [
      {
        jour: data.jour,
        heureDebut: data.heureDebut,
        heureFin: data.heureFin,
      }
    ];
  
    const formData = {
      disponibilites,
      utilisateur: data.utilisateur || null,
    };
  
    console.log('Form Data:', formData);
  
    try {
      const response = await fetch('http://localhost:5000/disponibilte/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/tables/disponibilite-table');

      const responseData = await response.json();
      console.log('Success:', responseData);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Form Validation">
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label className="control-Label" htmlFor="utilisateur">
                  User *
                </Label>
                <div className="mb-2">
                  <select
                    {...register('utilisateur', { required: true })}
                    onChange={(e) => setSelectedUser(e.target.value || null)}
                    className="form-control"
                  >
                    <option value="">Select User(username) </option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                  </select>
                </div>
                <span className="text-danger">{errors.utilisateur && 'User is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="jour">
                  Day *
                </Label>
                <div className="mb-2">
                  <select
                    {...register('jour', { required: true })}
                    className="form-control"
                  >
                    <option value="">Sélectionnez un jour</option>
                    <option value="lundi">Lundi</option>
                    <option value="mardi">Mardi</option>
                    <option value="mercredi">Mercredi</option>
                    <option value="jeudi">Jeudi</option>
                    <option value="vendredi">Vendredi</option>
                    <option value="samedi">Samedi</option>
                    <option value="dimanche">Dimanche</option>
                  </select>
                </div>
                <span className="text-danger">{errors.jour && 'Jour is required.'}</span>
              </FormGroup>
             
              <FormGroup>
                <Label className="control-Label" htmlFor="heureDebut">
                  Start Hour *
                </Label>
                <div className="mb-2">
                <input
                    type="text"
                    {...register('heureDebut', {
                      required: true,
                      pattern: {
                        value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Invalid time format (HH:mm)',
                      },
                    })}
                    className="form-control"
                    placeholder="HH:mm"
                  />
                </div>
                <span className="text-danger">{errors.heureDebut && 'Start Hour is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="heureFin">
                  End Hour *
                </Label>
                <div className="mb-2">
                <input
                    type="text"
                    {...register('heureFin', {
                      required: true,
                      pattern: {
                        value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Invalid time format (HH:mm)',
                      },
                    })}
                    className="form-control"
                    placeholder="HH:mm"
                  />
                </div>
                <span className="text-danger">{errors.heureFin && 'End Hour is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="button btn-info" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </form>
            <hr />
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default AddDispo;
