import { Keyboard, Text, View, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CustomTextarea from '@/components/common/customInput/customTextarea';
import LoadingComponent from '@/components/common/loading';
import ProgressBarComponent from '@/components/lifeStyle/progressBar';
import { useCreateMemberDetail } from '@/hooks/member-stat/member-stat';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleAdditionalInfo() {
  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

  const { mutateAsync: createLifeStyle, isPending } = useCreateMemberDetail();

  const { trackButton } = useTracker();

  const handleNext = (event: GestureResponderEvent) => {
    event.stopPropagation();
    trackButton(ButtonEvent.next_choice, EventCategory.life_style);
    createLifeStyle(lifeStyle);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && <LoadingComponent />}
      <View className="px-[20px] mb-[16px]">
        <BackHeaderComponent title="선택정보">
          <TouchableOpacity
            onPress={handleNext}
            disabled={lifeStyle.selfIntroduction.length > 200}
            className={`rounded-md px-[20px] py-[10px] ${lifeStyle.selfIntroduction.length > 200 ? 'bg-[#C4C4C4]' : 'bg-subColor1'}`}
          >
            <Text
              className={`Semibold14 ${lifeStyle.selfIntroduction.length > 200 ? 'text-white' : 'text-mainColor'}`}
            >
              완료
            </Text>
          </TouchableOpacity>
        </BackHeaderComponent>
      </View>

      <ProgressBarComponent totalStep={1} nowStep={1} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="gap-y-[20px] mt-[40px] px-[20px]">
          <CustomTextarea
            title="하고싶은 말을 적어주세요 (선택)"
            value={lifeStyle.selfIntroduction}
            handleValue={(e: string) => setLifeStyle({ selfIntroduction: e })}
            placeholder="내용을 입력해주세요"
            height="h-[270px]"
            onFocus={() =>
              trackButton(ButtonEvent.choice_text_input, EventCategory.life_style, {
                focus: true,
              })
            }
            onBlur={() =>
              trackButton(ButtonEvent.choice_text_input, EventCategory.life_style, {
                focus: false,
              })
            }
          />

          <View className="mx-[4px] gap-y-[16px]">
            <Text className="Medium12 text-disabledFont">이런 내용을 적어주면 좋아요!</Text>
            <View className="gap-y-[4px]">
              <Text className="Medium12 text-disabledFont"> 1{')'} 자기소개</Text>
              <Text className="Medium12 text-disabledFont"> 2{')'} 학교에서 하고 있는 동아리</Text>
              <Text className="Medium12 text-disabledFont"> 3{')'} 평소 관심사</Text>
              <Text className="Medium12 text-disabledFont"> 4{')'} 원하는 룸메이트의 성향</Text>
              <Text className="Medium12 text-disabledFont">
                {' '}
                5{')'} 같이 살면서 꼭 알아둬야할 점
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
