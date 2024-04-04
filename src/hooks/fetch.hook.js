import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername } from '../helper/helper';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Custom hook */
export default function useFetch(query) {
  const [data, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, isLoading: true }));
        
        // Obtenir le nom d'utilisateur de manière synchrone
        const decode = !query ? await getUsername() : '';
        const username = decode.username;
        console.log('Username:', username);
  
        const response = !query ? await axios.get(`api/user/${username}`) : await axios.get(`api/user/${query}`);
        const { data, status } = response;
        console.log('API Response:', response);
  
        if (status === 200 || status === 201) {
          setData(prev => ({ ...prev, apiData: data, status: status }));
        } else {
          // Gérer d'autres statuts si nécessaire
          setData(prev => ({ ...prev, serverError: `Request failed with status: ${status}` }));
        }
      } catch (error) {
        setData(prev => ({ ...prev, serverError: error.message }));
      } finally {
        setData(prev => ({ ...prev, isLoading: false }));
        console.log('Updated apiData:', data.apiData);
      }
    };
  
    fetchData();
  }, [query]); // Ajoutez profileUpdated ici
  

  return [data, setData ];
}

