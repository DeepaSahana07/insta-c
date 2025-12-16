import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const SwitchAccountModal = ({ isOpen, onClose }) => {
  const { user, verifyPassword, switchAccount } = useAuth();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Fetch users from backend instead of localStorage
      fetchRegisteredUsers();
    }
  }, [isOpen]);
  
  const fetchRegisteredUsers = async () => {
    try {
      const response = await apiService.searchUsers('');
      // Filter out current user
      const otherUsers = (response.data.users || []).filter(u => u._id !== user?.id);
      setRegisteredUsers(otherUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setRegisteredUsers([]);
    }
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    setPassword('');
    setError('');
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !password) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await verifyPassword(selectedUser.email, password);
      await switchAccount(response.user, response.token);
      onClose();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    setSelectedUser(null);
    setPassword('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="switch-modal" onClick={e => e.stopPropagation()}>
        <div className="switch-modal-header">
          <h3>Switch accounts</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {!selectedUser ? (
          <div className="switch-accounts-list">
            {registeredUsers.map(regUser => (
              <div 
                key={regUser._id}
                className="switch-account-item"
                onClick={() => handleUserSelect(regUser)}
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
        ) : (
          <div className="password-verification" style={{ padding: '20px' }}>
            <button 
              onClick={handleBack}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-color)', 
                marginBottom: '20px',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img 
                src={selectedUser.profilePicture} 
                alt={selectedUser.username} 
                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{selectedUser.username}</div>
            </div>
            
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
                required
              />
              
              {error && (
                <div style={{ color: '#ed4956', fontSize: '14px', marginBottom: '10px' }}>
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !password}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: loading ? '#ccc' : 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Verifying...' : 'Switch Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchAccountModal;