import {createStore} from "redux";
import {reducer} from "./reducer";
import middleware from "./middleware";
import {Operation} from "./operations";

const store = createStore(reducer, middleware);
export default store;

store.dispatch(Operation.loadQuestions());
store.dispatch(Operation.checkAuth());
