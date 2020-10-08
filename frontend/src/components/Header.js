import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { login, register, logout, loadUser } from "../actions/auth";

class Header extends Component {
	state = {
		email: "",
		password: "",
		path: true
	};

	onButton = e => {
		const { email, password } = this.state;
		const username = email;
		const newUser = { username, email, password };
		if (e == 'login') { this.props.login(newUser); }
		if (e == 'register') { this.props.register(newUser); }
		if (e == 'logout') { this.props.logout(); }
		if (e == 'share') { this.setState({ path: !this.state.path }); }
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	componentDidMount() {
		this.props.loadUser();
	}

	render() {
		return (
			<nav className="navbar navbar-light bg-light justify-content-between">
				<a className="navbar-brand">Funny Movies</a>
				{this.props.isAuthenticated ? (
					<div className="form-inline">
						<span>
							{this.props.user.username}
						</span>&nbsp;&nbsp;
						<Link className="btn btn-primary" to={this.state.path ? "/share" : "/"} onClick={() => this.onButton('share')}>
							{this.state.path ? "Share a movie" : "View movies"}
						</Link>&nbsp;&nbsp;
						<button type="submit" className="btn btn-primary" onClick={() => this.onButton('logout')}>
							Logout
						</button>
					</div>
				) : (
					<div className="form-inline">
						<input
							type="email"
							className="form-control form-control-input"
							name="email"
							onChange={this.onChange}
							value={this.state.email}
							placeholder="Email Address"
						/>&nbsp;&nbsp;
						<input
							type="password"
							className="form-control form-control-input"
							name="password"
							onChange={this.onChange}
							value={this.state.password}
							placeholder="Password"
						/>&nbsp;&nbsp;
						<button type="submit" className="btn btn-primary" onClick={() => this.onButton('login')}>
							Login
						</button>&nbsp;&nbsp;
						<button type="submit" className="btn btn-primary" onClick={() => this.onButton('register')}>
							Register
						</button>
					</div>
				)}
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
});

export default connect(mapStateToProps, { login, register, logout, loadUser })(Header);