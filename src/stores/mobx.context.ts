import React from "react";
import { ListStore } from "./list.store";

const mobxStore = {
  listStore: new ListStore(),
};

export const mobxContext = React.createContext(mobxStore);
export const useStore = () => React.useContext(mobxContext);
