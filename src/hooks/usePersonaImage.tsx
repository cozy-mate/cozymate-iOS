import { useState } from 'react';
export const usePersonaImage = (personaId:number) => {

  const PERSONA_IMAGE_URL = `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${personaId}.png`;

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
    handleProfileImageLoadEnd
  }

};