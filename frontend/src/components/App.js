import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

class App extends Component {
	render() {
		return (
			<Fragment>
				<div id="main">
					Test first div
				</div>
			</Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));