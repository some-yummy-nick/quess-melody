import {ActionCreator} from "./index";
import {INCREMENT_STEP, INCREMENT_MISTAKES, RESET} from "../constants";

describe(`Action creators test`, () => {
  test(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: INCREMENT_STEP,
      payload: 1,
    });
  });

  test(`Action creator for incrementing mistake action with 0 payload`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }]
    }, {
      artist: `correct`,
      src: ``,
    }, 0, Infinity)).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 0
    });
  });

  test(`Action creator for incrementing mistake action with 1 payload`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    }, {
      artist: `incorrect`,
      src: ``,
    }, 0, Infinity)).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 1
    });
  });

  test(`Action creator for incrementing mistake action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        }, {
          genre: `jazz`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false], 0, Infinity)).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 0
    });
  });

  test(`Action creator for incrementing mistake action with 1 payload`, () => {
    expect(ActionCreator.incrementMistake([true, true, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        }
      ]
    }, 0, Infinity)).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 1
    });
  });

  test(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.incrementMistake(
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            },
            {
              artist: `incorrect`,
              picture: ``,
            },
            {
              artist: `incorrect-2`,
              picture: ``,
            }
          ]
        }, Infinity, 0))
      .toEqual({
        type: RESET,
      });

    expect(ActionCreator.incrementMistake([true, true, true, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        }
      ]
    }, Infinity, 0)).toEqual({
      type: RESET,
    });
  });
});
