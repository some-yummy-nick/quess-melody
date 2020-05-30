import MockAdapter from "axios-mock-adapter";
import {api} from "../api";
import {LOAD_QUESTIONS} from "../constants";
import {Operation} from "./index";

describe(`Operation work correctly`, () => {
    it(`Should make a correct API call to /questions`, function () {
        const apiMock = new MockAdapter(api);
        const dispatch = jest.fn();
        const questionLoader = Operation.loadQuestions(dispatch, jest.fn(), api);

        apiMock
            .onGet(`/questions`)
            .reply(200, [{fake: true}]);

        return questionLoader(dispatch, () => {
        }, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: LOAD_QUESTIONS,
                    payload: [{fake: true}],
                });
            });
    });
});
