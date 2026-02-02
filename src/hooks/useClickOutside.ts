import { useEffect, RefObject } from 'react';

/**
 * Hook that handles click outside behavior
 * @param ref - Ref to the element that should be checked for outside clicks
 * @param handler - Callback function to execute when click outside is detected
 * @param enabled - Whether the click outside listener should be active (default: true)
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
