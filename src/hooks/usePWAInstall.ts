import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAInstallReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  installReason: string | null;
  install: () => Promise<void>;
}

export function usePWAInstall(): UsePWAInstallReturn {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installReason, setInstallReason] = useState<string | null>(null);

  // Function to check if app is installed
  const checkIfInstalled = useCallback(() => {
    // Method 1: Standard display-mode check (most reliable)
    const isStandaloneMode = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;

    // Method 2: iOS Safari specific check
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isIOSStandalone = nav.standalone === true;

    // Method 3: Check if in fullscreen/minimal-ui mode (PWA indicators)
    const isFullscreenMode = window.matchMedia(
      '(display-mode: fullscreen)',
    ).matches;
    const isMinimalUIMode = window.matchMedia(
      '(display-mode: minimal-ui)',
    ).matches;

    // Method 4: Check if no browser chrome (window dimensions match)
    // This is less reliable but can help in some cases
    const noBrowserChrome =
      window.outerHeight === window.innerHeight &&
      window.outerWidth === window.innerWidth &&
      (isFullscreenMode || isMinimalUIMode);

    // Method 5: Check if launched from home screen (no referrer + standalone)
    const launchedFromHomeScreen =
      document.referrer === '' && (isStandaloneMode || isIOSStandalone);

    // Return true if any method indicates installation
    return (
      isStandaloneMode ||
      isIOSStandalone ||
      (isFullscreenMode && noBrowserChrome) ||
      launchedFromHomeScreen
    );
  }, []);

  useEffect(() => {
    // Check if app is already installed (run immediately and on focus)
    const checkInstalled = () => {
      if (checkIfInstalled()) {
        setIsInstalled(true);
        setInstallReason('App is already installed on your device.');
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkInstalled()) {
      return;
    }

    // Also check when window gains focus (in case detection was too early)
    const handleFocus = () => {
      checkInstalled();
    };

    window.addEventListener('focus', handleFocus);

    // Check if browser supports PWA installation
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !isChrome;

    // Check if service worker is supported
    const hasServiceWorker = 'serviceWorker' in navigator;

    // Determine why installation might not be available
    if (!hasServiceWorker) {
      setInstallReason(
        'Your browser does not support service workers. Please use a modern browser.',
      );
    } else if (isIOS && !isSafari) {
      setInstallReason(
        'On iOS, please use Safari and tap the Share button, then "Add to Home Screen".',
      );
    } else if (isIOS && isSafari) {
      setInstallReason(
        'On iOS Safari, tap the Share button (square with arrow) and select "Add to Home Screen".',
      );
    } else if (!isChrome && !isEdge && !isSafari) {
      setInstallReason(
        'PWA installation is best supported on Chrome, Edge, or Safari browsers.',
      );
    } else {
      setInstallReason(
        'Installation will be available once all PWA requirements are met.',
      );
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default mini-infobar from appearing
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setInstallReason(null); // Clear reason when installable
    };

    // Listen for the app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallReason('App is already installed on your device.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [checkIfInstalled]);

  const install = async () => {
    if (!deferredPrompt) {
      throw new Error('Install prompt is not available.');
    }

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferred prompt
    setDeferredPrompt(null);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Installation will proceed, appinstalled event will fire
    } else {
      console.log('User dismissed the install prompt');
      throw new Error('Installation was cancelled.');
    }
  };

  return {
    isInstallable: deferredPrompt !== null,
    isInstalled,
    installReason,
    install,
  };
}
