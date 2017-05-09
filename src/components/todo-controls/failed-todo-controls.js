import React from 'react';
import './todo-controls.css';

const TodoFailedControls = ({ failMessage, retryAction, cancelAction }) => (
  <div className='TodoControls TodoControls__failed'>
    {failMessage}
    <button onClick={() => retryAction()}>
      Try again
    </button>
    <button onClick={() => cancelAction()}>
      Cancel
    </button>
  </div>
)

export default TodoFailedControls;
