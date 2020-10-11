import axios from "axios";

import {
    MOVIE_LOADED
} from "./types";

// LOAD MOVIE
export const loadMovie = () => (dispatch, getState) => {
    var headers = {};
    if (getState().auth.isAuthenticated) { headers = tokenConfig(getState); }
    console.log(getState().auth.isAuthenticated, "=====");
    axios
        .get("/api/share")
        .then(res => {
			dispatch({
				type: MOVIE_LOADED,
				payload: res.data.movies
			});
        })
        .catch(err => {
        });
};

export const shareMovie = ({ link, description }) => (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify({
		link,
		description
    });

    axios
        .post("/api/share", body, tokenConfig(getState))
        .then(res => {
			dispatch(loadMovie());
        })
        .catch(err => {
        });
};

export const voteMovie = ({ like, dislike, movie_id }) => (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify({
		like,
		dislike,
		movie_id
    });

    axios
        .post("/api/share/vote", body, tokenConfig(getState))
        .then(res => {
			dispatch(loadMovie());
        })
        .catch(err => {
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
	const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};