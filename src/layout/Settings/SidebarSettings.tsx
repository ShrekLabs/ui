import { Settings } from "@gravity-ui/navigation";
import { delay, TPersistedValue } from "@shreklabs/core";
import { useFn } from "../../react/hooks";
import { genericMemo } from "../../react/utils";
import { BooleanSetting } from "./components/BooleanSetting";
import { EnumSetting } from "./components/EnumSetting";
import { NumberSetting } from "./components/NumberSetting";
import { StringSetting } from "./components/StringSetting";
import { TSettingsPage } from "./Page/definitions";
import { TSettingsSection } from "./Section/definitions";
import {
  IS_SETTINGS_ITEM_BOOLEAN,
  IS_SETTINGS_ITEM_CUSTOM,
  IS_SETTINGS_ITEM_ENUM,
  IS_SETTINGS_ITEM_NUMBER,
  IS_SETTINGS_ITEM_STRING,
  TSettingsItem,
} from "./Setting/definitions";

type TProps<TSettingsPageId extends string> = {
  pages: TSettingsPage<TSettingsPageId>[];
  currentPage: TPersistedValue<`/${TSettingsPageId}`>;
};

export const SidebarSettings = genericMemo(function SidebarSettings<TSettingsPageId extends string>(
  props: TProps<TSettingsPageId>
) {
  const initialPage = props.currentPage.read();

  const onPageChange = useFn((page: string | undefined) => {
    if (!page) return;
    const value = page as `/${TSettingsPageId}`;
    // Without `delay` there's some warning about setState
    // Warning: Cannot update a component (`SidebarPanelSettings`) while rendering a different component...
    delay(0).then(() => {
      props.currentPage.write(value);
    });
  });

  return (
    <Settings
      // dict={{ heading_settings: "Настройки", not_found: "Пусто", placeholder_search: "Ничего нет" }}
      initialPage={initialPage}
      onPageChange={onPageChange}
    >
      {props.pages.map((page) => (
        <Settings.Page id={page.id} title={page.title} key={page.id} icon={page.icon}>
          {renderSections(page.sections)}
        </Settings.Page>
      ))}
    </Settings>
  );
});

function renderSections(sections: TSettingsSection[]): JSX.Element[] {
  return sections.map((section) => (
    <Settings.Section title={section.title} header={section.header} withBadge={section.withBadge} key={section.title}>
      {section.content ? section.content : null}
      {section.items && section.items.length > 0 ? renderItems(section.items) : null}
    </Settings.Section>
  ));
}

function renderItems(items: TSettingsItem[]): JSX.Element[] {
  return items.map((item) => (
    <Settings.Item
      description={item.description}
      withBadge={item.withBadge}
      title={item.title}
      key={item.title}
      align={"top"}
    >
      {renderItem(item)}
    </Settings.Item>
  ));
}

function renderItem(item: TSettingsItem): JSX.Element {
  switch (item.is) {
    case IS_SETTINGS_ITEM_ENUM:
      return <EnumSetting setting={item} />;
    case IS_SETTINGS_ITEM_BOOLEAN:
      return <BooleanSetting setting={item} />;
    case IS_SETTINGS_ITEM_NUMBER:
      return <NumberSetting setting={item} />;
    case IS_SETTINGS_ITEM_STRING:
      return <StringSetting setting={item} />;
    case IS_SETTINGS_ITEM_CUSTOM:
      return item.render(item);
  }
}
