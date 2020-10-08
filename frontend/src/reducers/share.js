import {
    MOVIE_LOADED
} from "../actions/types";

const initialState = {
    movies: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case MOVIE_LOADED:
            return {
                ...state,
                movies: action.payload
            };
        default:
            return state;
    }
}