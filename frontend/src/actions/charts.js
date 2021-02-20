import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_DATA_BY_CATEGORY,
  GET_DATA_BY_CITY,
  GET_DATA_BY_STATE,
  GET_DATA_BY_OVER_TIME,
} from "./types";
import { tokenConfig } from './auth';

// CATEGORY
export const getDataByCategory = () => (dispatch, getState) => {
  axios
    .get("/plot1", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DATA_BY_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// CITY
export const getDataByCity = () => (dispatch, getState) => {
  axios
    .get("/plot4", tokenConfig(getState))
    .then((res) => {
        dispatch({ 
            type: GET_DATA_BY_CITY, 
            payload: res.data 
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// State
export const getDataByState = () => (dispatch, getState) => {
  axios
    .get("/plot3", tokenConfig(getState))
    .then((res) => {
        dispatch({ 
            type: GET_DATA_BY_STATE, 
            payload: res.data 
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Over Time
export const getDataByOverTime = () => (dispatch, getState) => {
  axios
    .get("/plot2", tokenConfig(getState))
    .then((res) => {
        dispatch({ 
            type: GET_DATA_BY_OVER_TIME, 
            payload: res.data 
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};