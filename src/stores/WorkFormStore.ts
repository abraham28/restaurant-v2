import { create } from 'zustand';
import {
  type WorkFormData,
  type WorkEntry,
  initialWorkFormData,
} from 'types/workForm';

export type WorkFormErrors = Partial<Record<keyof WorkFormData, string>>;

export interface WorkFormState {
  workFormData: WorkFormData;
  workFormErrors: WorkFormErrors;
  workEntries: WorkEntry[];
  setWorkFormData: (data: Partial<WorkFormData>) => void;
  setWorkFormErrors: (errors: WorkFormErrors) => void;
  resetWorkForm: () => void;
  addWorkEntry: (entry: Omit<WorkEntry, 'id'>) => void;
  updateWorkEntry: (id: string, data: Partial<WorkFormData>) => void;
  removeWorkEntry: (id: string) => void;
}

export const useWorkFormStore = create<WorkFormState>((set) => ({
  workFormData: initialWorkFormData,
  workFormErrors: {},
  workEntries: [],

  setWorkFormData: (data) => {
    set((state) => ({
      workFormData: { ...state.workFormData, ...data },
    }));
  },

  setWorkFormErrors: (errors) => {
    set({ workFormErrors: errors });
  },

  resetWorkForm: () => {
    set({
      workFormData: initialWorkFormData,
      workFormErrors: {},
    });
  },

  addWorkEntry: (entry) => {
    const id = `work-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    set((state) => ({
      workEntries: [...state.workEntries, { ...entry, id }],
    }));
  },

  updateWorkEntry: (id, data) => {
    set((state) => ({
      workEntries: state.workEntries.map((e) =>
        e.id === id ? { ...e, ...data } : e,
      ),
    }));
  },

  removeWorkEntry: (id) => {
    set((state) => ({
      workEntries: state.workEntries.filter((e) => e.id !== id),
    }));
  },
}));
