import {
    USER_LOADED,
	USER_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
    REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading:false,
    user: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
				isLoading: false,
				user: action.payload,
				user_role: action.payload.is_superuser,
				isAuthPage: false
			};
		case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
				isAuthenticated: true,
				isLoading: false,
				isAuthPage: false
			};
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
            };
        default:
            return state;
    }
}