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
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
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
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token }
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = existingUsers.find(u => u.email === email);
      
      if (!user) {
        dispatch({ type: 'AUTH_FAIL', payload: 'No account found with this email.' });
        return { success: false };
      }
      
      if (user.password !== password) {
        dispatch({ type: 'AUTH_FAIL', payload: 'Incorrect password.' });
        return { success: false };
      }
      
      const token = 'jwt-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Login failed' });
      return { success: false };
    }
  };

  const register = async (formData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const email = formData.get('email');
      const username = formData.get('username');
      
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === email || u.username === username);
      
      if (userExists) {
        const message = userExists.email === email ? 
          'Account already exists with this email.' :
          'Username already taken.';
        dispatch({ type: 'AUTH_FAIL', payload: message });
        return { success: false };
      }
      
      const newUser = {
        _id: 'user-' + Date.now(),
        username: username,
        email: email,
        fullName: formData.get('fullName'),
        password: formData.get('password'),
        profilePicture: '/src/assets/user1.jpg'
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      const token = 'jwt-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: newUser, token }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: 'Registration failed' });
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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