import { isEmpty, notEmpty } from "@shreklabs/core";

// dont use types because we have huge amount errors
export function getEventPath(event: Event): EventTarget[] {
  // @ts-expect-error I don't know the right type : ^ (
  const path: EventTarget[] = (event.composedPath && event.composedPath()) || event.path;
  const target = event.target;

  if (notEmpty(path)) {
    // Safari doesn't include Window, but it should.
    return path.indexOf(window) < 0 ? path.concat(window) : path;
  }

  if (target === window) {
    return [window];
  }

  if (isEmpty(target)) {
    return [];
  }

  return [target].concat(getNodeParents(target as Element), window);
}

function getNodeParents(node: Element["parentNode"], memo: Element[] = []): Element[] {
  const parentNode = node?.parentNode;

  if (isEmpty(parentNode)) {
    return memo;
  }

  return getNodeParents(parentNode, memo.concat(parentNode as Element));
}
