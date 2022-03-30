import React from 'react'
import './AddButton.css'

const AddButton = ({ onClick }) => {
  return (
    <button className="hr__addButton" onClick={onClick}>Add activity</button>
  )
}

export default AddButton