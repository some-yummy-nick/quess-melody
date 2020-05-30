import axios from "axios";
import {ActionCreator} from "./actions";
import {AuthorizationStatus} from "./constants"

const Error = {
    UNAUTHORIZED: 401
};

const createAPI = (dispatch) => {
    const api = axios.create({
        baseURL: `https://htmlacademy-react-3.appspot.com/guess-melody`,
        timeout: 1000 * 5,
        withCredentials: true,
    });

    const onSuccess = (response) => response;

    const onFail = err => {
        if (err.response.status === Error.UNAUTHORIZED) {
            dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
            throw err;
        }
        throw err;
    };

    api.interceptors.response.use(onSuccess, onFail);

    return api;
};

export default createAPI;
