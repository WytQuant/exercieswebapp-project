import React, { useState, useContext } from "react";
import "./ActivityCard.css";
import { RiRunFill } from "react-icons/ri";
import { Context } from "../../Context/Context";
import DeleteButton from "../DeleteButton/DeleteButton";

function ActivitiyCard({ activity }) {
  const { removeData } = useContext(Context);

  // const [updateInfo, setUpdateInfo] = useState(false);
  const [hovered, setHovered] = useState(false);

  //update infomation section
  // const handleClicktoUpdate = () => {
  //   setUpdateInfo(true);
  // };

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

  // Tranformation inputed date to yyyy-mm-dd format
  const onlyDate = (string) => {
    const res = string.match(/\d{4}-\d{2}-\d{1,2}/);
    return res[0];
  };

  return (
    <div
      className='hr__card-act'
      onMouseOver={handleOver}
      onMouseLeave={handleLeave}
    >
      <span>
        <RiRunFill />
      </span>
      <div className='hr__card-content'>
        <p>Name: {activity.activityName}</p>
        <p>Description: {activity.description}</p>
        <p>Activitiy type: {activity.type}</p>
        <p>Duration: {activity.duration} Min</p>
        <p>Date: {onlyDate(activity.date)}</p>
      </div>
      {hovered && <DeleteButton onClick={handleClicktoDelete} />}
    </div>
  );
}

export default ActivitiyCard;
