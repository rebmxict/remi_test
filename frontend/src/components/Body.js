import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadMovie } from "../actions/share";
import ReactPlayer from "react-player"

class Body extends Component {
	state = {
	};

	componentDidMount() {
		this.props.loadMovie();
	}

	render() {
		const mapMovies = (movies) => {
			if (movies) {
				return movies.map((movie, i) => {
					return (
						<div className="row flex-row flex-nowrap movie-views" key={i}>
							<div className="col-lg-2"></div>
							<div className="col-lg-3">
								<ReactPlayer
									width="250px"
									height="140px"
									url={movie.link}
								/>
							</div>
							<div className="col-lg-5">
								sdfasdfasdfasdfasdfsadf
							</div>
							<div className="col-lg-2"></div>
						</div>
					)
				});
			}
		};

		return (
			<div>
				{mapMovies(this.props.movies)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	movies: state.share.movies
});

export default connect(mapStateToProps, { loadMovie })(Body);