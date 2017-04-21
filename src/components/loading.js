import React from 'react';
import { LOADED, FETCHING } from 'alexs-redux-fetch/fetch/constants';

const Loading = ({ status, children }) => {
  if (status === LOADED) {
    return React.Children.only(children);
  }

  if (status === FETCHING) {
    return <div>Loading...</div>
  }

  return <div>Error</div>
}

export default Loading;