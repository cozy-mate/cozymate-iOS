import appleAuth from '@invertase/react-native-apple-authentication';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, getProfile, KakaoProfile, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { usePreferencesStore, useNewLifeStyleStore } from '@zustand/member-stat/member-stat';
import { useProfileStore, useLoggedInStore, useIsVerifiedStore } from '@zustand/member/member';

import { getMemberStatData } from '@server/api/member-stat';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { getPreferenceList } from '@server/api/member-stat-preference';
import {
  signIn,
  withdraw,
  getMyProfile,
  updatePersona,
  updateBirthday,
  updateNickname,
  updateMajorName,
} from '@server/api/member';
import {
  SignInResponse,
  WithdrawResponse,
  AppleLoginResponse,
  KakaoLoginResponse,
  UpdatePersonaResponse,
  UpdateBirthdayResponse,
  UpdateNicknameResponse,
  UpdateMajorNameResponse,
} from '@server/responseTypes/member';

import { deleteFcmToken } from '@utils/fcm/fcmTokenUtil';
import { deleteToken, setAccessToken, setRefreshToken } from '@utils/token';

// 카카오 로그인
export const useKakaoLogin = (
  navigation: any,
): UseMutationResult<KakaoLoginResponse, Error, void, unknown> => {
  // 로그인 정보
  const { setLoggedIn } = useLoggedInStore();
  // 프로필 정보
  const { setProfile } = useProfileStore();
  // 선호 칩
  const { setPreferenceList } = usePreferencesStore();
  // 방 존재 여부
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  // 라이프스타일 여부 및 라이프스타일 정보
  const { setNewLifeStyle } = useNewLifeStyleStore();

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoOAuthToken) => {
      try {
        const profile: KakaoProfile = await getProfile();
        console.log('카카오 프로필 조회 성공', profile);

        try {
          const signInResponse = await signIn({
            clientId: profile.id.toString(),
            socialType: 'KAKAO',
          });

          console.log('로그인 성공', signInResponse);

          const { accessToken, refreshToken } = signInResponse.result.tokenResponseDTO;

          // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
          await setAccessToken(accessToken);
          console.log('토큰 저장 완료');

          console.log(accessToken);

          if (signInResponse.result.tokenResponseDTO.refreshToken === '') {
            console.log('리프레쉬 없음');
            navigation.navigate('PersonalInfoInputScreen');
          } else {
            console.log('리프레쉬 있음');
            await setRefreshToken(refreshToken);

            // 프로필 정보 저장
            const getProfileResponse = await getMyProfile();
            setProfile(getProfileResponse.result);

            // 선호 칩 항목 저장
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
            }

            // 유저 라이프스타일 정보 저장
            const userLifeStyle = await getMemberStatData();
            setNewLifeStyle(userLifeStyle.result.memberStatDetail);

            setLoggedIn(true);
          }
        } catch (error: any) {
          console.log('로그인 에러', error);
        }
      } catch (error: any) {
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
  // 선호 칩
  const { setPreferenceList } = usePreferencesStore();
  // 방 존재 여부
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  // 라이프스타일 여부 및 라이프스타일 정보
  const { setNewLifeStyle } = useNewLifeStyleStore();

  return useMutation({
    mutationFn: () => appleLoginAuth(),
    onSuccess: async (response: AppleLoginResponse) => {
      try {
        const clientId = response.user;

        try {
          const signInResponse = await signIn({
            clientId: clientId,
            socialType: 'APPLE',
          });

          const { accessToken, refreshToken } = signInResponse.result.tokenResponseDTO;

          // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
          await setAccessToken(accessToken);

          if (signInResponse.result.tokenResponseDTO.refreshToken === '') {
            navigation.navigate('PersonalInfoInputScreen');
          } else {
            console.log('리프레쉬 있음');
            await setRefreshToken(refreshToken);

            // 프로필 정보 저장
            const getProfileResponse = await getMyProfile();
            setProfile(getProfileResponse.result);

            // 선호 칩 항목 저장
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
            }

            // 유저 라이프스타일 정보 저장
            const userLifeStyle = await getMemberStatData();
            setNewLifeStyle(userLifeStyle.result.memberStatDetail);

            setLoggedIn(true);
          }
        } catch (error) {
          console.log('로그인 에러', error);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });
};

// 테스트 로그인
export const useTestLogin = (
  navigation: any,
): UseMutationResult<SignInResponse, Error, void, unknown> => {
  // 로그인 정보
  const { setLoggedIn } = useLoggedInStore();
  // 프로필 정보
  const { setProfile } = useProfileStore();
  // 선호 칩
  const { setPreferenceList } = usePreferencesStore();
  // 방 존재 여부
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();

  // 라이프스타일 여부 및 라이프스타일 정보
  const { setNewLifeStyle } = useNewLifeStyleStore();

  return useMutation({
    mutationFn: () =>
      signIn({
        clientId: 'TEST',
        socialType: 'TEST',
      }),
    onSuccess: async (signInResponse: SignInResponse) => {
      try {
        try {
          console.log('로그인 성공', signInResponse);

          const { accessToken, refreshToken } = signInResponse.result.tokenResponseDTO;

          // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
          await setAccessToken(accessToken);
          console.log('토큰 저장 완료');

          console.log(accessToken);

          if (signInResponse.result.tokenResponseDTO.refreshToken === '') {
            console.log('리프레쉬 없음');
            navigation.navigate('PersonalInfoInputScreen');
          } else {
            console.log('리프레쉬 있음');
            await setRefreshToken(refreshToken);

            // 프로필 정보 저장
            const getProfileResponse = await getMyProfile();
            console.log(getProfileResponse.result);
            setProfile(getProfileResponse.result);

            // 선호 칩 항목 저장
            const preferenceResponse = await getPreferenceList();
            console.log(preferenceResponse.result.preferenceList);
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
            }

            // 유저 라이프스타일 정보 저장
            const userLifeStyle = await getMemberStatData();
            setNewLifeStyle(userLifeStyle.result.memberStatDetail);

            setLoggedIn(true);
          }
        } catch (error: any) {
          console.log('로그인 에러', error.response);
        }
      } catch (error: any) {
        console.error('Login error:', error);
      }
    },
  });
};

export const useUpdatePersona = (): UseMutationResult<UpdatePersonaResponse, undefined, number> => {
  return useMutation({
    mutationFn: (persona: number) => updatePersona(persona),
    onSuccess: () => console.log('프로필 이미지 변경 성공'),
  });
};

export const useUpdateNickname = (): UseMutationResult<
  UpdateNicknameResponse,
  undefined,
  string
> => {
  return useMutation({
    mutationFn: (nickname: string) => updateNickname(nickname),
    onSuccess: () => console.log('닉네임 변경 성공'),
  });
};

export const useUpdatMajorName = (): UseMutationResult<
  UpdateMajorNameResponse,
  undefined,
  string
> => {
  return useMutation({
    mutationFn: (majorName: string) => updateMajorName(majorName),
    onSuccess: () => console.log('학과 변경 성공'),
  });
};

export const useUpdateBirthday = (): UseMutationResult<
  UpdateBirthdayResponse,
  undefined,
  string
> => {
  return useMutation({
    mutationFn: (localDate: string) => updateBirthday(localDate),
    onSuccess: () => console.log('생일 변경 성공'),
  });
};

export const useWithdraw = (): UseMutationResult<WithdrawResponse, undefined, string> => {
  const { setLoggedIn } = useLoggedInStore();
  const { clearMyRoom } = useHasRoomStore();
  const { clearProfile } = useProfileStore();
  const { setIsVerified } = useIsVerifiedStore();
  const { clearPreferenceList } = usePreferencesStore();
  const { clearRoomInfo } = useRoomInfoStore();
  const { clearNewLifeStyle } = useNewLifeStyleStore();

  return useMutation({
    mutationFn: (withdrawReason: string) => withdraw({ withdrawReason }),
    onSuccess: async () => {
      await deleteToken();
      await deleteFcmToken();

      clearMyRoom();
      clearProfile();
      setIsVerified('');
      clearPreferenceList();
      clearRoomInfo();
      clearNewLifeStyle();
      setLoggedIn(false);
    },
  });
};
