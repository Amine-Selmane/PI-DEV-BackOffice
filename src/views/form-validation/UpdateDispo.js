import React, { useState , useEffect } from 'react';
//import axios from 'axios';
import { Row, Col, Button, FormGroup, Label  } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate , useParams } from 'react-router-dom'; // Import useNavigate

import ComponentCard from '../../components/ComponentCard';

const FormValidate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("Dispo ID:", id);
    fetch(`http://localhost:5000/disponibilte/ById/${id}`)
      .then(response => response.json())
      .then(data => {
        // Set the form values with fetched data
        setValue('jour', data.jour);
        setValue('heureDebut', data.heureDebut);
        setValue('heureFin', data.heureFin);
        
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching User details:', error);
        setLoading(false);
      });
  }, [id, setValue]);


  const onSubmit = (data) => {
    const updatedDispo= { jour: data.jour,heureDebut: data.heureDebut, heureFin: data.heureFin };
    console.log("Data to be sent:", updatedDispo);
    fetch(`http://localhost:5000/disponibilte/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDispo)
    }).then(() => {
      navigate('/tables/disponibilite-table');
      console.log("Disponibilite updated");
    }).catch(error => {
      console.error('Error updating Disponibilite:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  };
  return (
    
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Form Validation">
            <form onSubmit={handleSubmit(onSubmit)}>
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

export default FormValidate;
