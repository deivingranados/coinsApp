import React, { useState } from "react";
import Main from "./components/main/main";
import { AppContext } from "./context/context";

const App = () => {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={{ state, setState }}>
      <Main />
    </AppContext.Provider>
  );
};

export default App;
