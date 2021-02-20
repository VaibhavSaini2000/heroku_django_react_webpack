import axios from 'axios';
import { returnErrors } from './messages';
import { GET_PLOTTWODATA } from './types';
import { tokenConfig } from './auth';

//GET PLOTTWODATA
export const getPlottwodata = () => (dispatch, getState) => {
    axios.get('/plot2/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PLOTTWODATA,
                payload: res.data
            });
        }).catch((err) => dispatch(returnErrors(err.response.data,err.response.status)));
};