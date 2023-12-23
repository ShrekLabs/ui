import { useEffect } from "react";
import { isEscOnly } from "../utils";

type TOnClose = () => void;

let onCloseStack: TOnClose[] = [];

export function useCloseOnEsc(onClose: TOnClose): void {
  useEffect(() => {
    onCloseStack.push(onClose);

    return () => {
      onCloseStack = onCloseStack.filter((fn) => fn !== onClose);
    };
  }, [onClose]);
}

document.addEventListener("keyup", (event) => {
  if (!isEscOnly(event)) return;

  const onClose = onCloseStack.pop();
  if (!onClose) return;

  onClose();
  event.preventDefault();
  event.stopPropagation();
});
