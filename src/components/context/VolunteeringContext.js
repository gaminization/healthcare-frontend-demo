// context/VolunteeringContext.js
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import volunteeringReducer from './volunteeringReducer';

export const VolunteeringContext = createContext();

const initialState = {
  volunteeringRecords: [],
  currentRecord: null,
  loading: true,
  error: null
};

export const VolunteeringProvider = ({ children }) => {
  const [state, dispatch] = useReducer(volunteeringReducer, initialState);

  // Get volunteering records
  const getVolunteeringRecords = async () => {
    try {
      const res = await axios.get('/api/volunteering');

      dispatch({
        type: 'GET_VOLUNTEERING_RECORDS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'VOLUNTEERING_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get single volunteering record
  const getVolunteeringRecord = async id => {
    try {
      const res = await axios.get(`/api/volunteering/${id}`);

      dispatch({
        type: 'GET_VOLUNTEERING_RECORD',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'VOLUNTEERING_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Add volunteering record
  const addVolunteeringRecord = async record => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/volunteering', record, config);

      dispatch({
        type: 'ADD_VOLUNTEERING_RECORD',
        payload: res.data
      });
      
      return res.data;
    } catch (err) {
      dispatch({
        type: 'VOLUNTEERING_ERROR',
        payload: err.response.data.msg
      });
      
      return null;
    }
  };

  // Update volunteering record
  const updateVolunteeringRecord = async record => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/volunteering/${record._id}`,
        record,
        config
      );

      dispatch({
        type: 'UPDATE_VOLUNTEERING_RECORD',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'VOLUNTEERING_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Delete volunteering record
  const deleteVolunteeringRecord = async id => {
    try {
      await axios.delete(`/api/volunteering/${id}`);

      dispatch({
        type: 'DELETE_VOLUNTEERING_RECORD',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'VOLUNTEERING_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Clear current record
  const clearCurrentRecord = () => {
    dispatch({ type: 'CLEAR_CURRENT_RECORD' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <VolunteeringContext.Provider
      value={{
        volunteeringRecords: state.volunteeringRecords,
        currentRecord: state.currentRecord,
        loading: state.loading,
        error: state.error,
        getVolunteeringRecords,
        getVolunteeringRecord,
        addVolunteeringRecord,
        updateVolunteeringRecord,
        deleteVolunteeringRecord,
        clearCurrentRecord,
        clearErrors
      }}
    >
      {children}
    </VolunteeringContext.Provider>
  );
};
