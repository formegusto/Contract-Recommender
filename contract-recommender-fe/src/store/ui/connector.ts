import { connect } from "react-redux";
import RootReducer from "../types";
import * as actions from "./actions";

const mapState = ({ ui }: RootReducer) => ({
  ...ui,
});

const UIConnector = connect(mapState, actions);
export default UIConnector;
