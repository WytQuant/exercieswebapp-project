import React, {useState, useContext} from 'react'
import './ActivityCard.css'
import { RiRunFill } from 'react-icons/ri'
import {dataContext} from '../../DataContext'
import DeleteButton from '../DeleteButton/DeleteButton'

function ActivitiyCard({activity}) {
    const {removeData} = useContext(dataContext)

    const [hovered, setHovered] = useState(false)

    // const [removeCard, setRemoveCard] = useState(false)

    const handleOver = () => {
        setHovered(true)
    }

    const handleLeave = () => {
        setHovered(false)
    }

    const handleClick = () => {
        // setRemoveCard(prevValue => !prevValue)
        removeData(activity.id)
    }

    return (
        <div className='hr__card-act'
            onMouseOver={handleOver}
            onMouseLeave={handleLeave}
        >
            <span><RiRunFill /></span>
            <div className="hr__card-content">
                <p>Name: {activity.name}</p>
                <p>Description: {activity.description}</p>
                <p>Activitiy type: {activity.type}</p>
                <p>Duration: {activity.duration} Min</p>
                <p>{activity.date}</p>
            </div>
            {hovered && <DeleteButton onClick={handleClick}/>}
        </div>
    );
}

export default ActivitiyCard;