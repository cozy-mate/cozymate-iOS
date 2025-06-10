import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import ChipList from '@/components/common/chipList';
import LoadingComponent from '@/components/common/loading';
import TermsAgreeComponent from '@/components/onBoard/termModal';
import { LifeStyleValue } from '@/constants/items/lifeStyle';
import { useSignUp } from '@/hooks/member/member';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useSignUpStore } from '@/zustand/member/member';

export default function ChipSelect() {
  const { signUpState } = useSignUpStore();

  const [preferenceList, setPreferenceList] = useState<LifeStyleValue[]>([]);

  const { trackButton } = useTracker();

  const handleValue = (value: LifeStyleValue) => {
    trackButton(ButtonEvent[value], EventCategory.onboarding4);
    setPreferenceList((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        if (prev.length < 4) {
          return [...prev, value];
        } else {
          Alert.alert(
            '최대 4개까지만 선택할 수 있습니다.',
            '더 이상 선택할 수 없습니다.',
            [{ text: '확인' }],
            { cancelable: true },
          );
          return prev;
        }
      }
    });
  };

  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);

  const { mutateAsync: signUp, isPending } = useSignUp();

  const handleConfirm = async () => {
    try {
      setIsTermsModalOpen(false);
      await signUp({
        nickname: signUpState.nickname,
        gender: signUpState.gender,
        birthday: signUpState.birthday,
        persona: signUpState.persona,
        memberStatPreferenceDto: {
          preferenceList: preferenceList,
        },
      });
      trackButton(ButtonEvent.okay, EventCategory.onboarding5);
    } catch (error: any) {
      console.log(error.config);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && (
        <Portal>
          <LoadingComponent />
        </Portal>
      )}
      <View className="gap-y-[24px] px-[20px]">
        <View className="gap-y-[8px]">
          <BackHeaderComponent />
          <View className="gap-y-[2px] mx-[4px]">
            <Text className="text-20 text-emphasizedFont font-600 leading-20">
              룸메이트를 선택할 때,
            </Text>
            <Text className="text-20 text-emphasizedFont font-600 leading-20">
              가장 중요한 요소 <Text className="text-mainColor">4가지</Text>를 선택해주세요!
            </Text>
          </View>
        </View>
        <ChipList value={preferenceList} handleValue={handleValue} />
      </View>

      <BottomButtonComponent
        buttonText="확인"
        onPress={() => setIsTermsModalOpen(true)}
        color={preferenceList.length !== 4 ? 'GRAY' : 'BLUE'}
        disabled={preferenceList.length !== 4}
      />

      <TermsAgreeComponent
        isVisible={isTermsModalOpen}
        closeModal={() => setIsTermsModalOpen(false)}
        confirmFunc={handleConfirm}
      />
    </SafeAreaView>
  );
}
