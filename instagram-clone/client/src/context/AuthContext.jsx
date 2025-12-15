import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const currentUserId = localStorage.getItem('currentUserId');
      const user = registeredUsers.find(u => u.id === currentUserId);
      
      if (user) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token }
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserId');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = existingUsers.find(u => u.email === email);
      
      if (!user) {
        dispatch({ type: 'AUTH_FAIL', payload: 'No account found with this email. Please sign up first.' });
        return { success: false, message: 'No account found' };
      }
      
      if (user.password !== password) {
        dispatch({ type: 'AUTH_FAIL', payload: 'Incorrect password. Please try again.' });
        return { success: false, message: 'Incorrect password' };
      }
      
      const fakeToken = 'demo-jwt-token-' + Date.now();
      
      localStorage.setItem('currentUserId', user.id);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: user,
          token: fakeToken
        }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Login failed' });
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (formData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const email = formData.get('email');
      const username = formData.get('username');
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === email || u.username === username);
      
      if (userExists) {
        const message = userExists.email === email ? 
          'Account already exists with this email. Please log in instead.' :
          'Username already taken. Please choose a different username.';
        dispatch({ type: 'AUTH_FAIL', payload: message });
        return { success: false, message: 'Account already exists' };
      }
      
      const newUser = {
        id: 'user-' + Date.now(),
        username: username,
        email: email,
        fullName: formData.get('fullName'),
        password: formData.get('password'),
        profilePicture: '/src/assets/user1.jpg'
      };
      
      // Save user to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      localStorage.setItem('currentUserId', newUser.id);
      
      const fakeToken = 'demo-jwt-token-' + Date.now();
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: newUser,
          token: fakeToken
        }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Registration failed' });
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUserId');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};