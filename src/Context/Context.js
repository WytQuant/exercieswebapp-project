import React, { useState, useEffect } from "react";
import axios from "axios";
import { client } from "../api/index";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [activitiesData, setActivitesData] = useState([]);
  const [reFetchData, setRefetchData] = useState(true);

  //------------------------------ Get user data -----------------------------
  const getUser = async () => {
    await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:4001/users/me",
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData.username !== undefined) {
      axios({
        method: "POST",
        data: {
          username: userData.username,
        },
        withCredentials: true,
        url: "http://localhost:4001/users/me/records",
      })
        .then((res) => {
          if (res.status < 300 && reFetchData) {
            setActivitesData(res.data);
            setRefetchData(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reFetchData, userData.username]);

  //------------------------------ Get News data -----------------------------
  const [listArticles, setListArticles] = useState([]);

  useEffect(() => {
    getNews();
    return () => {
      setListArticles([]);
    };
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get("http://localhost:4001/getnews");
      if (response.status !== 200) {
        console.log("Please check you url!");
      }

      setListArticles(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //------------------------------ CRUD function for implementation from database -----------------
  //created new a piece of data and this function is used on AddActivity Pages
  const addData = async (newData) => {
    await client.post("/users/me/records/create", {
      ...newData,
      username: userData.username,
    });
    setRefetchData(true);
  };

  // remove data function is used on ActivityCard component
  const removeData = async (username, id) => {
    await client.delete(`/users/me/records/${username}/${id}`);
    setRefetchData(true);
  };
  // Updating data
  const updatedData = async (username, id) => {
    await client.put(`users/me/records/${username}/${id}`);
    setRefetchData(true);
  };

  // provided value to consummer
  const value = {
    activitiesData,
    listArticles,
    removeData,
    addData,
    getUser,
    updatedData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
