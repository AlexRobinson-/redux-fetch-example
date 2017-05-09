import React from 'react';
import classNames from 'classnames';
import './container.css';

const Container = ({ children, className }) => (
  <div className={classNames('Container', className)}>{children}</div>
)

export default Container;