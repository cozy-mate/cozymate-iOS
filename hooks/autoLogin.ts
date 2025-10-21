import { useEffect } from 'react';

import { reissueToken } from '@/server/auth/auth';
import { getMemberProfile } from '@/server/member/member';
import { getMyDetail } from '@/server/member-stat/member-stat';
import { checkHasRoom } from '@/server/room/room';
import { deleteToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/store';

export const useAutoLogin = () => {
  const { setMemberInfo, setHasLifeStyle, setRoom } = useMemberStore();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const refreshToken = await getRefreshToken();
        console.log('리프레쉬 : ', refreshToken);

        if (!refreshToken) {
          await deleteToken();
          return;
        }
        try {
          console.log('토큰 재발급 실행');
          const newTokens = await reissueToken(refreshToken);
          console.log(newTokens);

          await setAccessToken(newTokens.result.tokenResponseDTO.accessToken);
          await setRefreshToken(newTokens.result.tokenResponseDTO.refreshToken);

          const response = await getMemberProfile();
          setMemberInfo(response.result);

          try {
            await getMyDetail();
            setHasLifeStyle();
          } catch (error: any) {
            if (error.response?.data?.code === 'MEMBERSTAT402') {
              console.log('라이프스타일이 없음');
            } else {
              console.log('서버 오류', error);
            }
          }

          try {
            const hasRoomResponse = await checkHasRoom();

            if (hasRoomResponse.result.roomId !== 0) {
              setRoom(hasRoomResponse.result);
            }
          } catch (error: any) {
            console.log('서버 오류', error);
            setRoom({
              roomId: 0,
              isRoomManager: false,
            });
          }
        } catch (error: any) {
          console.log(error);
          await deleteToken();
          return;
        }
      } catch (error: any) {
        await deleteToken();
        return;
      }
    };
    checkLoggedIn();
  }, []);
};
