/**
 * Individual Store - Zustand Store for Individual Form Data
 *
 * This store manages the individual form state and automatically persists data to IndexedDB.
 * When the form is filled out and the tab is accidentally refreshed, the data will be
 * automatically restored from IndexedDB.
 *
 * Features:
 * - Auto-save form data to IndexedDB whenever form fields change
 * - Auto-load form data from IndexedDB on component mount
 * - Reset form functionality that clears both Zustand state and IndexedDB
 */

import { create } from 'zustand';
import localDB from 'localDB';

/**
 * Individual Form Data Interface
 */
export interface IndividualFormData {
  // Basic Information
  title: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;
  age: number;
  birthPlace: string;
  nationality: string;
  previousName: string;
  nickName: string;
  bloodType: string;
  weight: number;
  height: number;
  isDeceased: boolean;
  emailAddress: string;
  countryCode: string;
  mobileNumber: string;
  // Relationship
  isBeneficiary: boolean;
  primaryBeneficiary: string;
  // Education
  education: string;
  schoolLevel: string;
  // Dependents
  elementaryDependents: number;
  highSchoolDependents: number;
  collegeDependents: number;
  noOfDependents: number;
  // Cars Owned
  numberOfCarsOwned: number;
}

/**
 * Initial form data state
 */
const initialFormData: IndividualFormData = {
  title: '',
  lastName: '',
  firstName: '',
  middleName: '',
  suffix: '',
  gender: '',
  maritalStatus: '',
  birthDate: '',
  age: 0,
  birthPlace: '',
  nationality: '',
  previousName: '',
  nickName: '',
  bloodType: '',
  weight: 0,
  height: 0,
  isDeceased: false,
  emailAddress: '',
  countryCode: '',
  mobileNumber: '',
  isBeneficiary: false,
  primaryBeneficiary: '',
  education: '',
  schoolLevel: '',
  elementaryDependents: 0,
  highSchoolDependents: 0,
  collegeDependents: 0,
  noOfDependents: 0,
  numberOfCarsOwned: 0,
};

/**
 * Store state interface
 */
export interface IndividualFormState {
  formData: IndividualFormData;
  isLoading: boolean;
  draftId: string | null; // Current draft ID being edited
  // Actions
  setFormData: (data: Partial<IndividualFormData>) => void;
  resetForm: () => void;
  loadFormFromIndexedDB: () => Promise<void>;
  setDraftId: (draftId: string | null) => void;
  loadDraft: (draftId: string) => Promise<void>;
  // Internal: Auto-save function (called automatically on form data changes)
  _autoSave: () => Promise<void>;
}

/**
 * Zustand Store for Individual Form
 *
 * Usage:
 * const formData = useIndividualStore((state) => state.formData);
 * const setFormData = useIndividualStore((state) => state.setFormData);
 * const loadFormFromIndexedDB = useIndividualStore((state) => state.loadFormFromIndexedDB);
 */
export const useIndividualStore = create<IndividualFormState>((set, get) => ({
  formData: initialFormData,
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
      const draft = await localDB.getDraft<IndividualFormData>(draftId);
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
      draftId: null,
    });
    void localDB.removeClientFormData().catch((error) => {
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
      const savedData = await localDB.getClientFormData<IndividualFormData>();
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

      // Generate client name from form data
      const clientName =
        state.formData.firstName || state.formData.lastName
          ? `${state.formData.firstName || ''} ${state.formData.lastName || ''}`.trim()
          : undefined;

      // Save as draft with Individual client type
      await localDB.storeDraft(
        currentDraftId,
        state.formData,
        clientName,
        'Individual',
      );

      // Update draftId if it was null (first save)
      if (!state.draftId) {
        set({ draftId: currentDraftId });
      }

      // Also save to client_form_data for backward compatibility
      await localDB.storeClientFormData(state.formData);
    } catch (error) {
      console.error('Failed to auto-save form data to IndexedDB:', error);
    }
  },
}));
