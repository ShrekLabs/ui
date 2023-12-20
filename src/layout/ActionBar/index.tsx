import { ActionBar } from "@gravity-ui/navigation";
import { Breadcrumbs, BreadcrumbsItem } from "@gravity-ui/uikit";
import { noop } from "@shreklabs/core";

const leftGroup = (content: JSX.Element): JSX.Element => {
  return <ActionBar.Group pull="left">{content}</ActionBar.Group>;
};

const rightGroup = (content: JSX.Element): JSX.Element => {
  return <ActionBar.Group pull="right">{content}</ActionBar.Group>;
};

const section = (left: JSX.Element, right?: JSX.Element): JSX.Element => {
  return (
    <ActionBar.Section type="primary">
      {leftGroup(left)}
      {right ? rightGroup(right) : null}
    </ActionBar.Section>
  );
};

const item = (content: JSX.Element): JSX.Element => {
  return <ActionBar.Item>{content}</ActionBar.Item>;
};

const breadcrumbs = <T extends BreadcrumbsItem = BreadcrumbsItem>(items: T[]) => {
  return <Breadcrumbs firstDisplayedItemsCount={1} lastDisplayedItemsCount={1} items={items}></Breadcrumbs>;
};

export function breadcrumbsText(text: string): BreadcrumbsItem {
  return { text, action: noop };
}

export function breadcrumbsLink(params: { text: string; href: string }): BreadcrumbsItem {
  return { text: params.text, href: params.href, action: noop };
}

export const actionBarRender = {
  section,
  item,
  breadcrumbs,
};
