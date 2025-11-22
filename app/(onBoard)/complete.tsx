import { CommonActions } from '@react-navigation/native';
import { useNavigationContainerRef } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import {
  //useSignUpStore,
  useSignUpV2Store,
} from '@/zustand/member/member';
import { useMemberStore } from '@/zustand/store';

export default function Complete() {
  const { signUpState } = useSignUpV2Store();
  const { setLoggedIn } = useMemberStore();

  const navigationRef = useNavigationContainerRef();

  const { trackButton } = useTracker();

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="mt-[56px] gap-y-[24px] px-[20px]">
        <View className="gap-y-[2px] mx-[8px]">
          <Text className="Semibold20 text-emphasizedFont">{signUpState.nickname}님,</Text>
          <Text className="Semibold20 text-emphasizedFont">cozymate에 오신걸 환영해요!</Text>
        </View>
      </View>

      <View className="mt-[104px] mx-auto">{getPersona(signUpState.persona, 300, 300)}</View>

      <View className="absolute flex flex-col gap-y-[14px] bottom-[42px] bg-white w-full">
        {/* <OpacityPressable className="flex flex-row justify-between items-center bg-colorBox rounded-[12px] px-[16px] py-[12px] mx-[20px]">
          <Text className="Semibold12 text-basicFont">
            '궁합 테스트'에서 입력한 라이프스타일을 불러올래요
          </Text>
          <GrayArrowIcon />
        </OpacityPressable> */}

        <OpacityPressable
          onPress={() => {
            setLoggedIn(true);
            trackButton(ButtonEvent.okay, EventCategory.onboarding5, {
              nickname: signUpState.nickname,
              gender: signUpState.gender,
              birthday: signUpState.birthday,
              persona: signUpState.persona,
            });
            navigationRef.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: '(tabs)' }],
              }),
            );
          }}
          className="bg-mainColor rounded-[12px] py-[17.5px] mx-[20px]"
        >
          <Text className="Semibold16 text-white text-center">cozymate 바로가기</Text>
        </OpacityPressable>
      </View>
    </SafeAreaView>
  );
}
