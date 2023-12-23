export function isNewTabEvent(event: MouseEvent | React.MouseEvent): boolean {
  if (event.button === 1) {
    return true;
  }

  if (event.button === 0 && (event.metaKey || event.ctrlKey)) {
    return true;
  }

  return false;
}
