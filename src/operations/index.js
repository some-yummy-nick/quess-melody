import {ActionCreator} from "../actions";
import {AuthorizationStatus} from "../constants"

export const Operation = {
    loadQuestions: () => (dispatch, _getState, api) => {
        return api.get(`/questions`)
            .then((response) => {
                dispatch(ActionCreator.loadQuestions(response.data));
            });
    },
    checkAuth: () => {
        return (dispatch, _getState, api) => {
            return api
                .get(`/login`)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
                    }
                });
        };
    },
    login: (authData) => {
        return (dispatch, _getState, api) => {
            return api
                .post(`/login`, {
                    email: authData.email,
                    password: authData.password,
                })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
                    }
                });
        };
    }
};
