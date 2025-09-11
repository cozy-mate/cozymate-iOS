import { GoogleSignin, SignInResponse, User } from '@react-native-google-signin/google-signin';
import { KakaoUser, login, me } from '@react-native-kakao/user';
import { useMutation } from '@tanstack/react-query';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';

import { errorRefiner } from '@/error/refiner';
import { socialLogin } from '@/server/auth/auth';
import { getMyDetail } from '@/server/member-stat/member-stat';
import { checkHasRoom } from '@/server/room/room';
import { setAccessToken, setRefreshToken } from '@/utils/token';

import { useAuthProvider } from '../../providers/AuthProvider';
import { useMemberStore } from '@/zustand/store';

export const useKakaoLogin = () => {
  const router = useRouter();

  const { setMemberInfo, setHasLifeStyle, setRoom } = useMemberStore();

  const { broadcastLogin } = useAuthProvider();

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async () => {
      try {
        const profile: KakaoUser = await me();

        const loginResponse = await socialLogin({
          clientId: String(profile.id),
          socialType: 'KAKAO',
        });

        // 신규 멤버
        if (loginResponse.result.memberDetailResponseDTO === null) {
          console.log(loginResponse.result.tokenResponseDTO.accessToken);

          // 임시 토큰 저장
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);

          console.log('가입된 회원이 아님');
          router.push('/(onBoard)/schoolAuthentication');
        }

        // 준회원 (학교 인증 완료)
        else if (
          loginResponse.result.memberDetailResponseDTO !== null &&
          loginResponse.result.tokenResponseDTO.refreshToken === ''
        ) {
          console.log('준회원');
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);
          router.push('/(onBoard)/personalInfo');
        }

        // 기존 멤버
        else {
          await Promise.all([
            setAccessToken(loginResponse.result.tokenResponseDTO.accessToken),
            setRefreshToken(loginResponse.result.tokenResponseDTO.refreshToken),
            setMemberInfo(loginResponse.result.memberDetailResponseDTO),
          ]);

          try {
            const hasRoomResponse = await checkHasRoom();

            if (hasRoomResponse.result.roomId !== 0) {
              setRoom(hasRoomResponse.result);
            }
          } catch (error: any) {
            console.log('서버 오류', error);
          }

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

          broadcastLogin();

          // router.replace('/(tabs)/cozyHome');
        }
      } catch (error: any) {
        // error 처리 추상화
        // axiosError일 경우 정제해서 throw
        throw errorRefiner(error);
      }
    },
    onError: (error) => {
      // onSuccess에서 throw한 에러를 여기서 잡음.
      if (__DEV__) {
        console.log('에러:', error);
      }
      // TODO : Prod에서 잡지 못한다면 최상단 Error Boundary를 하나 놓는게 좋을 거 같습니다!
    },
  });
};

export const appleLoginAuth =
  async (): Promise<AppleAuthentication.AppleAuthenticationCredential> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      return credential;
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        throw new Error('Apple 로그인 취소됨');
      } else {
        throw new Error('Apple 인증에 실패하였습니다');
      }
    }
  };

export const useAppleLogin = () => {
  const router = useRouter();

  const { setMemberInfo, setHasLifeStyle, setRoom } = useMemberStore();

  const { broadcastLogin } = useAuthProvider();

  return useMutation({
    mutationFn: () => appleLoginAuth(),
    onSuccess: async (response: AppleAuthentication.AppleAuthenticationCredential) => {
      try {
        console.log(response.user);

        const loginResponse = await socialLogin({
          clientId: String(response.user),
          socialType: 'APPLE',
        });

        // 신규 멤버
        if (loginResponse.result.memberDetailResponseDTO === null) {
          // 임시 토큰 저장
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);

          console.log('가입된 회원이 아님');
          router.push('/(onBoard)/schoolAuthentication');
        }

        // 준회원 (학교 인증 완료)
        else if (
          loginResponse.result.memberDetailResponseDTO !== null &&
          loginResponse.result.tokenResponseDTO.refreshToken === ''
        ) {
          console.log('준회원');
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);
          router.push('/(onBoard)/personalInfo');
        }

        // 기존 멤버
        else {
          await Promise.all([
            setAccessToken(loginResponse.result.tokenResponseDTO.accessToken),
            setRefreshToken(loginResponse.result.tokenResponseDTO.refreshToken),
            setMemberInfo(loginResponse.result.memberDetailResponseDTO),
          ]);

          try {
            const hasRoomResponse = await checkHasRoom();

            if (hasRoomResponse.result.roomId !== 0) {
              setRoom(hasRoomResponse.result);
            }
          } catch (error: any) {
            console.log('서버 오류', error);
          }

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

          broadcastLogin();

          // router.replace('/(tabs)/cozyHome');
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log('로그인 실패:', error);
    },
  });
};

export const useGoogleLogin = () => {
  const router = useRouter();

  const { setMemberInfo, setHasLifeStyle, setRoom } = useMemberStore();

  const { broadcastLogin } = useAuthProvider();

  return useMutation({
    mutationFn: async () => {
      await GoogleSignin.hasPlayServices();
      return await GoogleSignin.signIn();
    },
    onSuccess: async () => {
      try {
        const currentUser: User | null = GoogleSignin.getCurrentUser();

        if (!currentUser) {
          console.log('현재 로그인한 Google 사용자가 없습니다.');
          return;
        }

        const loginResponse = await socialLogin({
          clientId: String(currentUser.user.id),
          socialType: 'GOOGLE',
        });

        // 신규 멤버
        if (loginResponse.result.memberDetailResponseDTO === null) {
          console.log(loginResponse.result.tokenResponseDTO.accessToken);

          // 임시 토큰 저장
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);

          console.log('가입된 회원이 아님');
          router.push('/(onBoard)/schoolAuthentication');
        }

        // 준회원 (학교 인증 완료)
        else if (
          loginResponse.result.memberDetailResponseDTO !== null &&
          loginResponse.result.tokenResponseDTO.refreshToken === ''
        ) {
          console.log('준회원');
          await setAccessToken(loginResponse.result.tokenResponseDTO.accessToken);
          router.push('/(onBoard)/personalInfo');
        }

        // 기존 멤버
        else {
          await Promise.all([
            setAccessToken(loginResponse.result.tokenResponseDTO.accessToken),
            setRefreshToken(loginResponse.result.tokenResponseDTO.refreshToken),
            setMemberInfo(loginResponse.result.memberDetailResponseDTO),
          ]);

          try {
            const hasRoomResponse = await checkHasRoom();

            if (hasRoomResponse.result.roomId !== 0) {
              setRoom(hasRoomResponse.result);
            }
          } catch (error: any) {
            console.log('서버 오류', error);
          }

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

          broadcastLogin();

          // router.replace('/(tabs)/cozyHome');
        }
      } catch (error: any) {
        // error 처리 추상화
        // axiosError일 경우 정제해서 throw
        throw errorRefiner(error);
      }
    },
    onError: (error) => {
      // onSuccess에서 throw한 에러를 여기서 잡음.
      if (__DEV__) {
        console.log('에러:', error);
      }
      // TODO : Prod에서 잡지 못한다면 최상단 Error Boundary를 하나 놓는게 좋을 거 같습니다!
    },
  });
};
