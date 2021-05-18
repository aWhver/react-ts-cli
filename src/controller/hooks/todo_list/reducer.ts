import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, FILTER_ALL } from './actionTypes';

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: action.completed,
        },
      ];
    case TOGGLE_TODO:
      const newState = state.map((item) => {
        if (item.id === action.id) {
          item.completed = !item.completed;
        }
        return item;
      });

      return newState;
    default:
      return state;
  }
}

function visibilityFilter(state = FILTER_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}


export default combineReducers({
  todos,
  visibilityFilter,
});
