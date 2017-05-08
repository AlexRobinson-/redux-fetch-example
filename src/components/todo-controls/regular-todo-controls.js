import React from 'react';
import { connect } from 'react-redux';
import { removeTodo } from '../../actions/todo';

const RegularTodoControls = ({ todoId, removeTodo }) => (
  <div>
    <button onClick={() => removeTodo(todoId)}>X</button>
  </div>
)

export default connect(
  undefined,
  { removeTodo }
)(RegularTodoControls)