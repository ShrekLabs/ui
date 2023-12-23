import { useEffect } from 'react';
import { getEventPath } from './utils/getEventPath';

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent) => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const path = getEventPath(event);
      const clickedOutside = ref.current && !path.includes(ref.current);
      if (!clickedOutside) return;
      callback(event);
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref, callback]);
}
