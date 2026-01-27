import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './ServiceWorkerUpdatePrompt.module.scss';
import { ServiceWorkerUpdatePromptProps } from './types';

function ServiceWorkerUpdatePrompt({
  registration,
}: ServiceWorkerUpdatePromptProps) {
  const [show, setShow] = useState(false);
  const stateChangeListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Check if there's already a waiting service worker
    if (registration.waiting) {
      setShow(true);
    }

    // Listen for when a new service worker starts installing
    const handleUpdateFound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) {
        return;
      }

      // Clean up any previous statechange listener
      if (stateChangeListenerRef.current) {
        stateChangeListenerRef.current();
        stateChangeListenerRef.current = null;
      }

      // Listen for state changes on the installing worker
      const handleStateChange = () => {
        // Only show the prompt when the worker reaches 'installed' state
        // At this point, it will be in the 'waiting' state
        if (installingWorker.state === 'installed') {
          // Check immediately first (in case registration.waiting is already updated)
          if (registration.waiting) {
            setShow(true);
            return;
          }
          // If not immediately available, check again on next tick
          // This handles any potential timing issues
          setTimeout(() => {
            if (registration.waiting) {
              setShow(true);
            }
          }, 0);
        }
      };

      installingWorker.addEventListener('statechange', handleStateChange);

      // Store cleanup function
      stateChangeListenerRef.current = () => {
        installingWorker.removeEventListener('statechange', handleStateChange);
      };

      // Also check current state in case it's already installed
      if (installingWorker.state === 'installed' && registration.waiting) {
        setShow(true);
      }
    };

    registration.addEventListener('updatefound', handleUpdateFound);

    return () => {
      registration.removeEventListener('updatefound', handleUpdateFound);
      // Clean up statechange listener if it exists
      if (stateChangeListenerRef.current) {
        stateChangeListenerRef.current();
        stateChangeListenerRef.current = null;
      }
    };
  }, [registration]);

  const handleUpdate = () => {
    if (registration.waiting) {
      // Tell the service worker to skip waiting and become active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      setShow(false);

      // Wait for the new service worker to become the active controller
      // before reloading to avoid race condition
      let reloaded = false;
      const reload = () => {
        if (!reloaded) {
          reloaded = true;
          window.location.reload();
        }
      };

      const handleControllerChange = () => {
        // Remove the listener to prevent multiple reloads
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          handleControllerChange,
        );
        // Clear the timeout since controllerchange fired
        clearTimeout(timeoutId);
        // Reload the page to get the new version
        reload();
      };

      // Fallback timeout: if controllerchange doesn't fire within 5 seconds,
      // reload anyway (shouldn't happen, but safety net)
      const timeoutId = setTimeout(() => {
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          handleControllerChange,
        );
        reload();
      }, 5000);

      // Listen for controller change (new service worker activated)
      navigator.serviceWorker.addEventListener(
        'controllerchange',
        handleControllerChange,
      );
    }
  };

  const handleDismiss = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Available</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          A new version of the app is available. Would you like to update now?
        </p>
        <p className={styles.note}>
          <small>
            Updating will reload the page with the latest features and
            improvements.
          </small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDismiss}>
          Later
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ServiceWorkerUpdatePrompt;
