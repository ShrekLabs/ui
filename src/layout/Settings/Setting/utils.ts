import {
  IS_SETTINGS_ITEM_BOOLEAN,
  IS_SETTINGS_ITEM_CUSTOM,
  IS_SETTINGS_ITEM_ENUM,
  IS_SETTINGS_ITEM_NUMBER,
  IS_SETTINGS_ITEM_STRING,
  TSettingsBooleanItem,
  TSettingsCustomItem,
  TSettingsEnumItem,
  TSettingsNumberItem,
  TSettingsStringItem,
} from "./definitions";

export function getSettingsItemString(
  title: string,
  value: TSettingsStringItem["value"],
  params?: Pick<TSettingsStringItem, "description" | "multiline">
): TSettingsStringItem {
  return {
    is: IS_SETTINGS_ITEM_STRING,
    title,
    value,
    ...params,
  };
}

export function getSettingsItemEnum(
  title: string,
  values: TSettingsEnumItem["values"],
  value: TSettingsEnumItem["value"],
  params?: Pick<TSettingsEnumItem, "description" | "widgetType">
): TSettingsEnumItem {
  return {
    is: IS_SETTINGS_ITEM_ENUM,
    title,
    values,
    value,
    ...params,
  };
}

export function getSettingsItemBoolean(
  title: string,
  value: TSettingsBooleanItem["value"],
  params?: Pick<TSettingsBooleanItem, "description" | "inverted">
): TSettingsBooleanItem {
  return {
    is: IS_SETTINGS_ITEM_BOOLEAN,
    value,
    title,
    ...params,
  };
}

export function getSettingsItemNumber(
  title: string,
  value: TSettingsNumberItem["value"],
  params?: Pick<TSettingsNumberItem, "description">
): TSettingsNumberItem {
  return {
    is: IS_SETTINGS_ITEM_NUMBER,
    value,
    title,
    ...params,
  };
}

export function getSettingsItemCustom(
  title: string,
  render: TSettingsCustomItem["render"],
  params?: Pick<TSettingsNumberItem, "description">
): TSettingsCustomItem {
  return {
    is: IS_SETTINGS_ITEM_CUSTOM,
    title,
    render,
    ...params,
  };
}
