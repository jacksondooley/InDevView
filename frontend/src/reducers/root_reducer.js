import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer'
import questions from './questions_reducer'
import room from './rooms_reducer'
import modalReducer from './modal_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  questions,
  room,
  modal: modalReducer
});

export default RootReducer;