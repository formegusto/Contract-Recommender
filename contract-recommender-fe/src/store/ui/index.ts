import { handleActions } from "redux-actions";
import {
  Alert,
  CONFIRM_ALERT,
  ControlDrawer,
  HIDE_DRAWER,
  NEW_ALERT,
  SHOW_DRAWER,
} from "./types";

type UIStore = {
  drawer?: ControlDrawer | null;
  alert?: Alert | null;
  alerts: Alert[];
  bell: boolean;
};
type Payload = ControlDrawer | Alert | number;

const store: UIStore = {
  drawer: null,
  alert: null,
  alerts: [],
  bell: false,
};
const UIReducer = handleActions<UIStore, Payload>(
  {
    [SHOW_DRAWER]: (state, action) => ({
      ...state,
      drawer: action.payload as ControlDrawer,
      bell: false,
    }),
    [HIDE_DRAWER]: (state) => ({
      ...state,
      drawer: null,
      bell: false,
    }),
    [NEW_ALERT]: (state, action) => ({
      ...state,
      alert: action.payload as Alert,
      alerts: state.alerts.concat(action.payload as Alert),
      bell: true,
    }),
    [CONFIRM_ALERT]: (state, action) => ({
      ...state,
      alert: null,
    }),
  },
  store
);
export default UIReducer;
