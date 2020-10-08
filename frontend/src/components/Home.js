import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from './Header';
import Body from './Body';
import Share from "./Share";

class Home extends Component {
	render() {
		return (
			<div className="full-width">
				<Header />
				<Route exact path="/" component={Body} />
				<Route exact path="/share" component={Share} />
			</div>
		)
	}
}

export default Home;