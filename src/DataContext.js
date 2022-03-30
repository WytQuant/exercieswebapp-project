import React, { useState } from 'react'
import { data } from './dataMock' 

const dataContext = React.createContext()

function DataContextProvider({children}) {
  const [activitiesData, setActivitesData] = useState(data)

  const removeData = (id) => {
    setActivitesData(activitiesData.filter(activity => {
      return activity.id !== id
    }))
  }

  return (
    <dataContext.Provider value={{activitiesData, removeData}}>
      {children}
    </dataContext.Provider>
  )
}

export {DataContextProvider, dataContext}