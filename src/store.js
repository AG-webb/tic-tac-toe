import { combineReducers, createStore } from "redux";
import mainReducer from "./reducers/main-reducer";

let reducers = combineReducers({
    main: mainReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;