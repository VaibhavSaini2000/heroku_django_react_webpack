import {
    GET_DATA_BY_CATEGORY,
    GET_DATA_BY_CITY,
    GET_DATA_BY_STATE,
    GET_DATA_BY_OVER_TIME,
  } from "../actions/types.js";
  
  const initialState = {
    byCategory: {},
    byCity: {},
    byState: {},
    byOverTime: {},
  };
  
  export default function chartReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DATA_BY_CATEGORY:
        return { ...state, byCategory: action.payload };
      case GET_DATA_BY_CITY:
        return { ...state, byCity: action.payload };
      case GET_DATA_BY_STATE:
        return { ...state, byState: action.payload };
      case GET_DATA_BY_OVER_TIME:
        return { ...state, byOverTime: action.payload };
      default:
        return state;
    }
  }