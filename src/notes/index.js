import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/index";
import Textarea from "./Textarea";
import Tabs from "./Tabs";
import Add from "./Add";
import Menu from "./Menu";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  store.subscribe(() => console.log(store.getState()));
}

const e = React.createElement;

ReactDOM.render(
  e(Provider, { store }, [
    e(Textarea, { key: "textarea" }),
    e("div", { key: "panel", id: "panel" },
      e(Tabs),
      e(Add),
      e(Menu)),
  ]),

  document.getElementById("container"),
  () => {
    document.body.id = "light";
    document.body.style.fontSize = "150%";
    document.body.style.fontFamily = "Courier New,monospace";
  },
);
