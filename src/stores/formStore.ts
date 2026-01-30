/**
 * Generic Form Store - Zustand Store for Form Data Management
 *
 * This store manages form state and automatically persists data to IndexedDB.
 * When the form is filled out and the tab is accidentally refreshed, the data will be
 * automatically restored from IndexedDB.
 *
 * Features:
 * - Auto-save form data to IndexedDB whenever form fields change
 * - Auto-load form data from IndexedDB on component mount
 * - Reset form functionality that clears both Zustand state and IndexedDB
 * - Active tab persistence
 * - Draft management with customizable naming and categorization
 *
 * @template TFormData - The type of form data to manage
 */

import { create } from 'zustand';
import localDB from 'localDB';
import { storeData, getData, removeData } from 'localDB/store';

/**
 * Configuration options for creating a form store
 */
export interface FormStoreConfig<TFormData extends Record<string, unknown>> {
  /** Initial form data state */
  initialFormData: TFormData;
  /** Storage key for IndexedDB (default: 'form_data') */
  storageKey?: string;
  /** Default active tab (default: 'default') */
  defaultActiveTab?: string;
  /** Function to generate a display name from form data for drafts */
  getDraftName?: (formData: TFormData) => string | undefined;
  /** Default category/type for drafts (default: 'Form') */
  defaultDraftCategory?: string;
  /** Function to determine draft category from form data */
  getDraftCategory?: (formData: TFormData) => string;
}

/**
 * Store state interface
 */
export interface FormStoreState<TFormData extends Record<string, unknown>> {
  formData: TFormData;
  activeTab: string;
  isLoading: boolean;
  draftId: string | null;
  // Actions
  setFormData: (data: Partial<TFormData>) => void;
  setActiveTab: (tab: string) => void;
  resetForm: () => void;
  loadFormFromIndexedDB: () => Promise<void>;
  setDraftId: (draftId: string | null) => void;
  loadDraft: (draftId: string) => Promise<void>;
  // Internal: Auto-save function (called automatically on form data changes)
  _autoSave: () => Promise<void>;
}

/**
 * Creates a generic form store with auto-save and draft management
 *
 * @param config - Configuration options for the store
 * @returns A Zustand store hook
 *
 * @example
 * ```typescript
 * interface MyFormData {
 *   name: string;
 *   email: string;
 * }
 *
 * const useMyFormStore = createFormStore<MyFormData>({
 *   initialFormData: { name: '', email: '' },
 *   storageKey: 'my_form_data',
 *   getDraftName: (data) => data.name || undefined,
 *   defaultDraftCategory: 'Contact',
 * });
 *
 * // Usage in component:
 * const formData = useMyFormStore((state) => state.formData);
 * const setFormData = useMyFormStore((state) => state.setFormData);
 * ```
 */
export function createFormStore<TFormData extends Record<string, unknown>>(
  config: FormStoreConfig<TFormData>,
) {
  const {
    initialFormData,
    storageKey = 'form_data',
    defaultActiveTab = 'default',
    getDraftName,
    defaultDraftCategory = 'Form',
    getDraftCategory,
  } = config;

  return create<FormStoreState<TFormData>>((set, get) => ({
    formData: initialFormData,
    activeTab: defaultActiveTab,
    isLoading: false,
    draftId: null,

    /**
     * Update form data and auto-save to IndexedDB
     */
    setFormData: (data) => {
      set((state) => ({
        formData: { ...state.formData, ...data },
      }));
      // Auto-save to IndexedDB after state update
      // Use setTimeout to ensure state is updated before saving
      setTimeout(() => {
        void get()._autoSave();
      }, 0);
    },

    /**
     * Set active tab
     */
    setActiveTab: (tab) => {
      set({ activeTab: tab });
    },

    /**
     * Set draft ID (used when editing an existing draft or creating new one)
     */
    setDraftId: (draftId) => {
      set({ draftId });
    },

    /**
     * Load a specific draft by ID
     */
    loadDraft: async (draftId: string) => {
      set({ isLoading: true });
      try {
        const draft = await localDB.getDraft<TFormData>(draftId);
        if (draft) {
          set({
            formData: draft.formData,
            draftId: draft.id,
          });
        }
      } catch (error) {
        console.error('Failed to load draft from IndexedDB:', error);
      } finally {
        set({ isLoading: false });
      }
    },

    /**
     * Reset form to initial state and clear IndexedDB
     */
    resetForm: () => {
      set({
        formData: initialFormData,
        activeTab: defaultActiveTab,
        draftId: null,
      });
      void removeData(storageKey).catch((error) => {
        console.error('Failed to remove form data from IndexedDB:', error);
      });
    },

    /**
     * Load form data from IndexedDB
     * Call this on component mount to restore saved data
     */
    loadFormFromIndexedDB: async (): Promise<void> => {
      set({ isLoading: true });
      try {
        const savedData = await getData<TFormData>(storageKey);
        if (savedData) {
          set({ formData: savedData });
        }
      } catch (error) {
        console.error('Failed to load form data from IndexedDB:', error);
      } finally {
        set({ isLoading: false });
      }
    },

    /**
     * Internal: Auto-save form data to IndexedDB as draft
     * Called automatically whenever formData changes
     */
    _autoSave: async () => {
      try {
        const state = get();
        const currentDraftId = state.draftId || localDB.generateDraftId();

        // Generate draft name using provided function or undefined
        const draftName = getDraftName
          ? getDraftName(state.formData)
          : undefined;

        // Determine draft category
        const draftCategory = getDraftCategory
          ? getDraftCategory(state.formData)
          : defaultDraftCategory;

        // Save as draft
        await localDB.storeDraft(
          currentDraftId,
          state.formData,
          draftName,
          draftCategory,
        );

        // Update draftId if it was null (first save)
        if (!state.draftId) {
          set({ draftId: currentDraftId });
        }

        // Also save to form_data store using the configured storage key
        await storeData(storageKey, state.formData);
      } catch (error) {
        console.error('Failed to auto-save form data to IndexedDB:', error);
      }
    },
  }));
}
