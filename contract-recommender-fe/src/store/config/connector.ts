import { connect } from "react-redux";
import RootReducer from "../types";
import * as actions from "./actions";
import * as uiActions from "../ui/actions";

const mapState = ({ ui, config }: RootReducer) => ({
  ui,
  ...config,
});

const ConfigConnector = connect(mapState, {
  ...uiActions,
  ...actions,
});
export default ConfigConnector;
