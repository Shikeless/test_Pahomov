import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Rootroute from "./components/Rootroute";
import createStore from "./store.js";
import { Provider } from "react-redux";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Rootroute />
  </Provider>,
  document.getElementById("root")
);
