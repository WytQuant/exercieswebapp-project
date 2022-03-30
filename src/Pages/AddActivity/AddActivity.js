import React, { useState } from 'react'
import './AddActivity.css'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import AddButton from '../../Components/AddButton/AddButton'

const AddActivity = ({ isClick, setIsClick }) => {

    const [formData, setFormData] = useState({
        activityName: '',
        description: '',
        type: '',
        duration: '',
        date: ''
    })

    const [isFormNotOk, setIsFormNotOk] = useState(false)

    const handleClick = () => {
        setIsClick(false)
    }
    //---------- Validate from----------------

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value
        setFormData(prevData => ({...prevData, [name]: value}))
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsClick(false)
        setFormData({
            activityName: '',
            description: '',
            type: '',
            duration: null,
            date: ''
        })
    }
    
    const styles = {
        color: "red",
        fontSize: 12,
        marginBottom: 8
    }

    return (
        <div className={isClick ? 'hr__addAct action' : 'hr__addAct'}>
            <form onSubmit={handleSubmit}>
                <label for="hr__actName">Activity Name :</label>
                <input name="activityName" id="hr__actName" type=
                "text" placeholder='Enter your activity name' value={formData.activityName} onChange={handleChange}/>

                <label for="hr__descrip">Description :</label>
                <textarea id="hr__descrip" rows="3" placeholder='What are you looking for ?' name="description" value={formData.description} onChange={handleChange}/>

                <label for="hr__actTypes">Activity Type :</label>
                <select id="hr__actTypes" name="type" value={formData.type} onChange={handleChange}>
                    <option value="">------- Select your activity type -------</option>
                    <option value="Run">Run</option>
                    <option value="Bicycle ride">Bicycle ride</option>
                    <option value="Swim">Swim</option>
                    <option value="Walk and hike">Walk and hike</option>
                </select>

                <label for="hr__duration">Duration :</label>
                <input id="hr__duration" type="number" placeholder='Exercise time' name="duration" value={formData.duration} onChange={handleChange}/>

                <label>Date :</label>
                <input id="hr__inputDate" name="date" type="text" value={formData.date} placeholder="YYYY-MM-DD" onChange={handleChange}/>

                <button className='hr__submit'>Submit</button>
            </form>
            <DeleteButton onClick={handleClick}/>
        </div>
    )
}

export default AddActivity;
