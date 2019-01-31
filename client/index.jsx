import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// We will need to import this from redux to create our store and make use of the thunk
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Dont forget to import redux thunk
import thunk from 'redux-thunk';
// Getting our combined reducers
import reducers from './reducers/reducers';
import {  BrowserRouter as Router } from 'react-router-dom'
import App from './App';


const store = createStore(reducers, {}, applyMiddleware(thunk));

document.addEventListener("DOMContentLoaded", () => {
const target = document.getElementById("react-container");
  
ReactDOM.render(
  <Provider store={store}> 
    <Router>
      <App />
    </Router>
  </Provider>
  , target
)
});
