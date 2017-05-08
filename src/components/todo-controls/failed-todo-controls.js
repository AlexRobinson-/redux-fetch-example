import React from 'react';

const TodoFailedControls = ({ failMessage, retryAction, cancelAction }) => (
  <div>
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
