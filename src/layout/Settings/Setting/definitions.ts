import { TPersistedValue } from "@shreklabs/core";

export const IS_SETTINGS_ITEM_ENUM = "settings-enum-item" as const;
export const IS_SETTINGS_ITEM_BOOLEAN = "settings-boolean-item" as const;
export const IS_SETTINGS_ITEM_NUMBER = "settings-number-item" as const;
export const IS_SETTINGS_ITEM_STRING = "settings-string-item" as const;
export const IS_SETTINGS_ITEM_CUSTOM = "settings-custom-item" as const;

type TSettingsItemBase = {
  title: string;
  withBadge?: boolean;
  description?: string;
};

export type TSettingsEnumItem = TSettingsItemBase & {
  values: { value: string | undefined; label: string }[];
  value: TPersistedValue<string | undefined>;
  widgetType?: "radio-button" | "radio-group";
  is: typeof IS_SETTINGS_ITEM_ENUM;
};

export type TSettingsBooleanItem = TSettingsItemBase & {
  is: typeof IS_SETTINGS_ITEM_BOOLEAN;
  value: TPersistedValue<boolean | undefined>;
  inverted?: boolean;
};

export type TSettingsNumberItem = TSettingsItemBase & {
  is: typeof IS_SETTINGS_ITEM_NUMBER;
  value: TPersistedValue<number | undefined>;
};

export type TSettingsStringItem = TSettingsItemBase & {
  is: typeof IS_SETTINGS_ITEM_STRING;
  value: TPersistedValue<string | undefined>;
  multiline?: { maxRows?: number };
};

export type TSettingsCustomItem = TSettingsItemBase & {
  is: typeof IS_SETTINGS_ITEM_CUSTOM;
  render: (item: TSettingsItem) => JSX.Element;
};

export type TSettingsItem =
  | TSettingsEnumItem
  | TSettingsBooleanItem
  | TSettingsNumberItem
  | TSettingsStringItem
  | TSettingsCustomItem;

export type TSettingValue = unknown;
