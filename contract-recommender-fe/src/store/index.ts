import { combineReducers } from "redux";
import ui from "./ui";
import config from "./config";
import process from "./process";

const rootReducer = combineReducers({
  ui,
  config,
  process,
});

export default rootReducer;
