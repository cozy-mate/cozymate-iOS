import { useEffect } from 'react';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useProfileStore, useLoggedInStore } from '@zustand/member/member';
import {
  useLifeStyleStore,
  usePreferencesStore,
  useHasLifeStyleStore,
} from '@zustand/member-stat/member-stat';

import { reissueToken } from '@server/api/auth';
import { getMyProfile } from '@server/api/member';
import { getMemberStatData } from '@server/api/member-stat';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { getPreferenceList } from '@server/api/member-stat-preference';

import { deleteToken, setAccessToken, setRefreshToken, getRefreshToken } from '@utils/token';

export const useAutoLogin = (setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { setLoggedIn } = useLoggedInStore();

  // 프로필 정보
  const { setProfile } = useProfileStore();
  const { setPreferenceList } = usePreferencesStore();
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  const start = Date.now();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      console.log(1); // 시작
      try {
        const oldRefreshToken = await getRefreshToken();
        console.log(2, oldRefreshToken); // Refresh Token 확인

        if (!oldRefreshToken) {
          console.log(3); // Refresh Token이 없는 경우
          setLoggedIn(false);
          await deleteToken();
          const elapsed = Date.now() - start;
          const remainingTime = 3500 - elapsed;
          setTimeout(() => setAppLoaded(true), remainingTime > 0 ? remainingTime : 0);
          return;
        }

        try {
          console.log(4); // Access Token 설정
          await setAccessToken(oldRefreshToken);
          const response = await reissueToken();
          console.log(5, response); // Token 재발급

          // 토큰 저장
          await Promise.all([
            setAccessToken(response.result.accessToken),
            setRefreshToken(response.result.refreshToken),
          ]);
          console.log(6); // 토큰 저장 완료
        } catch (error: any) {
          console.log(7, error.response); // 토큰 재발급 실패
        }

        const profileResponse = await getMyProfile();
        console.log(8, profileResponse); // 프로필 조회
        setProfile(profileResponse.result);

        const preferenceResponse = await getPreferenceList();
        console.log(9, preferenceResponse);
        setPreferenceList(preferenceResponse.result.preferenceList);

        // 방 존재 여부 확인
        const roomCheckResponse = await checkHasRoom();
        console.log(9, roomCheckResponse); // 방 존재 여부 확인
        const roomId = roomCheckResponse.result.roomId;

        // 방이 존재하는 경우 방 정보 저장
        if (roomId !== 0) {
          console.log(10); // 방이 존재하는 경우
          setMyRoom({ hasRoom: true, roomId });
          const roomInfoResponse = await getRoomData(roomId);
          console.log(11, roomInfoResponse); // 방 정보 조회
          console.log(roomInfoResponse.result.difference);
          setRoomInfo(roomInfoResponse.result);
        }

        // 라이프스타일 정보 처리
        try {
          const userDetailResponse = await getMemberStatData();
          console.log(12, userDetailResponse); // 라이프스타일 정보 조회
          setHasLifeStyle(true);
          setLifeStyle(userDetailResponse.result.memberStatDetail);
        } catch (error: any) {
          console.log(13, error); // 라이프스타일 정보 오류
          const errorCode = error?.response?.data?.code;
          if (errorCode === 'MEMBERSTAT402') {
            setHasLifeStyle(false);
            console.log('MEMBERSTAT402: No LifeStyle data available');
          } else {
            console.error('Unexpected error in getUserDetailData:', error);
          }
        }

        setLoggedIn(true);
        console.log(14); // 로그인 성공

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
