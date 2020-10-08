import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import { Provider } from "react-redux";
import store from "../store";
import styles from './index.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div id="main">
					<Home />
				</div>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));