/** Default avatar used when user has no profile photo */
const DEFAULT_USER_AVATAR = '/user-avatar.png';

/**
 * Returns the URL for the user's profile photo.
 * Uses the default avatar when no user image is available.
 *
 * @param userPhotoUrl - Optional URL of the user's profile photo (from auth/session)
 * @returns URL string for the profile image
 */
export function getUserProfilePhoto(userPhotoUrl?: string | null): string {
  return userPhotoUrl ?? DEFAULT_USER_AVATAR;
}
