import React, { useContext } from "react";
import { AppContextType } from "../types/Types";

export const AppContext = React.createContext<AppContextType>({
  state: {},
  setState: () => null,
});
export const useAppContext = () => useContext(AppContext);
