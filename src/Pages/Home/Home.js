import React, { useContext, useState } from 'react'; 
import './Home.css';
import Profile from '../../Components/Profile/Profile';
import ActivitiyCard from '../../Components/ActivityCard/ActivityCard';
import { dataContext } from '../../DataContext';
import AddActivity from '../AddActivity/AddActivity';

function Home() {

    const {activitiesData} = useContext(dataContext)

    const [isClickAdd, setIsClickAdd] = useState(false)

    const addActivity = () => {
        setIsClickAdd(true)
    }

    return (
        <div className="hr__homepage">
            <div className="hr__homepage-profile">
                <Profile />

            </div>
            <div className="hr__todoAct">
                <h1 className="hr__title">Today Activities</h1>
                <div className="hr__card-list">
                    {activitiesData.map(activity => {
                        return <ActivitiyCard key={activity.id} activity={activity} />
                    })}
                </div>
                <button className="hr__addButton" onClick={addActivity}>Add activity</button>
            </div>
            <AddActivity isClick={isClickAdd} setIsClick={setIsClickAdd}/>
        </div>
    );
}

export default Home;