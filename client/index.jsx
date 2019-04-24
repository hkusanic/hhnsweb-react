import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// We will need to import this from redux to create our store and make use of the thunk
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Dont forget to import redux thunk
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

// Getting our combined reducers
import reducers from './reducers/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import App from './App';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {
	const target = document.getElementById('react-container');

	ReactDOM.render(
		<Provider store={store}>
			<LocalizeProvider>
				<Router history={history}>
					<App />
				</Router>
			</LocalizeProvider>
		</Provider>,
		target
	);
});
