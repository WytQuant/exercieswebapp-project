import "./UpdateActivity.css";
import { useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";

const UpdateActivity = ({ isClick, setIsClick, activity }) => {
  const [updateActivity, setUpdateActivity] = useState({
    activityName: activity.activityName,
    description: activity.description,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  });

  const handleClickToClose = async () => {
    setIsClick(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUpdateActivity({ ...updateActivity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClick(false);
  };

  return (
    // <div>
    <div className={isClick ? "hr__update-act action" : "hr__update-act"}>
      <h2 className='update-title'>UpdateActivity</h2>
      <form className='update-form' onSubmit={handleSubmit}>
        <div>
          <label className='hr__add-label' htmlFor='hr__duration'>
            Activity name:
          </label>
          <input
            id='hr__actName'
            type='text'
            placeholder='Enter your activity name'
            name='activityName'
            value={updateActivity.activityName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='hr__add-label' htmlFor='hr__duration'>
            Description:
          </label>
          <textarea
            placeholder='Enter your activity desciption'
            name='description'
            value={updateActivity.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='hr__add-label' htmlFor='hr__duration'>
            Activity Type :
          </label>
          <select
            id='hr__actTypes'
            name='type'
            value={updateActivity.type}
            onChange={handleChange}
          >
            <option value=''>Select type...</option>
            <option value='Run'>Run</option>
            <option value='Bicycle ride'>Bicycle ride</option>
            <option value='Swim'>Swim</option>
            <option value='Walk and hike'>Walk and hike</option>
          </select>
        </div>
        <div>
          <label className='hr__add-label' htmlFor='hr__duration'>
            Duration :
          </label>
          <input
            id='hr__duration'
            type='number'
            placeholder='Exercise time in minute'
            name='duration'
            value={updateActivity.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='hr__add-label'>Date :</label>
          <input
            id='hr__inputDate'
            name='date'
            type='date'
            value={updateActivity.date}
            onChange={handleChange}
          />
        </div>
        <button className='hr__submit'>Update now!!</button>
      </form>
      <DeleteButton onClick={handleClickToClose} />
    </div>
    // </div>
  );
};

export default UpdateActivity;
