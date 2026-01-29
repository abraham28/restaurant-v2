import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import styles from './Stepper.module.scss';
import { StepperProps } from './types';

/** 360px design stays as-is (narrow: 3 steps + "and more"). Above this we collapse middle. */
const NARROW_BREAKPOINT_PX = 360;

function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const [isNarrow, setIsNarrow] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth <= NARROW_BREAKPOINT_PX,
  );
  /** Above 360px: max index to show before last step (length-2 = show all). */
  const [maxMiddleIndex, setMaxMiddleIndex] = useState(() =>
    Math.max(0, steps.length - 2),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkWidth = () => {
      const parent = el.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const narrow = width <= NARROW_BREAKPOINT_PX;
      setIsNarrow(narrow);
      if (!narrow) {
        setMaxMiddleIndex(Math.max(0, steps.length - 2));
      }
    };

    checkWidth();

    const parent = el.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(checkWidth);
    ro.observe(parent);

    return () => ro.disconnect();
  }, [steps.length]);

  // Above 360px: if content overflows, hide one more middle step (show 1..k, last).
  useLayoutEffect(() => {
    if (isNarrow || steps.length <= 2) return;

    const el = containerRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const overflow = el.scrollWidth > parent.clientWidth;
    if (overflow && maxMiddleIndex > 0) {
      setMaxMiddleIndex((prev) => Math.max(0, prev - 1));
    }
  }, [isNarrow, steps.length, maxMiddleIndex]);

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
