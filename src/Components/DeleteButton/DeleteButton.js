import React from 'react'
import './DeleteButton.css'

const DeleteButton = ({onClick}) => {
  return (
    <button className="hr__deletedAct" 
                 onClick={onClick}
            >
         X
    </button>
  )
}

export default DeleteButton