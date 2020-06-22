import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import UtilButton from '../Util-components/Util-button';

import { uploadProfile, uploadPicture } from '../../redux/actions/profile-action';

const INITIAL_STATE = {
  bday: '',
  occupation: '',
  introduction: '',
  picture: undefined,
};

const UploadProfilePage = ({ profile, uploadProfile, uploadPicture, history }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { bday, occupation, introduction, picture } = formData;

  useEffect(() => {
    profile && setFormData({ ...profile, bday: moment.utc(profile.bday).format('MM/DD/YYYY') });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadProfile({ bday, occupation, introduction });
    // if (picture) uploadPicture(picture);
    console.log(picture);
    setFormData({ ...INITIAL_STATE });
    history.push('/userinfo');
  };

  return (
    <Fragment>
      <h1>
        <i className='fas fa-user-cog'></i> UPLOAD PROFILE
      </h1>
      <form className='form'>
        <div className='form-group'>
          <UtilButton purpose='back' pushUrl='/userinfo' />
          <input
            className='form-input'
            name='bday'
            type='text'
            value={bday}
            onChange={handleChange}
            placeholder='DOB(MM/DD/YYYY)'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            name='occupation'
            type='text'
            value={occupation}
            onChange={handleChange}
            placeholder='Occupation'
          />
        </div>
        <div className='form-group'>
          <textarea
            className='form-input'
            name='introduction'
            type='text'
            value={introduction}
            onChange={handleChange}
            placeholder='Introduce yourself briefly'
            rows='4'
          />
        </div>
        {/**
          <div className='form-group'>
          <input
          className='form-input bg-light'
          name='picture'
          type='file'
          value={picture}
          onChange={handleChange}
          />
          </div>
        */}
        <div className='form-group'>
          <div className='btn bg-main btn-lg' onClick={handleSubmit}>
            SAVE PROFILE
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
});

const mapDispatchToProps = (dispatch) => ({
  uploadProfile: ({ bday, occupation, introduction }) =>
    dispatch(uploadProfile({ bday, occupation, introduction })),
  uploadPicture: (picture) => dispatch(uploadPicture(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfilePage);
