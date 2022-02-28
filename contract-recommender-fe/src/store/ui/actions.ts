import { createAction } from "redux-actions";
import {
  Alert,
  CONFIRM_ALERT,
  ControlDrawer,
  HIDE_DRAWER,
  NEW_ALERT,
  SHOW_DRAWER,
} from "./types";

export const showDrawer = createAction<ControlDrawer>(SHOW_DRAWER);
export const hideDrawer = createAction(HIDE_DRAWER);
export const newAlert = createAction<Alert>(NEW_ALERT);
export const confirmAlert = createAction(CONFIRM_ALERT);
