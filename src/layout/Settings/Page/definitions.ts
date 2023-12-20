import { IconProps } from "@gravity-ui/uikit";
import { TSettingsSection } from "../Section/definitions";

export type TSettingsPage<TSettingsPageId extends string> = {
  id: TSettingsPageId;
  title: string;
  icon: IconProps;
  sections: TSettingsSection[];
};
