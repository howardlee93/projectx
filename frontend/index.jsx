//entry.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/root';


document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser){
  	preloadedState = {
  		session: {
  			currentUser: window.currentUser
  		}
  	};
  }
  const store = configureStore(preloadedState);
  window.getState = store.getState;

  ReactDOM.render(<Root store={store}/>, rootEl);
});


