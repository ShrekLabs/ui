import { Gear } from "@gravity-ui/icons";
import { FooterItem, MenuItem } from "@gravity-ui/navigation";
import { memo, useMemo } from "react";

type TProps = {
  isCompact: boolean;
  onClick: () => void;
};

export const SidebarButtonSettings = memo(function SidebarButtonSettings({ isCompact, onClick }: TProps) {
  const item: MenuItem = useMemo(
    () => ({
      id: "settings",
      title: "Настройки",
      onItemClick: onClick,
      icon: Gear,
    }),
    [onClick]
  );

  return <FooterItem item={item} compact={isCompact}></FooterItem>;
});
