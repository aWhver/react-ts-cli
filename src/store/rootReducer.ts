import { combineReducers } from 'redux';
import todoReducer from '../controller/hooks/todo_list/reducer';
export default combineReducers({
  todoReducer,
});
