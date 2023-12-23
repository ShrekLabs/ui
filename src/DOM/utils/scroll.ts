import clamp from "lodash/clamp";

export function scrollSoItemIsVisible(params: {
  ref: React.RefObject<HTMLDivElement>;
  currentIndex: number;
  itemSelector: string;
}) {
  const $target = params.ref.current;
  if (!$target) return;

  const allItems = $target.querySelectorAll(params.itemSelector);
  const $menuItem = allItems?.[params.currentIndex] as HTMLDivElement | undefined;
  if (!$menuItem) return;

  $target.scrollTo(0, getItemScrollInsideParent($target, $menuItem));
}

// clamps $item's scroll into $parent's viewable part
// $parent must have `position: relative | absolute | fixed` for this function to work correctly
function getItemScrollInsideParent($parent: HTMLElement, $item: HTMLElement): number {
  const currentScroll = $parent.scrollTop;
  const minScroll = $item.offsetTop + $item.clientHeight - $parent.clientHeight;
  const maxScroll = $item.offsetTop;
  return clamp(currentScroll, minScroll, maxScroll);
}
