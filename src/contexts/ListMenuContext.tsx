"use client";

import { createContext, useContext, Dispatch } from "react";

import { useImmerReducer } from "use-immer";

type ActionObject = {
  keyPath: string[];
  type: "change";
  text: string;
};
interface MenuItem {
  id: string;
  text: string;
}
interface LeftMenuObject extends MenuItem {
  child: MenuItem[];
}
type LeftMenuData = LeftMenuObject[];

const LeftMenuDataContext = createContext<LeftMenuData | null>(null);

const LeftMenuDataDispatchContext =
  createContext<Dispatch<ActionObject> | null>(null);

function LeftMenuDataReducer(draft: LeftMenuData, actions: ActionObject) {
  switch (actions.type) {
    case "change":
      const parent = draft.find((item) => {
        return item.id === actions.keyPath[1];
      });
      const child = parent?.child.find((item: MenuItem) => {
        return item.id === actions.keyPath[0];
      });
      child && (child.text = actions.text);
      break;
  }
}

export function useLeftMenuData() {
  return useContext(LeftMenuDataContext);
}

export function useLeftMenuDataDispatch() {
  return useContext(LeftMenuDataDispatchContext);
}

export function LeftMenuProvider(props: { children: React.ReactNode }) {
  const [LeftMenuData, dispatch] = useImmerReducer(
    LeftMenuDataReducer,
    initialLeftMenuData
  );
  return (
    <LeftMenuDataContext.Provider value={LeftMenuData}>
      <LeftMenuDataDispatchContext.Provider value={dispatch}>
        {props.children}
      </LeftMenuDataDispatchContext.Provider>
    </LeftMenuDataContext.Provider>
  );
}

const initialLeftMenuData: LeftMenuData = [
  {
    id: "sub1",
    text: "菜单一",
    child: [
      { id: "1", text: "子菜单1-1" },
      { id: "2", text: "子菜单1-2" },
    ],
  },
  {
    id: "sub2",
    text: "菜单二",
    child: [
      { id: "3", text: "子菜单2-1" },
      { id: "4", text: "子菜单2-2" },
    ],
  },
];
