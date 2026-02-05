import React from 'react';
import { useTranslation } from 'react-i18next';
import { getUserProfilePhoto } from 'utils/userProfileUtils';
import styles from './UserProfile.module.scss';
import { UserProfileProps } from './types';

function UserProfile({ userName, userPhotoUrl }: UserProfileProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.userAvatar}>
        <img
          src={getUserProfilePhoto(userPhotoUrl)}
          alt={t('userAvatar')}
          className={styles.avatarImage}
        />
      </div>
      <span className={styles.userName}>{userName}</span>
    </>
  );
}

export default UserProfile;
