import React, { useState, useContext } from "react";
import "./ActivityCard.css";
import { RiRunFill } from "react-icons/ri";
import { BiSwim } from "react-icons/bi";
import { IoBicycle } from "react-icons/io5";
import { FaHiking } from "react-icons/fa";
import { Context } from "../../Context/Context";
import DeleteButton from "../DeleteButton/DeleteButton";
import UpdateActivity from "../UpdateActivity/UpdateActivity";

function ActivitiyCard({ activity }) {
  const { removeData } = useContext(Context);
  const [hovered, setHovered] = useState(false);
  const [isClickUpdate, setIsClickUpdate] = useState(false);

  let activityIcon;

  if (activity.type === "Run") {
    activityIcon = <RiRunFill />;
  } else if (activity.type === "Swim") {
    activityIcon = <BiSwim />;
  } else if (activity.type === "Bicycle ride") {
    activityIcon = <IoBicycle />;
  } else if (activity.type === "Walk and hike") {
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
    const text = "Do you really want to delete this activity?";
    if (window.confirm(text) === true) {
      removeData(activity.username, activity.id);
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className='hr__card-act'
        onMouseOver={handleOver}
        onMouseLeave={handleLeave}
      >
        <span
          className='type-icon'
          onClick={handleClicktoUpdate}
          title='Edit Activity'
        >
          {activityIcon}
        </span>
        <div className='hr__card-content'>
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
