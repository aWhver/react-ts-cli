import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from './actions';
import { FILTER_ACTIVE, FILTER_COMPLETE } from './actionTypes';


function getVisiable(todos, filter) {
  switch (filter) {
    case FILTER_ACTIVE:
      return todos.filter((item) => !item.completed);
    case FILTER_COMPLETE:
      return todos.filter((item) => item.completed);
    // case FILTER_ACTIVE:
    // return state.filter((item) => !item.completed);
    default:
      return todos;
  }
}

function mapStatetoProps(state) {
  console.log(state);
  return {
    todos: getVisiable(state.todoReducer.todos, state.todoReducer.visibilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id)),
  };
}

function TodoList({ todos, toggleTodo }) {
  console.log(todos);
  return (
    <ul>
      {todos.map((item) => {
        return (
          <li
            key={item.id}
            style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
            onClick={() => {
              toggleTodo(item.id);
            }}
          >
            {item.text}
          </li>
        );
      })}
    </ul>
  );
}

export default connect(mapStatetoProps, mapDispatchToProps)(TodoList);
