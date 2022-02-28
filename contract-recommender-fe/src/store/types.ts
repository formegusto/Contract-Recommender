import rootReducer from "./";

export type ResponseType = {
  status: boolean;
  message?: string;
  data: any;
};

type RootReducer = ReturnType<typeof rootReducer>;

export default RootReducer;
