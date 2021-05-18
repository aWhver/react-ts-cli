import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actionTypes';
let nexttodo = 0;
export function addTodo(text: string) {
  return {
    type: ADD_TODO,
    id: nexttodo++,
    text,
    completed: false,
  }
}

export function toggleTodo(id: number) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  }
}