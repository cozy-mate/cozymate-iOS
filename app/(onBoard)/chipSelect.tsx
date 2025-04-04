import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButton from '@/components/common/bottomButton';
import ChipList from '@/components/common/chipList';
import LoadingComponent from '@/components/common/loading';
import TermsAgreeComponent from '@/components/onBoard/termModal';
import { useSignUp } from '@/hooks/member/member';
import { useSignUpStore } from '@/zustand/member/member';

export default function ChipSelect() {
  const { signUpState } = useSignUpStore();

  const [preferenceList, setPreferenceList] = useState<string[]>([]);

  const handleValue = (value: string) => {
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

  console.log(signUpState, preferenceList);

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
      <View className="mt-14 gap-y-[24px] px-[20px]">
        <View className="gap-y-0.5 mx-1">
          <Text className="text-20 text-emphasizedFont font-700 leading-20">
            룸메이트를 선택할 때,
          </Text>
          <Text className="text-20 text-emphasizedFont font-700 leading-20">
            가장 중요한 요소 <Text className="text-mainColor">4가지</Text>를 선택해주세요!
          </Text>
        </View>

        <ChipList value={preferenceList} handleValue={handleValue} />
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="확인"
          disabled={preferenceList.length !== 4}
          onPress={() => setIsTermsModalOpen(true)}
        />
      </View>

      <TermsAgreeComponent
        isVisible={isTermsModalOpen}
        closeModal={() => setIsTermsModalOpen(false)}
        confirmFunc={handleConfirm}
      />
    </SafeAreaView>
  );
}
