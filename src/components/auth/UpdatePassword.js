// components/auth/UpdatePassword.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);

  const { updatePassword } = useContext(AuthContext);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert('New passwords do not match');
      setSuccess(false);
    } else {
      const result = await updatePassword({
        currentPassword,
        newPassword
      });
      
      if (result) {
        setSuccess(true);
        setAlert(null);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setSuccess(false);
      }
    }
  };

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      {alert && <div className="alert alert-danger">{alert}</div>}
      {success && <div className="alert alert-success">Password updated successfully!</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="auth-button">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
