import appleAuth from '@invertase/react-native-apple-authentication';
import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';
import { login, getProfile, KakaoProfile, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useProfileStore, useLoggedInStore } from '@zustand/member/member';
import { useLifeStyleStore, useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { getUserDetailData } from '@server/api/member-stat';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { signIn, signUp, getMyProfile } from '@server/api/member';
import {
  GetProfileResponse,
  AppleLoginResponse,
  KakaoLoginResponse,
} from '@server/responseTypes/member';

import { setAccessToken, setRefreshToken } from '@utils/token';

export const useGetMyProfile = (): { data: GetProfileResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['mylifestyledata'],
    queryFn: () => getMyProfile(),
    select: (reseponse: GetProfileResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 카카오 로그인
export const useKakaoLogin = (
  navigation: any,
): UseMutationResult<KakaoLoginResponse, Error, void, unknown> => {
  // 로그인 정보
  const { setLoggedIn } = useLoggedInStore();
  // 프로필 정보
  const { setProfile } = useProfileStore();
  // 방 여부 및 방 정보
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  // 라이프스타일 여부 및 라이프스타일 정보
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoOAuthToken) => {
      try {
        const profile: KakaoProfile = await getProfile();

        const signInResponse = await signIn({
          clientId: profile.id.toString(),
          socialType: 'KAKAO',
        });

        const { accessToken, refreshToken } = signInResponse.result.tokenResponseDTO;

        // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
        await setAccessToken(accessToken);

        if (signInResponse.result.tokenResponseDTO.refreshToken === null) {
          navigation.navigate('PersonalInfoInputScreen');
        } else {
          await setRefreshToken(refreshToken);

          // 프로필 정보 저장
          const getProfileResponse = await getMyProfile();
          setProfile(getProfileResponse.result);

          // 방 존재 여부 저장
          const roomCheckResponse = await checkHasRoom();
          const roomId = roomCheckResponse.result.roomId;

          // 방이 존재하는 경우 방 정보 저장
          if (roomId !== 0) {
            setMyRoom({ hasRoom: true, roomId: roomId });

            const roomInfoResponse = await getRoomData(roomId);
            setRoomInfo(roomInfoResponse.result);
          }

          // getUserDetailData 호출 및 라이프스타일 정보 처리
          try {
            const userDetailResponse = await getUserDetailData();
            setHasLifeStyle(true);
            setLifeStyle(userDetailResponse.result);
          } catch (error: any) {
            const errorCode = error?.response?.data?.code;
            if (errorCode === 'MEMBERSTAT402') {
              setHasLifeStyle(false);
            } else {
              // 예상하지 못한 에러 처리
              console.error(error);
            }
          }

          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });
};

// 애플 인가 요청 (사용자 FaceID 인증절차)
export const appleLoginAuth = async (): Promise<AppleLoginResponse> => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  console.log('appleAuthRequestResponse:', appleAuthRequestResponse);

  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  if (credentialState === appleAuth.State.AUTHORIZED) {
    return appleAuthRequestResponse;
  } else {
    throw new Error('Apple 인증에 실패하였습니다');
  }
};

// 애플 로그인
export const useAppleLogin = (
  navigation: any,
): UseMutationResult<AppleLoginResponse, Error, void, unknown> => {
  // 로그인 정보
  const { setLoggedIn } = useLoggedInStore();
  // 프로필 정보
  const { setProfile } = useProfileStore();
  // 방 여부 및 방 정보
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  // 라이프스타일 여부 및 라이프스타일 정보
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  return useMutation({
    mutationFn: () => appleLoginAuth(),
    onSuccess: async (response: AppleLoginResponse) => {
      try {
        const clientId = response.user;

        const signInResponse = await signIn({ clientId: clientId, socialType: 'APPLE' });

        const { accessToken, refreshToken } = signInResponse.result.tokenResponseDTO;

        // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
        await setAccessToken(accessToken);

        if (signInResponse.result.tokenResponseDTO.refreshToken === null) {
          // navigation.navigate('PersonalInfoInputScreen');
          await signUp({
            name: '정진혁',
            nickname: '테스트으으으',
            gender: 'MALE',
            birthday: '1999-02-13',
            persona: 1,
          });
        } else {
          await setRefreshToken(refreshToken);

          // 프로필 정보 저장
          const getProfileResponse = await getMyProfile();
          setProfile(getProfileResponse.result);

          // 방 존재 여부 저장
          const roomCheckResponse = await checkHasRoom();
          const roomId = roomCheckResponse.result.roomId;

          // 방이 존재하는 경우 방 정보 저장
          if (roomId !== 0) {
            setMyRoom({ hasRoom: true, roomId: roomId });

            const roomInfoResponse = await getRoomData(roomId);
            setRoomInfo(roomInfoResponse.result);
          }

          // getUserDetailData 호출 및 라이프스타일 정보 처리
          try {
            const userDetailResponse = await getUserDetailData();
            setHasLifeStyle(true);
            setLifeStyle(userDetailResponse.result);
          } catch (error: any) {
            const errorCode = error?.response?.data?.code;
            if (errorCode === 'MEMBERSTAT402') {
              setHasLifeStyle(false);
            } else {
              // 예상하지 못한 에러 처리
              console.error(error);
            }
          }

          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });
};
