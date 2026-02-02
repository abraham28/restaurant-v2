import { useState, useCallback } from 'react';

export interface UseDropdownNavigationOptions {
  /** Total number of items in the dropdown */
  itemCount: number;
  /** Whether the dropdown is currently open */
  isOpen: boolean;
  /** Callback when an item should be selected */
  onSelect: (index: number) => void;
  /** Callback to close the dropdown */
  onClose?: () => void;
}

export interface UseDropdownNavigationReturn {
  /** Currently highlighted item index (-1 if none) */
  highlightedIndex: number;
  /** Set the highlighted index */
  setHighlightedIndex: (index: number) => void;
  /** Handle keyboard navigation */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Reset highlighted index */
  resetHighlight: () => void;
}

/**
 * Hook for managing dropdown/popup navigation with keyboard support
 * Handles ArrowDown, ArrowUp, Enter, and Escape keys
 */
export function useDropdownNavigation({
  itemCount,
  isOpen,
  onSelect,
  onClose,
}: UseDropdownNavigationOptions): UseDropdownNavigationReturn {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const resetHighlight = useCallback(() => {
    setHighlightedIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || itemCount === 0) {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < itemCount - 1 ? prev + 1 : prev,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            onSelect(highlightedIndex);
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          e.preventDefault();
          resetHighlight();
          onClose?.();
          break;
      }
    },
    [isOpen, itemCount, highlightedIndex, onSelect, onClose, resetHighlight],
  );

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
    resetHighlight,
  };
}
