// Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Password change failed.");
      } else {
        setMessage("Password changed successfully.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const response = await fetch('/api/delete-account', { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Account deletion failed.");
      } else {
        // After deletion, navigate to the home or auth page
        navigate('/auth');
      }
    } catch (err) {
      setMessage("Network error.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      <button onClick={handleDeleteAccount} style={{ marginTop: '20px', background: 'red', color: 'white' }}>
        Delete Account
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
