import { notEmpty } from "@shreklabs/core";
import { useEffect, useState } from "react";
import { useFn } from "../../react/hooks";
import { isArrowDown, isArrowUp, isEnter, isKeyOnly } from "../utils";

type TProps<T> = {
  currentValue?: T;
};

export function useArrowsNavigation<T>(items: T[], onSubmit: (item: T) => void, props?: TProps<T>) {
  const { currentValue } = props ?? {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

  useEffect(() => {
    const newIndex = notEmpty(currentValue) ? items.findIndex((item) => item === currentValue) : 0;
    setCurrentIndex(newIndex);
  }, [currentValue, items]);

  const handler = useFn((event: KeyboardEvent) => {
    if (!isKeyOnly(event)) return;
    if (!isEnter(event) && !isArrowDown(event) && !isArrowUp(event)) return;

    if (isArrowUp(event)) {
      if (currentIndex - 1 < 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (isArrowDown(event)) {
      if (currentIndex + 1 >= items.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (isEnter(event) && currentIndex < items.length) {
      onSubmit(currentItem);
    }

    event.preventDefault();
    event.stopPropagation();
  });

  useEffect(() => {
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handler]);

  return { currentIndex, currentItem, setCurrentIndex };
}
