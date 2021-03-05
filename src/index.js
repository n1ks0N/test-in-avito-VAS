import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import store from './store';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Admin from './components/admin/Admin';
import './index.css';
import reportWebVitals from './reportWebVitals';

const render = (state) => {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<Switch>
					<Route exact path="/admin" render={() => <Admin state={state.admin} dispatch={store.dispatch.bind(store)} />} />
					<Route
						path="*"
						render={() => (
							<App state={state} dispatch={store.dispatch.bind(store)} />
						)}
					/>
				</Switch>
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('root')
	);
};

render(store.getState());
store.subscribe(() => {
	const state = store.getState();
	render(state);
});

reportWebVitals();
