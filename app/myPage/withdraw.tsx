import { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomTextarea from '@/components/common/customInput/customTextarea';
import LoadingComponent from '@/components/common/loading';
import { useWithdraw } from '@/hooks/member/member';
import { useMemberStore } from '@/zustand/member/member';

export default function Withdraw() {
  const { memberState } = useMemberStore();

  const [withdrawReason, setWithdrawReason] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { mutateAsync: withdraw, isPending } = useWithdraw();

  const isSmallSize = Dimensions.get('screen').height <= 667;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && <LoadingComponent />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          rowGap: 100,
          paddingBottom: 160,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="gap-y-[4px]">
          <View className="gap-y-[2px] mx-[4px]">
            <Text className="Semibold20 text-emphasizedFont">{memberState.nickname}님,</Text>
            <Text className="Semibold20 text-emphasizedFont">cozymate를 떠나시나요?</Text>
          </View>

          <Text className="Medium12 text-basicFont">
            * 탈퇴하시면 모든 정보가 사라지며, 모든 데이터는 복구가 불가능해요
          </Text>
        </View>

        <CustomTextarea
          title={`${memberState.nickname}님,\n떠나시는 이유를 알려주세요`}
          value={withdrawReason}
          handleValue={(e: string) => setWithdrawReason(e)}
          placeholder={
            '서비스 탈퇴 이유를 알려주신다면,\ncozymate가 더 나은 서비스가 되는 데에,\n큰 도움이 될 거에요.'
          }
          height="h-[258px]"
        />
      </KeyboardAwareScrollView>

      <View className={`absolute ${isSmallSize ? 'bottom-0' : 'bottom-[42px]'} w-full bg-white`}>
        <View className="flex flex-row items-center px-[22px]">
          <Pressable onPress={() => setIsChecked(!isChecked)} className="p-[8px]">
            {isChecked ? <SelectedIcon /> : <RadioIcon />}
          </Pressable>
          <Text className={`Medium12 ${isChecked ? 'text-mainColor' : 'text-disabledFont'}`}>
            회원 탈퇴 유의사항을 확인하였으며, 이에 동의합니다.
          </Text>
        </View>

        <BottomButtonComponent
          buttonText="탈퇴하기"
          onPress={() => withdraw({ withdrawReason })}
          color={!isChecked || withdrawReason.length > 200 ? 'GRAY' : 'BLUE'}
          disabled={!isChecked || withdrawReason.length > 200}
          isFixedPosition={false}
        />
      </View>
    </SafeAreaView>
  );
}
