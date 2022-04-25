import React, { useState } from 'react';
import axios from 'axios';
import { client } from '../api/index';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [activitiesData, setActivitesData] = useState([]);

  //------------------------------ Get user data -----------------------------
  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'https://heartrate-backend.vercel.app/users/me',
    })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('username', res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //------------------------------ CRUD function for implementation from database -----------------
  //created new a piece of data and this function is used on AddActivity Pages
  // get activitiesData
  const getActivitiesData = async () => {
    try {
      const response = await axios({
        method: 'POST',
        data: {
          username: sessionStorage.getItem('username'),
        },
        withCredentials: true,
        url: 'https://heartrate-backend.vercel.app/users/me/records',
      });

      if (response.status < 300) {
        setActivitesData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // create activitiesData
  const addData = async (newData) => {
    await client.post('/users/me/records/create', {
      ...newData,
      username: sessionStorage.getItem('username'),
    });
    getActivitiesData();
  };

  // remove data function is used on ActivityCard component
  const removeData = async (username, id) => {
    await client.delete(`/users/me/records/${username}/${id}`);
    getActivitiesData();
  };

  // Updating data
  const updatedData = async (newData) => {
    await client.put(`users/me/records/update`, {
      ...newData,
    });
    getActivitiesData();
  };

  // provided value to consummer
  const value = {
    activitiesData,
    getActivitiesData,
    removeData,
    addData,
    getUser,
    updatedData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
