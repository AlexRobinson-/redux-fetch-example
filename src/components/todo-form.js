import React, { Component } from 'react';
import { connect } from 'react-redux';
import { todoSelectors } from './../reducers';
import { beginNew, update, stopEditing, createTodo, saveTodo } from './../actions/todo';
import './todo-form.css';

class TodoForm extends Component {

  componentWillMount() {
    this.props.beginNew();
  }

  render() {
    return (
      <div>
        {
          this.props.todo && (
            <div className="TodoForm">
              <input
                placeholder="What do you have to do?"
                value={this.props.todo.title || ''}
                onChange={e => this.props.update({ title: e.target.value })}
              />

              <button onClick={() => this.props.stopEditing()}>Cancel</button>
              <button
                onClick={() => {
                  if (this.props.todo.id) {
                    this.props.saveTodo(this.props.todo.id, this.props.todo)
                  } else {
                    this.props.createTodo(this.props.todo)
                  }
                }}
              >
                Save
              </button>
            </div>
          )
        }
        {
          !this.props.todo && (
            <div>
              <button onClick={() => this.props.beginNew()}>Start New</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    todo: todoSelectors.getEditable(state)
  }),
  {
    beginNew,
    update,
    stopEditing,
    createTodo,
    saveTodo
  }
)(TodoForm);