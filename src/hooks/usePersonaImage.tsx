import { useState } from 'react';
import Config from 'react-native-config';

export const usePersonaImage = (personaId: number) => {
  const PERSONA_IMAGE_URL = `${Config.S3_IMAGE_URL}/persona/png/${personaId}.png`;

  const [loadingProfile, setLoadingProfile] = useState(true);

  const handleProfileImageLoadStart = () => {
    setLoadingProfile(true);
  };

  const handleProfileImageLoadEnd = () => {
    setLoadingProfile(false);
  };

  return {
    PERSONA_IMAGE_URL,
    loadingProfile,
    handleProfileImageLoadStart,
    handleProfileImageLoadEnd,
  };
};
