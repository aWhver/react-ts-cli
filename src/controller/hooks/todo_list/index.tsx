import React, { useState } from 'react';
import { connect } from 'react-redux';
import TodoList from './todoList';
import FilterTodo from './filterTodo';
import { addTodo } from './actions';

function Todo(props) {
  const [txt, setTxt] = useState<string>('');
  console.log(props);
  return (
    <div>
      <h3>todolist</h3>
      <div>
        <input onChange={(event) => setTxt(event.target.value)} value={txt} />
        <button
          onClick={() => {
            props.dispatch(addTodo(txt));
            setTxt('');
          }}
        >
          add todo
        </button>
      </div>
      <TodoList />
      <FilterTodo />
    </div>
  );
}

export default connect()(Todo);
