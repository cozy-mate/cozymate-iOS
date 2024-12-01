import { useEffect } from 'react';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useProfileStore, useLoggedInStore, useIsVerifiedStore } from '@zustand/member/member';
import {
  useLifeStyleStore,
  usePreferencesStore,
  useHasLifeStyleStore,
} from '@zustand/member-stat/member-stat';

import { reissueToken } from '@server/api/auth';
import { checkVerified } from '@server/api/mail';
import { getMyProfile } from '@server/api/member';
import { getMemberStatData } from '@server/api/member-stat';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { getPreferenceList } from '@server/api/member-stat-preference';

import { deleteToken, setAccessToken, setRefreshToken, getRefreshToken } from '@utils/token';

export const useAutoLogin = (setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { setLoggedIn } = useLoggedInStore();

  // 프로필 정보
  const { setProfile } = useProfileStore();
  const { setIsVerified } = useIsVerifiedStore();
  const { setPreferenceList } = usePreferencesStore();
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  const start = Date.now();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        const oldRefreshToken = await getRefreshToken();

        if (!oldRefreshToken) {
          setLoggedIn(false);
          await deleteToken();
          const elapsed = Date.now() - start;
          const remainingTime = 3500 - elapsed;
          setTimeout(() => setAppLoaded(true), remainingTime > 0 ? remainingTime : 0);
          return;
        }

        try {
          await setAccessToken(oldRefreshToken);
          const response = await reissueToken();

          // 토큰 저장
          await Promise.all([
            setAccessToken(response.result.accessToken),
            setRefreshToken(response.result.refreshToken),
          ]);

          console.log(response.result.accessToken);
        } catch (error: any) {
          console.log(error.response);
        }

        const profileResponse = await getMyProfile();
        setProfile(profileResponse.result);

        const checkVerifiedResponse = await checkVerified();
        setIsVerified(checkVerifiedResponse.result);

        const preferenceResponse = await getPreferenceList();
        setPreferenceList(preferenceResponse.result.preferenceList);

        // 방 존재 여부 확인
        const roomCheckResponse = await checkHasRoom();
        const roomId = roomCheckResponse.result.roomId;

        // 방이 존재하는 경우 방 정보 저장
        if (roomId !== 0) {
          const roomInfoResponse = await getRoomData(roomId);

          setMyRoom({
            hasRoom: true,
            roomId,
            isRoomManager: roomInfoResponse.result.isRoomManager,
            isFullRoom:
              roomInfoResponse.result.arrivalMateNum === roomInfoResponse.result.maxMateNum,
          });

          setRoomInfo(roomInfoResponse.result);
          setMyRoom({});
        } else {
          setMyRoom({
            hasRoom: false,
            roomId,
            isRoomManager: false,
            isFullRoom: false,
          });
        }

        // 라이프스타일 정보 처리
        try {
          const userDetailResponse = await getMemberStatData();
          setHasLifeStyle(true);
          setLifeStyle(userDetailResponse.result);
        } catch (error: any) {
          const errorCode = error?.response?.data?.code;
          if (errorCode === 'MEMBERSTAT402') {
            setHasLifeStyle(false);
            console.log('MEMBERSTAT402: No LifeStyle data available');
          } else {
            console.error('Unexpected error in getUserDetailData:', error);
          }
        }

        setLoggedIn(true);

        const elapsed = Date.now() - start;
        const remainingTime = 3500 - elapsed;
        if (remainingTime > 0) {
          setTimeout(() => setAppLoaded(true), remainingTime);
        } else {
          setAppLoaded(true);
        }
      } catch (error: any) {
        setLoggedIn(false);
        await deleteToken();
        const elapsed = Date.now() - start;
        const remainingTime = 3500 - elapsed;
        if (remainingTime > 0) {
          setTimeout(() => setAppLoaded(true), remainingTime);
        } else {
          setAppLoaded(true);
        }
      }
    };

    // 비동기 함수 호출
    checkLogin();
  }, []);
};
