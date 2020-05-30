import {applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import store from "./store";

import createAPI from "./api";

const api = createAPI((...args) => store.dispatch(...args));

export default composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api), logger)
);
