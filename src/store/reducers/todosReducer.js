import * as actions from "../actions/actionTypes";

const initialState = {
    error: null,
    loading: false
};

const cleanUp = state => {
    return {
        ...state,
        error: null,
        loading: false
    };
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.CLEAN_UP:
            return cleanUp(state);

        case actions.ADD_TODO_START:
            return { ...state, loading: true };

        case actions.ADD_TODO_SUCCESS:
            return { ...state, error: false, loading: false };

        case actions.ADD_TODO_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
