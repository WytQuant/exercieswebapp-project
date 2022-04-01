import React, { useState } from 'react'
import { data } from './dataMock' 

const dataContext = React.createContext()

function DataContextProvider({children}) {
  const [activitiesData, setActivitesData] = useState(data.reverse())

  //created new a piece of data
  const addData = (newData) => {
    if (!activitiesData.length) {
      newData.id = 1
    } else {
      newData.id = activitiesData[0].id + 1
    }
    return setActivitesData(prevData => ([newData, ...prevData]))
  }

  // reverse list of data for removing a piece of data
  const removeData = (id) => {
    return setActivitesData(activitiesData.filter(activity => {
      return activity.id !== id
    }))
  }
  
  return (
    <dataContext.Provider value={{activitiesData, removeData, addData}}>
      {children}
    </dataContext.Provider>
  )
}

export {DataContextProvider, dataContext}