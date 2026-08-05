// context/volunteeringReducer.js
export default (state, action) => {
    switch (action.type) {
      case 'GET_VOLUNTEERING_RECORDS':
        return {
          ...state,
          volunteeringRecords: action.payload,
          loading: false
        };
      case 'GET_VOLUNTEERING_RECORD':
        return {
          ...state,
          currentRecord: action.payload,
          loading: false
        };
      case 'ADD_VOLUNTEERING_RECORD':
        return {
          ...state,
          volunteeringRecords: [action.payload, ...state.volunteeringRecords],
          loading: false
        };
      case 'UPDATE_VOLUNTEERING_RECORD':
        return {
          ...state,
          volunteeringRecords: state.volunteeringRecords.map(record =>
            record._id === action.payload._id ? action.payload : record
          ),
          loading: false
        };
      case 'DELETE_VOLUNTEERING_RECORD':
        return {
          ...state,
          volunteeringRecords: state.volunteeringRecords.filter(
            record => record._id !== action.payload
          ),
          loading: false
        };
      case 'CLEAR_CURRENT_RECORD':
        return {
          ...state,
          currentRecord: null
        };
      case 'VOLUNTEERING_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };
  