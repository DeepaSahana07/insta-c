import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
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

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate successful login for demo
      const fakeUser = {
        id: 'demo-user',
        username: 'sahana_8607',
        email: email,
        fullName: 'Deepa Sahana'
      };
      
      const fakeToken = 'demo-jwt-token-' + Date.now();
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: fakeUser,
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
      
      // Simulate successful registration for demo
      const fakeUser = {
        id: 'demo-user',
        username: formData.get('username') || 'new_user',
        email: formData.get('email'),
        fullName: formData.get('fullName')
      };
      
      const fakeToken = 'demo-jwt-token-' + Date.now();
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: fakeUser,
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