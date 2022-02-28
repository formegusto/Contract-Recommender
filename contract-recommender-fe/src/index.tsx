import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./store";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import SocketListener from "./containers/SocketListener";
import createSagaMW from "redux-saga";
import RootSaga from "./store/saga";
import AlertListener from "./containers/AlertListener";

const sagaMW = createSagaMW();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMW))
);
sagaMW.run(RootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AlertListener />
      <SocketListener />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
