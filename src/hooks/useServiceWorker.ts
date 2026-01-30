import { useEffect, useState, useRef } from 'react';

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null;
  isUpdateAvailable: boolean;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    registration: null,
    isUpdateAvailable: false,
  });

  // Track if component is mounted to prevent setState on unmounted component
  const isMountedRef = useRef(true);
  // Store cleanup function that can be called even if promise hasn't resolved
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    isMountedRef.current = true;
    let registration: ServiceWorkerRegistration | null = null;
    let handleUpdate: (() => void) | null = null;

    // Safe setState wrapper that checks if component is still mounted
    const safeSetState = (
      updater:
        | ServiceWorkerState
        | ((prev: ServiceWorkerState) => ServiceWorkerState),
    ) => {
      if (isMountedRef.current) {
        setState(updater);
      }
    };

    void navigator.serviceWorker.ready.then((reg) => {
      // Check if component is still mounted before proceeding
      if (!isMountedRef.current) {
        return;
      }

      registration = reg;
      safeSetState({
        registration: reg,
        isUpdateAvailable: !!reg.waiting,
      });

      // Listen for updates
      handleUpdate = () => {
        safeSetState((prev) => ({
          ...prev,
          isUpdateAvailable: true,
        }));
      };

      reg.addEventListener('updatefound', handleUpdate);

      // Check if there's a waiting service worker
      if (reg.waiting) {
        safeSetState((prev) => ({
          ...prev,
          isUpdateAvailable: true,
        }));
      }

      // Store cleanup function for this registration
      cleanupRef.current = () => {
        if (registration && handleUpdate) {
          registration.removeEventListener('updatefound', handleUpdate);
        }
      };
    });

    // Cleanup function returned directly from useEffect
    return () => {
      isMountedRef.current = false;
      // Execute cleanup if it exists (either from resolved promise or stored)
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      // Also check local variables in case cleanupRef wasn't set yet
      if (registration && handleUpdate) {
        registration.removeEventListener('updatefound', handleUpdate);
      }
    };
  }, []);

  return state;
}
