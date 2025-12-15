import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SwitchAccountModal = ({ isOpen, onClose }) => {
  const { user, login } = useAuth();
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return allUsers.filter(u => u._id !== user?._id);
  });

  const handleSwitchAccount = async (selectedUser) => {
    try {
      await login(selectedUser.email, selectedUser.password);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Switch account failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="switch-modal" onClick={e => e.stopPropagation()}>
        <div className="switch-modal-header">
          <h3>Switch accounts</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="switch-accounts-list">
          {registeredUsers.map(regUser => (
            <div 
              key={regUser._id}
              className="switch-account-item"
              onClick={() => handleSwitchAccount(regUser)}
            >
              <img 
                src={regUser.profilePicture} 
                alt={regUser.username} 
                className="switch-account-avatar"
                onError={(e) => {
                  e.target.src = `https://i.pravatar.cc/150?u=${regUser.username}`;
                }}
              />
              <div className="switch-account-info">
                <div className="switch-account-username">{regUser.username}</div>
                <div className="switch-account-fullname">{regUser.fullName}</div>
              </div>
            </div>
          ))}
          
          <div 
            className="switch-account-item add-account"
            onClick={() => window.location.href = '/register'}
          >
            <div className="add-account-icon">+</div>
            <div className="switch-account-info">
              <div className="switch-account-username">Add account</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchAccountModal;