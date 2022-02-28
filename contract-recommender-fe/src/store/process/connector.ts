import * as actions from "./actions";
import { confirmAlert } from "../ui/actions";
import RootReducer from "../types";
import { connect } from "react-redux";

const mapState = ({ ui, process }: RootReducer) => ({
  ui,
  ...process,
});

const ProcessConnector = connect(mapState, { ...actions, confirmAlert });
export default ProcessConnector;
