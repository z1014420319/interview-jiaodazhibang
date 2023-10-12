"use client";

import { useLeftMenuDataDispatch } from "@/contexts/ListMenuContext";
import { useEffect, useState } from "react";

import type { MenuInfo } from "@/types";

export default function MainContent(props: { currentTab: MenuInfo | null }) {
  const title =
    (props.currentTab?.domEvent.target as HTMLElement)?.innerHTML || "";

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const LeftMenuDataDispatch = useLeftMenuDataDispatch();

  return (
    <div>
      <input
        className="border"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          props.currentTab &&
            LeftMenuDataDispatch &&
            LeftMenuDataDispatch({
              type: "change",
              text: inputValue,
              keyPath: props.currentTab.keyPath,
            });
        }}
      >
        保存
      </button>
    </div>
  );
}
