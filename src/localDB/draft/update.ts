/**
 * Draft Update Operations
 *
 * Functions for updating existing drafts
 */

import { storeDraft } from './create';

/**
 * Update an existing draft
 *
 * This is a convenience wrapper around storeDraft that explicitly indicates
 * an update operation. Internally, storeDraft handles both create and update.
 *
 * @param draftId - Unique identifier for the draft to update
 * @param formData - The updated form data
 * @param displayName - Optional updated display name
 * @param category - Optional updated category
 * @returns Promise that resolves when draft is updated
 *
 * @example
 * await updateDraft('draft_123', updatedFormData, 'Updated Draft', 'Form');
 */
export async function updateDraft<T>(
  draftId: string,
  formData: T,
  displayName?: string,
  category?: string,
): Promise<void> {
  return storeDraft(draftId, formData, displayName, category);
}

/**
 * Update only the metadata of a draft (displayName, category)
 * without changing the form data
 *
 * @param draftId - Unique identifier for the draft
 * @param displayName - Updated display name
 * @param category - Updated category
 * @returns Promise that resolves when metadata is updated
 *
 * @example
 * await updateDraftMetadata('draft_123', 'New Draft Name', 'Form');
 */
export async function updateDraftMetadata<T>(
  draftId: string,
  displayName?: string,
  category?: string,
): Promise<void> {
  // Get existing draft first
  const { getDraft } = await import('./read');
  const existingDraft = await getDraft<T>(draftId);

  if (!existingDraft) {
    throw new Error(`Draft with ID "${draftId}" not found`);
  }

  // Update with existing form data but new metadata
  return storeDraft(draftId, existingDraft.formData, displayName, category);
}
