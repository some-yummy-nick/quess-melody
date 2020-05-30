import {
  INCREMENT_STEP,
  INCREMENT_MISTAKES,
  RESET,
  GameType,
  LOAD_QUESTIONS,
  REQUIRED_AUTHORIZATION
} from "../constants";

const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswer) =>
  userAnswer.every((it, i) => it === (question.answers[i].genre === question.genre));

export const ActionCreator = {
  incrementStep: () => ({
    type: INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
      default:
        break;
    }
    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: RESET,
      };
    }

    return {
      type: INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  reset: () => ({
    type: RESET,
  }),

  loadQuestions: (questions) => ({
    type: LOAD_QUESTIONS,
    payload: questions
  }),

  requiredAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status
  }),
};
