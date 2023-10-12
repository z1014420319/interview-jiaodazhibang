"use client";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLeftMenuData } from "@/contexts/ListMenuContext";

import type { MenuInfo } from "@/types";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}

const LeftMenu = (props: { onSelect: (obj: MenuInfo) => void }) => {
  const LeftMenuData = useLeftMenuData();
  const items: MenuItem[] | undefined = LeftMenuData?.map((item) => {
    return getItem(
      item.text,
      item.id,
      item.child.map((childItem) => {
        return getItem(childItem.text, childItem.id);
      })
    );
  });
  return (
    <Menu
      mode="inline"
      style={{ width: 256 }}
      items={items}
      onClick={(obj: MenuInfo) => {
        props.onSelect(obj);
      }}
    />
  );
};

export default LeftMenu;
