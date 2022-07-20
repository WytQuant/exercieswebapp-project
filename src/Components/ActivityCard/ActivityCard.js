import React, { useState, useContext } from 'react';
import './ActivityCard.css';
import { RiRunFill } from 'react-icons/ri';
import { BiSwim } from 'react-icons/bi';
import { IoBicycle } from 'react-icons/io5';
import { FaHiking } from 'react-icons/fa';
import { Context } from '../../Context/Context';
import DeleteButton from '../DeleteButton/DeleteButton';
import UpdateActivity from '../UpdateActivity/UpdateActivity';
import Swal from 'sweetalert2';

function ActivitiyCard({ activity }) {
  const { removeData } = useContext(Context);
  const [hovered, setHovered] = useState(false);
  const [isClickUpdate, setIsClickUpdate] = useState(false);

  let activityIcon;

  if (activity.type === 'Run') {
    activityIcon = <RiRunFill />;
  } else if (activity.type === 'Swim') {
    activityIcon = <BiSwim />;
  } else if (activity.type === 'Bicycle ride') {
    activityIcon = <IoBicycle />;
  } else if (activity.type === 'Walk and hike') {
    activityIcon = <FaHiking />;
  }

  //show and hide update activity
  const handleClicktoUpdate = () => {
    setIsClickUpdate(true);
  };

  // show and hide delete button
  const handleOver = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  // Delete activity
  const handleClicktoDelete = () => {
    Swal.fire({
      title: 'Do you really want to delete this activity ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000',
      cancelButtonColor: '#B7B7B7',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeData(activity.username, activity.id);
        Swal.fire({
          title: 'Please wait a second, the activity is being deleted...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
    });
  };

  return (
    <>
      <div
        className="hr__card-act"
        onMouseOver={handleOver}
        onMouseLeave={handleLeave}
      >
        <span
          className="type-icon"
          onClick={handleClicktoUpdate}
          title="Edit Activity"
        >
          {activityIcon}
        </span>
        <div className="hr__card-content">
          <p>Name: {activity.activityName}</p>
          <p>Description: {activity.description}</p>
          <p>Activitiy type: {activity.type}</p>
          <p>Duration: {activity.duration} Min</p>
          <p>Date: {activity.date}</p>
        </div>
        {hovered && <DeleteButton onClick={handleClicktoDelete} />}
      </div>
      <UpdateActivity
        isClick={isClickUpdate}
        setIsClick={setIsClickUpdate}
        activity={activity}
      />
    </>
  );
}

export default ActivitiyCard;
