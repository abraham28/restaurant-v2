import React, { useEffect, useRef, useState } from 'react';
import styles from './Stepper.module.scss';
import { StepperProps } from './types';

/** At or below this width: narrow CSS (smaller connectors). */
const NARROW_BREAKPOINT_PX = 360;

/**
 * Max number of circles by breakpoint. When not full width, show (maxVisible - 1) sliding
 * steps + last (10) so the "next" number stays hidden until you get there.
 * - >= 960px: all steps
 * - >= 720px: 8 circles (7 sliding + 10)
 * - >= 640px: 7 circles (6 sliding + 10)
 * - >= 480px: 5 circles (4 sliding + 10)
 * - > 360px: 4 circles (3 sliding + 10)
 * - <= 360px: 4 circles (3 sliding + 10) e.g. 1,2,3,10 → 2,3,4,10 → 3,4,5,10
 */
function getMaxVisibleForWidth(width: number, stepsLength: number): number {
  if (width >= 960) return stepsLength;
  if (width >= 720) return Math.min(8, stepsLength);
  if (width >= 640) return Math.min(7, stepsLength);
  if (width >= 480) return Math.min(5, stepsLength);
  return Math.min(4, stepsLength); // 360px and below: 4 circles (1,2,3,10 style)
}

function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 960,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkWidth = () => {
      const parent = el.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      setContainerWidth(width);
    };

    checkWidth();

    const parent = el.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(checkWidth);
    ro.observe(parent);

    return () => ro.disconnect();
  }, [steps.length]);

  const maxVisible = getMaxVisibleForWidth(containerWidth, steps.length);
  const useSlidingWindow = maxVisible < steps.length;
  const isNarrow = containerWidth <= NARROW_BREAKPOINT_PX;
  const lastStepIndex = steps.length - 1;

  // Sliding + last(10): (maxVisible - 1) steps before current + step 10. Next number stays hidden.
  const slidingCount = maxVisible - 1;
  const visibleStart = useSlidingWindow
    ? Math.max(
        0,
        Math.min(
          currentStep - (slidingCount - 1),
          lastStepIndex - (maxVisible - 1),
        ),
      )
    : 0;
  const visibleIndices = useSlidingWindow
    ? (() => {
        const sliding = Array.from(
          { length: slidingCount },
          (_, i) => visibleStart + i,
        );
        return sliding.includes(lastStepIndex)
          ? sliding
          : [...sliding, lastStepIndex];
      })()
    : [];

  const visibleSteps = useSlidingWindow
    ? visibleIndices.map((i) => steps[i])
    : steps;

  const hasMoreAfter = false;

  const getActualIndex = (step: (typeof steps)[0], index: number) => {
    if (useSlidingWindow) return visibleIndices[index];
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
        useSlidingWindow ? styles.stepperCollapsed : ''
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
