import React from 'react';
import ReactDOM from 'react-dom';
import MainUser from './NaviBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
