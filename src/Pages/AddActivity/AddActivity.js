import React, { useState, useContext } from 'react'
import './AddActivity.css'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import { Context } from '../../Context'
import Axios from 'axios'

const AddActivity = ({ isClick, setIsClick }) => {

    const {addData} = useContext(Context);

    const [formData, setFormData] = useState({
        activityName: {
            value: '',
            isError: false
        },
        description: {
            value: '',
            isError: false
        },
        type: '',
        duration: '',
        date: ''
    });
    
    const {
        activityName,
        description,
        type,
        duration,
        date
    } = formData;


    const handleClick = () => {
        setIsClick(false)
        setFormData({
            activityName: {
                value: '',
                isError: false
            },
            description: {
                value: '',
                isError: false
            },
            type: '',
            duration: '',
            date: ''
        })
    }

    const handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        
        const checkedLength = inputValue.trim().length

        //---------- Validate form----------------
        const updatedFormData = {...formData};

        if (inputName === 'activityName' || inputName === 'description') {
            const minLength = inputName === 'activityName' ? 4 : 10
            if (checkedLength <= minLength && checkedLength > 0) {
                updatedFormData[inputName].isError = true
            } else {
                updatedFormData[inputName].isError = false
            }
            updatedFormData[inputName].value = inputValue;
            return setFormData(updatedFormData);
        }

        return setFormData(prevData => ({...prevData, [inputName]: inputValue}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addData({
            activityName: activityName.value,
            description: description.value,
            type: type,
            duration: duration,
            date: date
        })
        setIsClick(false)
        setFormData({
            activityName: {
                value: '',
                isError: false
            },
            description: {
                value: '',
                isError: false
            },
            type: '',
            duration: '',
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
                <label htmlFor="hr__actName">Activity Name :</label>
                <input name="activityName" id="hr__actName" type=
                "text" placeholder='Enter your activity name' value={activityName.value} onChange={handleChange}/>
                {activityName.isError && <p style={styles}>Activity name shoud contains more than 4 character</p>}

                <label htmlFor="hr__descrip">Description :</label>
                <textarea id="hr__descrip" rows="3" placeholder='What are you looking for ?' name="description" value={description.value} onChange={handleChange}/>
                {description.isError && <p style={styles}>Description shoud contains more than 10 character</p>}

                <label htmlFor="hr__actTypes">Activity Type :</label>
                <select id="hr__actTypes" name="type" value={type} onChange={handleChange}>
                    <option value="">Select type...</option>
                    <option value="Run">Run</option>
                    <option value="Bicycle ride">Bicycle ride</option>
                    <option value="Swim">Swim</option>
                    <option value="Walk and hike">Walk and hike</option>
                </select>

                <label htmlFor="hr__duration">Duration :</label>
                <input id="hr__duration" type="number" placeholder='Exercise time' name="duration" value={duration} onChange={handleChange}/>

                <label>Date :</label>
                <input id="hr__inputDate" name="date" type="date" value={date} onChange={handleChange}/>

                <button className='hr__submit'>Submit</button>
            </form>
            <DeleteButton onClick={handleClick}/>
        </div>
    )
}

export default AddActivity;
