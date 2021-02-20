import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_SALESBYCATEGORY } from './types';
import { tokenConfig } from './auth';

//GET SALESBYCATEGORY
export const getSalesbycategory = () => (dispatch, getState) => {
    axios.get('/segment/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SALESBYCATEGORY,
                payload: res.data
            });
        }).catch((err) => dispatch(returnErrors(err.response.data,err.response.status)));
};
