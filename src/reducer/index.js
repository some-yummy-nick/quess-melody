import {INCREMENT_STEP, INCREMENT_MISTAKES, RESET, LOAD_QUESTIONS} from "../constants";
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

        default:
            break;
    }
    return state;
};
