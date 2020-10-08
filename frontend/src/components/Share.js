import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { shareMovie } from "../actions/share";

class Share extends Component {
	state = {
		link: "",
		description: ""
	};

	onChange(e, type) {
		if (type === "link") { this.setState({ link: e.target.value }); }
		else if(type === "description") { this.setState({ description: e.target.value }); }
	}

	onButton() {
		const { link, description } = this.state;
		this.props.shareMovie({ link, description });
	}

	componentDidMount() {
	}

	render() {
		if (!this.props.isAuthenticated) {
			return (<Redirect to="/" />);
		}

		return (
			<div className="row flex-row flex-nowrap">
				<div className="col-lg-3"></div>
				<div className="col-lg-6">
					<br />
					<br />
					<br />
					<div className="card card-outline-primary">
						<div className="card-block">
							<h6 className="text-primary">Share a Youtube movie</h6>
							Youtube URL:
							<input
								type="text"
								className="form-control form-control-input"
								style={{width: "100%"}}
								name="link"
								value={this.state.link}
								onChange={(e) => this.onChange(e, "link")}
							/>
							Description:
							<input
								type="text"
								className="form-control form-control-input"
								style={{width: "100%"}}
								name="description"
								value={this.state.description}
								onChange={(e) => this.onChange(e, "description")}
							/><br />
							<button type="submit" className="btn btn-primary" onClick={() => this.onButton()}>
								Share
							</button>
						</div>
					</div>
				</div>
				<div className="col-lg-3"></div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { shareMovie })(Share);