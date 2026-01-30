import React, { useEffect, useRef, useState } from 'react';
import styles from './Stepper.module.scss';
import { StepperProps } from './types';

/** Below 360px: narrow mode (3 steps + "and more"). */
const NARROW_BREAKPOINT_PX = 360;

/**
 * Breakpoint-based max middle index (0-based). Visible steps = [0..maxMiddleIndex, last].
 * - >= 960px: 1,2,3,4,5,6,7,8,9,10 (all steps)
 * - >= 720px: 1,2,3,4,5,6,7,8,10 → maxMiddleIndex = 7
 * - >= 640px: 1,2,3,4,5,6,7,10 → maxMiddleIndex = 6
 * - >= 480px: 1,2,3,4,5,10 → maxMiddleIndex = 4
 * - >= 360px (e.g. 479px): 1,2,3,4,10 → maxMiddleIndex = 3
 */
function getMaxMiddleIndexForWidth(width: number, stepsLength: number): number {
  const maxAllowed = Math.max(0, stepsLength - 2);
  if (width >= 960) return maxAllowed; // show all 1..10
  if (width >= 720) return Math.min(7, maxAllowed);
  if (width >= 640) return Math.min(6, maxAllowed);
  if (width >= 480) return Math.min(4, maxAllowed);
  if (width >= 360) return Math.min(3, maxAllowed); // 1,2,3,4,10
  return maxAllowed;
}

function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const [isNarrow, setIsNarrow] = useState(
    () =>
      typeof window !== 'undefined' && window.innerWidth < NARROW_BREAKPOINT_PX,
  );
  const [maxMiddleIndex, setMaxMiddleIndex] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 960;
    return getMaxMiddleIndexForWidth(w, steps.length);
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkWidth = () => {
      const parent = el.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const narrow = width < NARROW_BREAKPOINT_PX;
      setIsNarrow(narrow);
      if (!narrow) {
        setMaxMiddleIndex(getMaxMiddleIndexForWidth(width, steps.length));
      }
    };

    checkWidth();

    const parent = el.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(checkWidth);
    ro.observe(parent);

    return () => ro.disconnect();
  }, [steps.length]);

  // Narrow: sliding window of 3 steps + "and more". Wide: all or 1..k, last.
  const isCollapsed = !isNarrow && maxMiddleIndex < steps.length - 2;
  const visibleStart = isNarrow
    ? Math.max(0, Math.min(currentStep - 1, steps.length - 3))
    : 0;
  const visibleEnd = isNarrow
    ? Math.min(visibleStart + 3, steps.length)
    : steps.length;

  const visibleSteps = isNarrow
    ? steps.slice(visibleStart, visibleEnd)
    : isCollapsed
      ? [...steps.slice(0, maxMiddleIndex + 1), steps[steps.length - 1]]
      : steps;

  const hasMoreAfter = isNarrow && visibleStart + 3 < steps.length;

  const getActualIndex = (step: (typeof steps)[0], index: number) => {
    if (isNarrow) return visibleStart + index;
    if (isCollapsed) {
      if (index <= maxMiddleIndex) return index;
      return steps.length - 1;
    }
    return index;
  };

  const renderStep = (step: (typeof steps)[0], index: number) => {
    const actualIndex = getActualIndex(step, index);
    const isCompleted = actualIndex < currentStep;
    const isCurrent = actualIndex === currentStep;
    const isActive = isCompleted || isCurrent;
    const isLastInVisible = index === visibleSteps.length - 1 && !hasMoreAfter;
    const isClickable = !step.disabled && onStepClick;
    const isConnectorActive = actualIndex < currentStep;

    return (
      <React.Fragment key={step.id}>
        <div
          className={`${styles.step} ${isActive ? styles.active : ''} ${
            isCurrent ? styles.current : ''
          } ${step.disabled ? styles.disabled : ''} ${
            isClickable ? styles.clickable : ''
          }`}
          onClick={() => isClickable && onStepClick?.(step.id)}
        >
          <div className={styles.outerCircle}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>{actualIndex + 1}</span>
            </div>
          </div>
        </div>
        {!isLastInVisible && (
          <div
            className={`${styles.connector} ${
              isConnectorActive ? styles.connectorActive : ''
            }`}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.stepper} ${isNarrow ? styles.stepperNarrow : ''} ${
        isCollapsed ? styles.stepperCollapsed : ''
      }`}
    >
      {visibleSteps.map((step, index) => renderStep(step, index))}
      {hasMoreAfter && (
        <>
          <div className={styles.connector} />
          <div className={styles.andMore} aria-hidden="true">
            <span className={styles.andMoreNumber}>{steps.length}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Stepper;
