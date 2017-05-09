import React from 'react';
import { connect } from 'react-redux';
import { removeTodo } from '../../actions/todo';
import './todo-controls.css';

const RegularTodoControls = ({ todoId, removeTodo }) => (
  <div className='TodoControls'>
    <button onClick={() => removeTodo(todoId)}>X</button>
  </div>
)

export default connect(
  undefined,
  { removeTodo }
)(RegularTodoControls)