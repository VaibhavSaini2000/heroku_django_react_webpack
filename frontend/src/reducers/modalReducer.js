import { CLOSE_AUTH, OPEN_AUTH } from "../actions/types";

const initialState = {
  login: false,
  register: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_AUTH:
      if (action.payload === "login") {
        return { ...state, login: true };
      }
      if (action.payload === "register") {
        return { ...state, register: true };
      }
      return state;
    case CLOSE_AUTH:
      if (action.payload === "login") {
        return { ...state, login: false };
      }
      if (action.payload === "register") {
        return { ...state, register: false };
      }
      return state;

    default:
      return state;
  }
}