import { Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, getProfile, KakaoProfile, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import { hasRoomState, profileState, loggedInState, roomInfoState } from '@recoil/recoil';

import { signIn, getMyProfile } from '@server/api/member';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { AppleLoginResponse, KakaoLoginResponse } from '@server/responseTypes/member';

import { setAccessToken } from '@utils/token';

// 카카오 로그인
export const useKakaoLogin = (
  navigation: any,
): UseMutationResult<KakaoLoginResponse, Error, void, unknown> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [, setMyProfile] = useRecoilState(profileState);
  const [, setHasRoom] = useRecoilState(hasRoomState);
  const [, setRoomInfo] = useRecoilState(roomInfoState);

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoOAuthToken) => {
      const profile: KakaoProfile = await getProfile();

      const signInResponse = await signIn({
        clientId: profile.id.toString(),
        socialType: 'KAKAO',
      });

      // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
      const accessToken = signInResponse.result.tokenResponseDTO.accessToken;
      await setAccessToken(accessToken);

      console.log(accessToken);

      if (signInResponse.result.tokenResponseDTO.refreshToken === null) {
        navigation.navigate('PersonalInfoInputScreen');
      } else {
        // 프로필 정보 저장
        const getProfileResponse = await getMyProfile();
        setMyProfile(getProfileResponse.result);

        // 방 존재 여부 저장
        const roomCheckResponse = await checkHasRoom();
        const roomId = roomCheckResponse.result.roomId;

        // 방이 존재하는 경우 방 정보 저장
        if (roomId !== 0) {
          setHasRoom({ hasRoom: true, roomId: roomId });

          const roomInfoResponse = await getRoomData(roomId);
          setRoomInfo(roomInfoResponse.result);
        }
        setLoggedIn(true);
      }
    },
  });
};

// 애플 로그인
export const useAppleLogin = (
  navigation: any,
): UseMutationResult<AppleLoginResponse, Error, void, unknown> => {
  return useMutation({
    mutationFn: () => appleLoginAuth(),
    onSuccess: async (response: AppleLoginResponse) => {
      const fullName = response.fullName;

      if (fullName) {
        const familyName = fullName.familyName ? fullName.familyName : '';
        const givenName = fullName.givenName ? fullName.givenName : '';

        const userName = familyName + givenName;
      }

      const { authorizationCode: appleAuthCode } = response;

      const signInResponse = await signIn({ clientId: '123142', socialType: 'APPLE' });
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

export const useLoginWithId = (navigation: any) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [, setMyProfile] = useRecoilState(profileState);
  const [, setHasRoom] = useRecoilState(hasRoomState);
  const [, setRoomInfo] = useRecoilState(roomInfoState);

  const handlePrompt = () => {
    Alert.prompt(
      '수동 로그인',
      '수동 아이디를 입력해주세요',
      [
        {
          text: '취소',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async (id: any) => {
            if (id === undefined) {
              return;
            }
            if (id === '0') {
              navigation.navigate('PersonalInfoInputScreen');
              return;
            }
            try {
              const signInResponse = await signIn({ clientId: id, socialType: 'KAKAO' });

              //임시 토큰
              const accessToken = signInResponse.result.tokenResponseDTO.accessToken;

              await setAccessToken(accessToken);

              if (signInResponse.result.tokenResponseDTO.refreshToken === null) {
                //navigation.navigate('PersonalInfoInputScreen');
                Alert.alert('회원가입이 필요합니다');
              } else {
                // 프로필 정보 저장
                const getProfileResponse = await getMyProfile();
                setMyProfile(getProfileResponse.result);

                // 방 존재 여부 저장
                const roomCheckResponse = await checkHasRoom();
                const roomId = roomCheckResponse.result.roomId;

                // 방이 존재하는 경우 방 정보 저장
                if (roomId !== 0) {
                  setHasRoom({ hasRoom: true, roomId: roomId });

                  const roomInfoResponse = await getRoomData(roomId);
                  setRoomInfo(roomInfoResponse.result);
                }
                setLoggedIn(true);
              }
            } catch (error: any) {
              console.log(error.result.data)
              Alert.alert('로그인 오류');
            }
          },
        },
      ],
      'plain-text',
    );
  };
  return handlePrompt;
};
