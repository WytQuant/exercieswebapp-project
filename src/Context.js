import React, { useState, useEffect } from 'react'
import {client, fetchData } from './api';

const Context = React.createContext()

function ContextProvider({children}) {
  const [activitiesData, setActivitesData] = useState([]);
  const [reFetchData, setRefetchData] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchData();

      if (response.status < 300 && reFetchData) {
        setActivitesData(response.data);
        setRefetchData(false);
      } else {
        console.log('Cannot access data base. Please check you connection DBs')
      }
    })()
  }, [reFetchData]);

  //created new a piece of data
  const addData = async (newData) => {
    const postData = await client.post('/users/me/records', newData);
    setRefetchData(true);
  }

  // reverse list of data for removing a piece of data
  const removeData = async (id) => {
    const deleteData = await client.delete(`/users/me/records/${id}`);
    setRefetchData(true);
  }
  
  return (
    <Context.Provider value={{activitiesData, removeData, addData}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}