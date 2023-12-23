import { isMac } from "@shreklabs/core";
import { TReactKeyboardEvent } from "./definitions";

export function getSubmitOnEnterFn(submit: () => void) {
  return (event: TReactKeyboardEvent) => {
    if (!isEnterOnly(event)) return;
    submit();
  };
}

export function isEnter(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return event.code === "Enter";
}

export function modifierKey(): "ctrl" | "cmd" {
  return isMac() ? "cmd" : "ctrl";
}

/**
 * Detects cmd+enter on Mac and ctrl+enter on other systems.
 * Works as expected only on "keydown" event
 */
export function isCtrlEnter(event: KeyboardEvent | TReactKeyboardEvent) {
  // navigator.platform is deprecated, but even according
  // to the MDN docs, it is the least bad way of detecting MacOS
  // when it comes to hotkeys
  if (isMac()) {
    return event.metaKey && isEnter(event);
  } else {
    return event.ctrlKey && isEnter(event);
  }
}

export function isEnterOnly(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return isEnter(event) && isKeyOnly(event);
}

export function isEscOnly(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return event.code === "Escape" && isKeyOnly(event);
}

export function isArrowDown(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return event.code === "ArrowDown";
}

export function isArrowUp(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return event.code === "ArrowUp";
}

export function isKeyOnly(event: KeyboardEvent | TReactKeyboardEvent): boolean {
  return !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
}
