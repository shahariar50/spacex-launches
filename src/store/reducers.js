import { combineReducers } from "redux";
import launches from "./reducer/launchesReducer";

const reducers = () => combineReducers({ launches });

export default reducers;
