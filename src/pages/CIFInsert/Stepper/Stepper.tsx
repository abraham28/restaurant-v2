import React from 'react';
import { Check } from 'lucide-react';
import styles from './Stepper.module.scss';
import { StepperProps } from './types';

function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;
        const isClickable = !step.disabled && onStepClick;

        return (
          <React.Fragment key={step.id}>
            <div
              className={`${styles.step} ${isCompleted ? styles.completed : ''} ${
                isCurrent ? styles.current : ''
              } ${isLast ? styles.last : ''} ${step.disabled ? styles.disabled : ''} ${
                isClickable ? styles.clickable : ''
              }`}
              onClick={() => isClickable && onStepClick?.(step.id)}
            >
              <div className={styles.stepContent}>
                {isCompleted && (
                  <div className={`${styles.stepIcon} ${styles.iconCompleted}`}>
                    <Check size={16} />
                  </div>
                )}
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            </div>
            {!isLast && (
              <div
                className={`${styles.arrow} ${
                  isCompleted ? styles.arrowCompleted : ''
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
