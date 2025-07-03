import { useRouter } from 'expo-router';
import {
  GestureResponderEvent,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CustomNumberPad from '@/components/common/customInput/customNumberPad';
import AnimatedFieldComponent from '@/components/lifeStyle/animatedField';
import ProgressBarComponent from '@/components/lifeStyle/progressBar';
import { dormJoiningStatusItems, numOfRoommateItems } from '@/constants/items/lifeStyleItem';
import { useGetMyUniversityInfo } from '@/hooks/university/university';
import { useInputAnimation } from '@/hooks/useInputAnimation';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import {
  useRegisterLifeStyleStore,
  useShowLifeStyleInputStore,
} from '@/zustand/member-stat/member-stat';

export default function LifeStyleBasicInfo() {
  const router = useRouter();

  const { data } = useGetMyUniversityInfo();

  const { trackButton } = useTracker();

  const dormitoryItems = data.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();
  const { showLifeStyleInput, setShowLifeStyleInput } = useShowLifeStyleInputStore();

  const stepChecks = [
    lifeStyle.admissionYear !== undefined && lifeStyle.admissionYear !== '',
    lifeStyle.dormName !== '',
    lifeStyle.numOfRoommate !== '',
    lifeStyle.dormJoiningStatus !== '',
  ];

  const nowStep = stepChecks.filter(Boolean).length;

  const handleNext = (event: GestureResponderEvent) => {
    event.stopPropagation();
    trackButton(ButtonEvent.next_general, EventCategory.life_style);
    router.push('/lifeStyle/essentialInfo');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px] mb-[16px]">
          <BackHeaderComponent title="기본정보">
            {lifeStyle.admissionYear !== undefined &&
              lifeStyle.admissionYear !== '' &&
              lifeStyle.dormName !== '' &&
              lifeStyle.numOfRoommate !== '' &&
              lifeStyle.dormJoiningStatus !== '' && (
                <TouchableOpacity
                  onPress={handleNext}
                  className="bg-subColor1 rounded-md px-[20px] py-[10px]"
                >
                  <Text className="Semibold14 text-mainColor">다음</Text>
                </TouchableOpacity>
              )}
          </BackHeaderComponent>
        </View>
      </TouchableWithoutFeedback>

      <ProgressBarComponent totalStep={4} nowStep={nowStep} />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          rowGap: 56,
          paddingTop: 40,
          paddingBottom: 60,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <AnimatedFieldComponent
          show={showLifeStyleInput.showDormJoiningStatus}
          valueCheck={lifeStyle.dormJoiningStatus !== ''}
          animation={useInputAnimation(showLifeStyleInput.showDormJoiningStatus, 400)}
          type="RADIO"
          title="기숙사 합격여부를 선택해주세요"
          value={lifeStyle.dormJoiningStatus}
          items={dormJoiningStatusItems}
          handleValue={(e: string) => {
            setLifeStyle({ dormJoiningStatus: e });
          }}
        />

        <AnimatedFieldComponent
          show={showLifeStyleInput.showNumOfRoommate}
          valueCheck={lifeStyle.numOfRoommate !== ''}
          animation={useInputAnimation(showLifeStyleInput.showNumOfRoommate, 400)}
          type="RADIO"
          title="신청실의 인원을 선택해주세요"
          value={lifeStyle.numOfRoommate}
          items={numOfRoommateItems}
          handleValue={(e: string) => {
            setLifeStyle({ numOfRoommate: e });
            setShowLifeStyleInput({ showDormJoiningStatus: true });
          }}
        />

        <AnimatedFieldComponent
          show={showLifeStyleInput.showDormName}
          valueCheck={lifeStyle.dormName !== ''}
          animation={useInputAnimation(showLifeStyleInput.showDormName, 400)}
          type="RADIO"
          title="신청한 기숙사를 선택해주세요"
          value={lifeStyle.dormName}
          items={dormitoryItems}
          handleValue={(e: string) => {
            setLifeStyle({ dormName: e });
            setShowLifeStyleInput({ showNumOfRoommate: true });
          }}
        />

        <CustomNumberPad
          title="학번을 입력해주세요"
          value={lifeStyle.admissionYear}
          handleValue={(e: string) => {
            setLifeStyle({ admissionYear: e });
            setShowLifeStyleInput({ showDormName: true });
          }}
          placeholder="ex. 23"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
