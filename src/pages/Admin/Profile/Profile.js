import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../../../redux/Auth/AuthSlice';
import  '../../../assets/styles/profile.css'

const Profile = () => {
  const dispatch = useDispatch();
  const { admin, initializing } = useSelector((state) => state.authAdmin)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch]);
  return (
    <div className="profile-container">
      {initializing? (
        <div>Loading Profile...</div>
      ) : (
        <>
        <div className="profile-card">
          <div className='profile-avatar'>{admin?.firstName?.charAt(0)}{admin?.lastName?.charAt(0)}</div>
          <div className='profile-info'>
            <strong>{admin?.firstName}{admin?.lastName}</strong>
            <span>{admin?.role}</span>         
          </div>
        </div>
        <div className='profile-grid'>
          <div className='profile-items'>
            <span>First Name</span>
            <strong>{admin?.firstName}</strong>
          </div>
          <div className='profile-items'>
            <span>Last Name</span>
            <strong>{admin?.lastName}</strong>
          </div>
          <div className='profile-items'>
            <span>Email</span>
            <strong>{admin?.email}</strong>
          </div>
          <div className='profile-items'>
            <span>Mobile</span>
            <strong>{admin?.mobile}</strong>
          </div>
          <div className='profile-items'>
            <span>Role</span>
            <strong>{admin?.role}</strong>
          </div>
          <div className='profile-items'>
            <span>User ID</span>
            <strong>{admin?.id}</strong>
          </div>
        </div>
        </>
        
      )}

    </div>
  )
}

export default Profile