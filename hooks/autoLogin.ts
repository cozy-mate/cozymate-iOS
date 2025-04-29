import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { reissueToken } from '@/apis/auth/auth';
import { getMemberProfile } from '@/apis/member/member';
import { getMyDetail } from '@/apis/member-stat/member-stat';
import { checkHasRoom } from '@/apis/room/room';
import { deleteToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';
import { useAuthProvider } from '@/providers/AuthProvider';

export const useAutoLogin = (setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
  const router = useRouter();

  const { setMemberState } = useMemberStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setRoomInfo } = useHasRoomStore();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const refreshToken = await getRefreshToken();
        console.log('리프레쉬 : ', refreshToken);

        if (!refreshToken) {
          //   setIsLoggedIn(false);
          await deleteToken();
          setAppLoaded(true);
          return;
        }
        try {
          console.log('토큰 재발급 실행');
          const newTokens = await reissueToken(refreshToken);
          console.log(newTokens);

          await Promise.all([
            setAccessToken(newTokens.result.tokenResponseDTO.accessToken),
            setRefreshToken(newTokens.result.tokenResponseDTO.refreshToken),
          ])

          const response = await getMemberProfile();
          setMemberState(response.result);

          try {
            await getMyDetail();
            setHasLifeStyle(true);
          } catch (error: any) {
            if (error.response?.data?.code === 'MEMBERSTAT402') {
              setHasLifeStyle(false);
            }
          }

          const hasRoomResponse = await checkHasRoom();
          setRoomInfo(hasRoomResponse.result);

          router.replace('/(tabs)/home');
        } catch (error: any) {
          console.log(error);
          //   setIsLoggedIn(false);
          await deleteToken();
          setAppLoaded(true);
          return;
        }

        // setIsLoggedIn(true);
        setAppLoaded(true);
      } catch (error: any) {
        // setIsLoggedIn(false);
        await deleteToken();
        setAppLoaded(true);
        return;
      }
    };
    checkLoggedIn()
  }, []);
};
