import {INCREMENT_STEP, INCREMENT_MISTAKES, RESET, LOAD_QUESTIONS, REQUIRED_AUTHORIZATION} from "../constants";
import {initialState} from "../state";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_STEP:
            return Object.assign({}, state, {
                step: state.step + action.payload,
            });

        case INCREMENT_MISTAKES:
            return Object.assign({}, state, {
                mistakes: state.mistakes + action.payload,
            });

        case RESET:
            return Object.assign({}, initialState);

        case LOAD_QUESTIONS:
            return Object.assign({}, state, {
                questions: action.payload,
            });

        case REQUIRED_AUTHORIZATION:
            return Object.assign({}, state, {
                authorizationStatus: action.payload,
            });

        default:
            break;
    }
    return state;
};
