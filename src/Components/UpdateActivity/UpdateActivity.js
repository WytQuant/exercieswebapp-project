import './UpdateActivity.css';
import { useState, useContext, useEffect } from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

const UpdateActivity = ({ isClick, setIsClick, activity }) => {
  const { updatedData } = useContext(Context);
  const [updateActivity, setUpdateActivity] = useState({
    activityName: activity.activityName,
    description: activity.description,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  });
  const [formErrors, setFormErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);

  const handleClickToClose = () => {
    setIsClick(false);
  };

  useEffect(() => {
    setFormErrors(validate(updateActivity));
    const doCompleteFillout = Object.values(updateActivity).every(
      (value) => value !== ''
    );
    if (doCompleteFillout) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [updateActivity]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUpdateActivity({ ...updateActivity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClick(false);
    updatedData({
      id: activity.id,
      username: activity.username,
      ...updateActivity,
    });
    Swal.fire({
      title: 'Please wait a second, the activity is being updated...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.activityName) {
      errors.activityName = 'Activity name is required!';
    } else if (
      values.activityName.trim().length < 5 &&
      values.activityName.length > 0
    ) {
      errors.activityName =
        'Activity name must contain more thean 4 character.';
    }

    if (!values.description) {
      errors.description = 'Description is required!';
    } else if (
      values.description.trim().length < 11 &&
      values.description.length > 0
    ) {
      errors.description = 'Description must contain more than 10 character.';
    }

    if (!values.type) {
      errors.type = 'Activity type is required!';
    }

    if (!values.duration) {
      errors.duration = 'Duration is required!';
    }
    if (!values.date) {
      errors.date = 'Date is required!';
    }

    return errors;
  };

  return (
    <>
      <div className={isClick ? 'hr__update-act action' : 'hr__update-act'}>
        <div className='hr__update-input'>
          <h2 className='update-title'>Edit Activity</h2>
          <form className='update-form' onSubmit={handleSubmit}>
            <div>
              <label className='hr__add-label' htmlFor='hr__actName'>
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
              <p className='validate-error-add-update'>
                {formErrors.activityName}
              </p>
            </div>
            <div>
              <label className='hr__add-label' htmlFor='hr__descrip'>
                Description:
              </label>
              <textarea
                id='hr__descrip'
                placeholder='Enter your activity desciption'
                name='description'
                value={updateActivity.description}
                onChange={handleChange}
              />
              <p className='validate-error-add-update'>
                {formErrors.description}
              </p>
            </div>
            <div>
              <label className='hr__add-label'>Activity Type :</label>
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
              <p className='validate-error-add-update error-type-du-date'>
                {formErrors.type}
              </p>
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
              <p className='validate-error-add-update error-type-du-date'>
                {formErrors.date}
              </p>
            </div>
            <div>
              <label className='hr__add-label'>Duration :</label>
              <input
                id='hr__duration'
                type='number'
                placeholder='Exercise time in minute'
                name='duration'
                value={updateActivity.duration}
                onChange={handleChange}
              />
              <p className='validate-error-add-update error-type-du-date'>
                {formErrors.duration}
              </p>
            </div>
            <button
              className={canSubmit ? 'hr__submit' : 'cannot-submit'}
              disabled={!canSubmit}
            >
              Submit
            </button>
          </form>
          <DeleteButton onClick={handleClickToClose} />
        </div>
      </div>
    </>
  );
};

export default UpdateActivity;
