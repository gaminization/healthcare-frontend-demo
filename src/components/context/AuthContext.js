// context/AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Load user function defined within component scope
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth/user');
      
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Load user on component mount
  useEffect(() => {
    loadUser();
  }, []);

  // Register user
  // Login user
// AuthContext.js
const login = async formData => {
  try {
    const res = await axios.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      loadUser();
    }
  } catch (err) {
    console.error('Login error details:', err.response?.data);
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.response?.data?.msg || 'Server error'
    });
  }
};


// Register user
const register = async formData => {
  try {
    // Simplify headers
    const res = await axios.post('/api/auth/register', formData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    });

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });

    loadUser();
  } catch (err) {
    console.error('Register error:', err);
    dispatch({
      type: 'REGISTER_FAIL',
      payload: err.response?.data?.msg || 'Server error'
    });
  }
};

  // Update password
  const updatePassword = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put('/api/auth/password', formData, config);

      dispatch({
        type: 'PASSWORD_UPDATED',
        payload: res.data.msg
      });

      return true;
    } catch (err) {
      dispatch({
        type: 'PASSWORD_UPDATE_FAIL',
        payload: err.response.data.msg
      });
      
      return false;
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Clear errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        updatePassword,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
