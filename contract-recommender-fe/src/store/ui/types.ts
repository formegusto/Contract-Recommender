// data type
export type ControlDrawer = {
  type: "alert" | "regist" | null;
};

export type Alert = {
  id: string;
  step: string;
  type: string;
  status: boolean;
  message: string;
  systemConfirm: boolean;
};

// redux action type
export const SHOW_DRAWER = "ui/drawer/show";
export const HIDE_DRAWER = "ui/drawer/hide";

export const NEW_ALERT = "ui/alert/new";
export const CONFIRM_ALERT = "ui/alert/confirm";
