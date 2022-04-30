import React, { useState, useContext, useEffect } from 'react';
import './AddActivity.css';
import DeleteButton from '../../Components/DeleteButton/DeleteButton';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

const AddActivity = ({ isClick, setIsClick }) => {
  const { addData } = useContext(Context);

  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    type: '',
    duration: '',
    date: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleClick = () => {
    setIsClick(false);
    setFormData({
      activityName: '',
      description: '',
      type: '',
      duration: '',
      date: '',
    });
    setFormErrors({});
    setCanSubmit(false);
  };

  useEffect(() => {
    setFormErrors(validate(formData));
    const doCompleteFillout = Object.values(formData).every(
      (value) => value !== ''
    );
    if (doCompleteFillout) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [formData]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData({
      ...formData,
    });
    setIsClick(false);
    setFormData({
      activityName: '',
      description: '',
      type: '',
      duration: '',
      date: '',
    });
    setCanSubmit(false);
    Swal.fire({
      title: 'Please wait a second, the activity is being added...',
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
    <div className={isClick ? 'hr__add-act action' : 'hr__add-act'}>
      <div className='hr__add-input'>
        <h2 className='add-title'>Add Activity</h2>
        <form className='add-act-form' onSubmit={handleSubmit}>
          <label className='hr__add-label' htmlFor='hr__actName'>
            Activity Name :
          </label>
          <input
            name='activityName'
            id='hr__actName'
            type='text'
            placeholder='Enter your activity name'
            value={formData.activityName}
            onChange={handleChange}
          />
          <p className='validate-error-add-update'>{formErrors.activityName}</p>

          <label className='hr__add-label' htmlFor='hr__descrip'>
            Description :
          </label>
          <textarea
            id='hr__descrip'
            rows='3'
            placeholder='Enter your desciption here'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          <p className='validate-error-add-update'>{formErrors.description}</p>

          <label className='hr__add-label' htmlFor='hr__actTypes'>
            Activity Type :
          </label>
          <select
            id='hr__actTypes'
            name='type'
            value={formData.type}
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

          <label className='hr__add-label'>Date :</label>
          <input
            id='hr__inputDate'
            name='date'
            type='date'
            value={formData.date}
            onChange={handleChange}
          />
          <p className='validate-error-add-update error-type-du-date'>
            {formErrors.date}
          </p>

          <label className='hr__add-label' htmlFor='hr__duration'>
            Duration :
          </label>
          <input
            id='hr__duration'
            type='number'
            placeholder='Exercise time (Unit: minute)'
            name='duration'
            value={formData.duration}
            onChange={handleChange}
          />
          <p className='validate-error-add-update error-type-du-date'>
            {formErrors.duration}
          </p>

          <button
            className={canSubmit ? 'hr__submit' : 'cannot-submit'}
            disabled={!canSubmit}
          >
            Submit
          </button>
        </form>
        <DeleteButton onClick={handleClick} />
      </div>
    </div>
  );
};

export default AddActivity;
