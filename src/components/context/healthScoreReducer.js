// context/healthScoreReducer.js
export default (state, action) => {
    switch (action.type) {
      case 'GET_HEALTH_SCORES':
        return {
          ...state,
          healthScores: action.payload,
          loading: false
        };
      case 'GET_HEALTH_SCORE':
        return {
          ...state,
          currentHealthScore: action.payload,
          loading: false
        };
      case 'ADD_HEALTH_SCORE':
        return {
          ...state,
          healthScores: [action.payload, ...state.healthScores],
          loading: false
        };
      case 'DELETE_HEALTH_SCORE':
        return {
          ...state,
          healthScores: state.healthScores.filter(
            healthScore => healthScore._id !== action.payload
          ),
          loading: false
        };
      case 'CLEAR_CURRENT_HEALTH_SCORE':
        return {
          ...state,
          currentHealthScore: null
        };
      case 'HEALTH_SCORE_ERROR':
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
  