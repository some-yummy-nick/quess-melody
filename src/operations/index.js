import {ActionCreator} from "../actions";
import {AuthorizationStatus} from "../constants"

export const Operation = {
    loadQuestions: () => (dispatch, _getState, api) => {
        return api.get(`/questions`)
            .then((response) => {
                dispatch(ActionCreator.loadQuestions(response.data));
            });
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
                        localStorage.setItem("authorizationStatus", AuthorizationStatus.AUTH);
                    }
                });
        };
    }
};
