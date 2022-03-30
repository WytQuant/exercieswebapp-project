import React from 'react'
import './AddActivity.css'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'

const AddActivity = ({ isClick, setIsClick }) => {

    const handleClick = () => {
        setIsClick(false)
    }

  return (
    <div className={isClick ? 'hr__addAct action' : 'hr__addAct'}>
        <form>
            <label for="hr__actName">Activity Name :</label>
            <input id="hr__actName" type=
            "text" placeholder='Enter your activity name'/> 
            <label for="hr__descrip">Description :</label>
            <textarea id="hr__descrip" rows="3" placeholder='What are you looking for ?'/>
            <label for="hr__actTypes">Activity Type :</label>
            <select id="hr__actTypes">
                <option value="">------- Select your activity type -------</option>
                <option value="Run">Run</option>
                <option value="Bicycle ride">Bicycle ride</option>
                <option value="Swim">Swim</option>
                <option value="Walk and hike">Walk and hike</option>
            </select>
            <label>Date :</label>
            <input type="date" />
        </form>
        <DeleteButton onClick={handleClick}/>
    </div>
  )
}

export default AddActivity;
