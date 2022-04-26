import React, { useState } from 'react';
import axios from 'axios';
import { client } from '../api/index';
import Swal from 'sweetalert2';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [activitiesData, setActivitesData] = useState([]);

  //------------------------------ Get user data & Logout-----------------------------
  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'https://heartrate-backend.vercel.app/users/me',
    })
      .then((res) => {
        sessionStorage.setItem('username', res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    setActivitesData([]);
    sessionStorage.clear();
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
        setActivitesData(response.data.reverse());
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
    await getActivitiesData();
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: 'Your activity has been added.',
    });
  };

  // remove data function is used on ActivityCard component
  const removeData = async (username, id) => {
    await client.delete(`/users/me/records/${username}/${id}`);
    await getActivitiesData();
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Your activity has been deleted.',
    });
  };

  // Updating data
  const updatedData = async (newData) => {
    await client.put(`users/me/records/update`, {
      ...newData,
    });
    await getActivitiesData();
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Your activity has been updated.',
    });
  };

  // provided value to consummer
  const value = {
    activitiesData,
    getActivitiesData,
    removeData,
    addData,
    getUser,
    updatedData,
    logOut,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
