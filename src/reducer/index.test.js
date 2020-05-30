import {reducer} from "./index.js";
import {INCREMENT_STEP, INCREMENT_MISTAKES, RESET} from "../constants";

test(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
        step: -1,
        mistakes: 0,
        maxMistakes: 3,
        questions: [],
        gameTime: 2
    });
});

test(`Should increment current step by a given number`, () => {
    expect(reducer({
        step: -1,
        mistakes: 0,
    }, {
        type: INCREMENT_STEP,
        payload: 1,
    })).toEqual({
        step: 0,
        mistakes: 0,
    });
});

test(`Should reset state`, () => {
    expect(reducer({
        step: 10,
        mistakes: 3,
    }, {
        type: RESET,
    })).toEqual({
        step: -1,
        mistakes: 0,
        maxMistakes: 3,
        questions: [],
        gameTime: 2
    });
});

test(`Should increment mistakes by a make mistake`, () => {
    expect(reducer({
        step: -1,
        mistakes: 0,
    }, {
        type: INCREMENT_MISTAKES,
        payload: 1,
    })).toEqual({
        step: -1,
        mistakes: 1,
    });
});
