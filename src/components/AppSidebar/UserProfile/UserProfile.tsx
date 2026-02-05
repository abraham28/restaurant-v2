import React from 'react';
import { getUserProfilePhoto } from 'utils/userProfileUtils';
import styles from './UserProfile.module.scss';
import { UserProfileProps } from './types';

function UserProfile({ userName, userPhotoUrl }: UserProfileProps) {
  return (
    <>
      <div className={styles.userAvatar}>
        <img
          src={getUserProfilePhoto(userPhotoUrl)}
          alt="User Avatar"
          className={styles.avatarImage}
        />
      </div>
      <span className={styles.userName}>{userName}</span>
    </>
  );
}

export default UserProfile;
