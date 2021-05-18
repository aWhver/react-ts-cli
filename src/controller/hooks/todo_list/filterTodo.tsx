import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from './actions';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETE } from './actionTypes';

function FilterItem({ children, onClick, active }) {
  return (
    <button onClick={onClick} disabled={active}>
      {children}
    </button>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    active: state.todoReducer.visibilityFilter === ownProps.filter,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
  };
}

const NewFilterItem = connect(mapStateToProps, mapDispatchToProps)(FilterItem);

function FilterTodo() {
  return (
    <div>
      <b>Show:</b>
      <NewFilterItem filter={FILTER_ALL}>all</NewFilterItem>
      <NewFilterItem filter={FILTER_ACTIVE}>active</NewFilterItem>
      <NewFilterItem filter={FILTER_COMPLETE}>complete</NewFilterItem>
    </div>
  );
}

export default FilterTodo;
