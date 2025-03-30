import { KakaoLoginToken, KakaoUser, login, me } from '@react-native-kakao/user';
import { useMutation } from '@tanstack/react-query';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';

import { socialLogin } from '@/apis/auth/auth';
import { getMyDetail } from '@/apis/member-stat/member-stat';
import { checkHasRoom } from '@/apis/room/room';
import { setAccessToken, setRefreshToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

export const useKakaoLogin = () => {
  const router = useRouter();

  const { setMemberState } = useMemberStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setRoomId } = useHasRoomStore();

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoLoginToken) => {
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
          // router.push('/onBoard/schoolAuthentication');
          router.push('/onBoard/personalInfo');
        }

        // 기존 멤버
        else {
          console.log(loginResponse.result.tokenResponseDTO.accessToken);

          await Promise.all([
            setAccessToken(loginResponse.result.tokenResponseDTO.accessToken),
            setRefreshToken(loginResponse.result.tokenResponseDTO.refreshToken),
            setMemberState(loginResponse.result.memberDetailResponseDTO),
          ]);

          try {
            await getMyDetail();
            setHasLifeStyle(true);
          } catch (error: any) {
            if (error.response?.data?.code === 'MEMBERSTAT402') {
              setHasLifeStyle(false);
            }
          }

          const hasRoomResponse = await checkHasRoom();
          setRoomId(hasRoomResponse.result.roomId);

          router.replace('/(tabs)/home');
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

  const { setMemberState } = useMemberStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setRoomId } = useHasRoomStore();

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
          // router.push('/onBoard/schoolAuthentication');
          router.push('/onBoard/personalInfo');
        }

        // 기존 멤버
        else {
          await Promise.all([
            setAccessToken(loginResponse.result.tokenResponseDTO.accessToken),
            setRefreshToken(loginResponse.result.tokenResponseDTO.refreshToken),
            setMemberState(loginResponse.result.memberDetailResponseDTO),
          ]);

          try {
            await getMyDetail();
            setHasLifeStyle(true);
          } catch (error: any) {
            if (error.response?.data?.code === 'MEMBERSTAT402') {
              setHasLifeStyle(false);
            }
          }

          const hasRoomResponse = await checkHasRoom();
          setRoomId(hasRoomResponse.result.roomId);

          router.replace('/(tabs)/home');
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
