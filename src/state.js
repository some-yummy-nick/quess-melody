import {AuthorizationStatus} from "./constants"

export const initialState = {
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
    questions: [],
    gameTime: 2,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
};
