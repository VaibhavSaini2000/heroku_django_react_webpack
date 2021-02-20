import { combineReducers } from "redux";
import auth from "./authReducer";
import chartReducer from "./chartReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth,
  error: errorReducer,
  message: messageReducer,
  chartData: chartReducer,
  modal: modalReducer,
});