import React, { useState } from "react";

import Manage from "./Manage";
import Textarea from "./Textarea";
import Tabs from "./Tabs";
import Add from "./Add";
import Menu from "./Menu";

const App = () => {
  const [Main, setMain] = useState(Textarea);

  const open = (isOpen) => {
    setMain(isOpen ? Manage : Textarea);
  };

  return (
    <>
      <Main />
      <div id="panel">
        <Tabs />
        <Add />
        <Menu open={open} />
      </div>
    </>
  );
};

export default App;
