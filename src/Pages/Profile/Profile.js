import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import UserProfile from "../../Components/UserProfile/UserProfile";
import Navbar from "../../Components/Navbar/Navbar";
import ActivitiyCard from "../../Components/ActivityCard/ActivityCard";
import { Context } from "../../Context/Context";
import AddActivity from "../../Components/AddActivity/AddActivity";
import AddButton from "../../Components/AddButton/AddButton";
import Loading from "../../Components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

function Profile() {
  const { activitiesData, getActivitiesData } = useContext(Context);
  const [isFirstSignin, setIsfirstSignin] = useState(true);

  AOS.init({
    duration: 1000,
    easing: "ease",
  });

  useEffect(() => {
    (async () => {
      await getActivitiesData();
      setIsfirstSignin(false);
    })();

    //eslint-disable-next-line
  }, []);

  // ---------------- add activity section --------------- //
  const [isClickAdd, setIsClickAdd] = useState(false);

  const addActivity = () => {
    setIsClickAdd(true);
  };

  const hasActivitiesData = activitiesData.length > 0;
  const listOFActivities = activitiesData.slice(0, 6);

  return (
    <>
      {isFirstSignin && !hasActivitiesData ? (
        <Loading title={"Activity records"} />
      ) : (
        <>
          <Navbar />
          <div className='hr__homeheader activity-background'>
            <div className='hr__homeheader-content' data-aos='fade-right'>
              <p>Activities</p>
              <h1 className='animation-underline'>Activities record.</h1>
            </div>
          </div>
          <div className='hr__homepage'>
            <div className='hr__homepage-profile'>
              <UserProfile />
            </div>
            <div className='hr__todoAct'>
              <div className='hr__addButton-act'>
                <h1 className='hr__title'>Your Activities</h1>
                <AddButton onClick={addActivity} />
              </div>
              <div
                className={
                  hasActivitiesData ? "hr__card-list" : "hr__cart-list_empty"
                }
              >
                {hasActivitiesData ? (
                  listOFActivities.map((activity) => {
                    return (
                      <ActivitiyCard key={activity.id} activity={activity} />
                    );
                  })
                ) : (
                  <p>There are no activities.</p>
                )}
              </div>
            </div>
            <AddActivity isClick={isClickAdd} setIsClick={setIsClickAdd} />
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
