import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer'
<<<<<<< HEAD
import questions from './questions_reducer'
=======
import rooms from './rooms_reducer'
>>>>>>> origin/rooms-redux

const RootReducer = combineReducers({
  session,
  errors,
<<<<<<< HEAD
  questions
=======
  rooms
>>>>>>> origin/rooms-redux
});

export default RootReducer;