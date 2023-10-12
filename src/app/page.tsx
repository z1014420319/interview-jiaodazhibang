"use client";

import { ConfigProvider } from "antd";

import LeftMenu from "@/components/LeftMenu";
import MainContent from "@/components/MainContent";

import theme from "@/theme/themeConfig";
import { LeftMenuProvider } from "@/contexts/ListMenuContext";
import { useState } from "react";

import type { MenuInfo } from "@/types";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<MenuInfo | null>(null);

  return (
    <ConfigProvider theme={theme}>
      <div className="App flex">
        <LeftMenuProvider>
          <LeftMenu
            onSelect={(obj: MenuInfo) => {
              setCurrentTab(obj);
            }}
          />
          <MainContent currentTab={currentTab} />
        </LeftMenuProvider>
      </div>
    </ConfigProvider>
  );
}
