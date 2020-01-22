import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/index";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  store.subscribe(() => console.log(store.getState()));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("container"),
  () => {
    document.body.id = "light";
    document.body.style.fontSize = "150%";
    document.body.style.fontFamily = "Courier New,monospace";
  },
);
