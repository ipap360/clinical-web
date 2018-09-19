import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import moment from 'moment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('playground', () => {
    // const r = console.log;
    // r("Welcome to my playground");
    // r(moment().date());
    // return ;
});
