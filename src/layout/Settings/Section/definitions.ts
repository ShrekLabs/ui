import { ReactNode } from "react";
import { TSettingsItem } from "../Setting/definitions";

export type TSettingsSection = {
  title: string;
  header?: React.ReactNode;
  withBadge?: boolean;
  content?: ReactNode;
  items: TSettingsItem[];
};
