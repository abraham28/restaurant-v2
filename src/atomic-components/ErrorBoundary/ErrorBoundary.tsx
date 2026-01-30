import React, { Component, ErrorInfo } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.scss';
import { Props, State } from './types';

interface ErrorBoundaryProps extends Props, WithTranslation {}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <h1 className={styles.errorTitle}>{t('somethingWentWrong')}</h1>
            <p className={styles.errorMessage}>
              {this.state.error?.message || t('unexpectedError')}
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              {t('reloadPage')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export the class component for proper TypeScript recognition
export { ErrorBoundary };

// Export the wrapped component as default
export default withTranslation('common')(ErrorBoundary);
