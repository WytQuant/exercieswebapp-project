import React, { useContext, useState } from 'react'; 
import './Home.css';
import Profile from '../../Components/Profile/Profile';
import ActivitiyCard from '../../Components/ActivityCard/ActivityCard';
import { dataContext } from '../../DataContext';
import AddActivity from '../AddActivity/AddActivity';
import AddButton from '../../Components/AddButton/AddButton';

function Home() {

    const {activitiesData} = useContext(dataContext)

    const [isClickAdd, setIsClickAdd] = useState(false)

    const addActivity = () => {
        setIsClickAdd(true)
    }

    const hasActivitiesData = activitiesData.length > 0;
    
    // list of first sixth items
    const listOFActivities = activitiesData.slice(0, 6);

    return (
        <div className="hr__homepage">
            <div className="hr__homepage-profile">
                <Profile />
            </div>
            <div className="hr__todoAct">
                <div className="hr__addButton-act">
                    <h1 className="hr__title">Today Activities</h1>
                    <AddButton onClick={addActivity}/>
                </div>
                <div className={ hasActivitiesData ? "hr__card-list" : "hr__cart-list_empty"}>
                    { hasActivitiesData ? listOFActivities.map(activity => {
                        return <ActivitiyCard key={activity.id} activity={activity} />
                    }) : 
                    <p>There are no activities today.</p>}
                </div>
            </div>
            <AddActivity isClick={isClickAdd} setIsClick={setIsClickAdd}/>
        </div>
    );
}

export default Home;