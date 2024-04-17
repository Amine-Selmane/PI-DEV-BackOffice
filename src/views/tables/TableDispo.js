import React, { useEffect, useState } from 'react';
import { Button, Table, Input,Nav,NavItem } from 'reactstrap'; // Importez Input depuis 'reactstrap' pour le champ de recherche
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiEdit } from 'react-icons/fi';
import { FaArchive } from 'react-icons/fa';
import ComponentCard from '../../components/ComponentCard';

const TableDispo = () => {
  const [dispo, setDispo] = useState([]);
  const [users, setUsers] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // État pour la valeur de recherche
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDispoData = async () => {
      try {
        const dispoResponse = await fetch("http://localhost:5000/disponibilte/getall");
        const dispoResult = await dispoResponse.json();
        setDispo(dispoResult);

        const uniqueUserIds = [...new Set(dispoResult.map(item => item.utilisateur))];
        
        const usersData = {};
        await Promise.all(
          uniqueUserIds.map(async userId => {
            const userResponse = await fetch(`http://localhost:5000/api/user/ById/${userId}`);
            const userData = await userResponse.json();
            usersData[userId] = userData;
          })
        );
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDispoData();
  }, []);

  const handleUpdate = (idDispo) => {
    console.log("Update Disponibilite with ID:", idDispo);
    navigate(`/disponibilite-update/${idDispo}`);
  };

  const handleDelete = async (idDispo) => {
    console.log("Delete Disponibilite with ID:", idDispo);
    try {
      await fetch(`http://localhost:5000/disponibilte/delete/${idDispo}`, {
        method: 'DELETE'
      });

      // Remove the deleted disponibilite from the state
      setDispo(prevDispo => prevDispo.filter(dispoItem => dispoItem.idDispo !== idDispo));
    } catch (error) {
      console.error("Error deleting disponibilite:", error);
    }
  };

 // Filtrer les éléments en fonction de la valeur de recherche
const filteredDispo = dispo.filter(dispoItem => {
  const user = users[dispoItem.utilisateur];
  return (
    user &&
    (dispoItem.jour.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispoItem.heureDebut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispoItem.heureFin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
});

  return (
    <>
      <ComponentCard title="Availability Table">
        {/* Champ de recherche */}
        <Nav className="me-auto d-none d-lg-flex " navbar>
      <NavItem className="app-search ps-3">
        <Input
          type="text"
          placeholder="Search..."
          className="rounded-pill"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderColor: 'orange' }}
        />
        </NavItem>

</Nav>
<br></br>
        <Button onClick={() => navigate('/addDisponibilite')} className="mb-3">
          <FiPlusCircle size={20} className="me-2" />
          Add Availability
        </Button>
        <Table className="no-wrap align-middle" responsive borderless>
          <thead>
            <tr>
              <th className='px-4 text-center'>User</th>
              <th className='px-4 text-center'>Role</th>
              <th className='px-4 text-center'>Jour</th>
              <th className='px-4 text-center'>Heure Debut</th>
              <th className='px-4 text-center'>Heure Fin</th>
              <th className='px-4 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDispo.map((dispoItem) => (
              <tr key={dispoItem._id}>
                {users[dispoItem.utilisateur] && (
                  <>
                    <td className="text-center">{`${users[dispoItem.utilisateur].firstName} ${users[dispoItem.utilisateur].lastName}`}</td>
                    <td className="text-center">{users[dispoItem.utilisateur].role}</td>
                  </>
                )}
                 <td className="text-center"> {dispoItem.jour}</td>
                <td className="text-center">{dispoItem.heureDebut}</td>
                <td className="text-center">{dispoItem.heureFin}</td>
                <td className="text-center">
                  <Button onClick={() => handleUpdate(dispoItem._id)}>
                    <FiEdit size={20} />
                  </Button>{" "}
                  <Button onClick={() => handleDelete(dispoItem._id)}>
                    <FaArchive size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ComponentCard>
    </>
  );
};

export default TableDispo;
