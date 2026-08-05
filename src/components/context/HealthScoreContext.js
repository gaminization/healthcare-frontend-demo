// context/HealthScoreContext.js
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import healthScoreReducer from './healthScoreReducer';

export const HealthScoreContext = createContext();

const initialState = {
  healthScores: [],
  currentHealthScore: null,
  loading: true,
  error: null
};

export const HealthScoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthScoreReducer, initialState);

  // Get health scores
  const getHealthScores = async () => {
    try {
      const res = await axios.get('/api/health-scores');

      dispatch({
        type: 'GET_HEALTH_SCORES',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'HEALTH_SCORE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get single health score
  const getHealthScore = async id => {
    try {
      const res = await axios.get(`/api/health-scores/${id}`);

      dispatch({
        type: 'GET_HEALTH_SCORE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'HEALTH_SCORE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Add health score
  const addHealthScore = async healthScore => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/health-scores', healthScore, config);

      dispatch({
        type: 'ADD_HEALTH_SCORE',
        payload: res.data
      });
      
      return res.data;
    } catch (err) {
      dispatch({
        type: 'HEALTH_SCORE_ERROR',
        payload: err.response.data.msg
      });
      
      return null;
    }
  };

  // Delete health score
  const deleteHealthScore = async id => {
    try {
      await axios.delete(`/api/health-scores/${id}`);

      dispatch({
        type: 'DELETE_HEALTH_SCORE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'HEALTH_SCORE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Clear current health score
  const clearCurrentHealthScore = () => {
    dispatch({ type: 'CLEAR_CURRENT_HEALTH_SCORE' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <HealthScoreContext.Provider
      value={{
        healthScores: state.healthScores,
        currentHealthScore: state.currentHealthScore,
        loading: state.loading,
        error: state.error,
        getHealthScores,
        getHealthScore,
        addHealthScore,
        deleteHealthScore,
        clearCurrentHealthScore,
        clearErrors
      }}
    >
      {children}
    </HealthScoreContext.Provider>
  );
};
