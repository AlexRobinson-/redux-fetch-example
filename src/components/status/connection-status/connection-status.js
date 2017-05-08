import React from 'react';
import Status from './../status';

const ConnectionStatus = ({ status, error, onRetry, children }) => (
  <Status
    status={status}
    notLoaded={null}
    loaded={children}
    pending={<div>Loading...</div>}
    failed={(
      <div>
        <div>{error}</div>
        <button onClick={onRetry}>Try Again here</button>
      </div>
    )}
  />
);

export default ConnectionStatus;