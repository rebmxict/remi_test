import axios from "axios";
import swal from 'sweetalert';

import {
    USER_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
    REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {	
    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            if (res.data.is_active) {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            }
        })
        .catch(err => {
        });
};

// LOGIN USER
export const login = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({
		username,
        email,
        password
	});
	
    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
			});
			swal("Successfully Logged in!!!");
            dispatch(loadUser());
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Request Body
    const body = JSON.stringify({
        username,
        email,
        password
    });

    axios
        .post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
			});
			swal("Successfully Registered!!!");
			dispatch(loadUser());
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
	const token = getState().auth.token;
    console.log(token);
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