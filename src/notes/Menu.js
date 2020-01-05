import React from "react";

const e = React.createElement;

export default function Menu() {
  return e("div", { id: "menu", className: "tab action" },
    e("img", { id: "gear", src: "gear.svg" }));
}
