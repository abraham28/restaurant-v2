/**
 * Drafts Store - Zustand Store for Managing Client Drafts List
 *
 * This store manages the list of client drafts and provides functions
 * to load, refresh, and manage drafts from IndexedDB.
 *
 * Features:
 * - Load all drafts from IndexedDB
 * - Refresh drafts list
 * - Manage loading state
 */

import { create } from 'zustand';
import localDB, { type DraftMetadata } from 'localDB';

/**
 * Drafts Store state interface
 */
export interface DraftsState {
  drafts: DraftMetadata[];
  loading: boolean;
  // Actions
  loadDrafts: () => Promise<void>;
  refreshDrafts: () => Promise<void>;
}

/**
 * Zustand Store for Drafts Management
 *
 * Usage:
 * const drafts = useDraftsStore((state) => state.drafts);
 * const loading = useDraftsStore((state) => state.loading);
 * const loadDrafts = useDraftsStore((state) => state.loadDrafts);
 */
export const useDraftsStore = create<DraftsState>((set, get) => ({
  drafts: [],
  loading: false,

  /**
   * Load all drafts from IndexedDB
   */
  loadDrafts: async () => {
    set({ loading: true });
    try {
      const allDrafts = await localDB.getAllDrafts();
      set({ drafts: allDrafts });
    } catch (error) {
      console.error('Failed to load drafts:', error);
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Refresh drafts list (alias for loadDrafts)
   */
  refreshDrafts: async () => {
    await get().loadDrafts();
  },
}));
