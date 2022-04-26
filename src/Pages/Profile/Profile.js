import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../../Components/Navbar/Navbar';
import ActivitiyCard from '../../Components/ActivityCard/ActivityCard';
import { Context } from '../../Context/Context';
import AddActivity from '../../Components/AddActivity/AddActivity';
import AddButton from '../../Components/AddButton/AddButton';
import Loading from '../../Components/Loading/Loading';
import Footer from '../../Components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Profile() {
  const { activitiesData, getActivitiesData } = useContext(Context);
  const [isFirstSignin, setIsfirstSignin] = useState(true);

  AOS.init({
    duration: 1000,
    easing: 'ease',
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

  return (
    <>
      {isFirstSignin && !hasActivitiesData ? (
        <Loading title={'Activity records'} />
      ) : (
        <>
          <Navbar />
          <div id='header-top' className='hr__homeheader activity-background'>
            <div className='hr__homeheader-content' data-aos='fade-right'>
              <p>Activities</p>
              <h1 className='header-title-act animation-underline'>
                Activities record.
              </h1>
            </div>
          </div>
          <div className='hr__homepage'>
            <div className='hr__list-activity'>
              <div className='hr__addbutton-act'>
                <h1 className='hr__title'>Your Activities</h1>
                <AddButton onClick={addActivity} />
              </div>
              <div
                className={
                  hasActivitiesData ? 'hr__card-list' : 'hr__cart-list_empty'
                }
              >
                {hasActivitiesData ? (
                  activitiesData.map((activity) => {
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
          <Footer />
        </>
      )}
    </>
  );
}

export default Profile;
