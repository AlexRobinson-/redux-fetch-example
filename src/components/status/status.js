import React from 'react';
import { NOT_LOADED, LOADED, PENDING, FAILED } from 'alexs-redux-fetch/fetch/constants';

const status = ({ status, notLoaded, loaded, pending, failed }) => {
  const statuses = {
    [NOT_LOADED]: notLoaded,
    [LOADED]: loaded,
    [PENDING]: pending,
    [FAILED]: failed,
  }

  return React.Children.only(statuses[status] || failed);
}

export default status;