import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store';
import styles from './index.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div id='main'>
						<Home />
					</div>
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));