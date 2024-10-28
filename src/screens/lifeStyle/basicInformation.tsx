import React, { useState } from 'react';
import {
  Animated,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import BackHeader from 'src/layout/backHeader';

import CustomTextInputBox from '@components/common/customTextInputBox';
import CustomRadioInputBox from '@components/common/customRadioInputBox';

import { useLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useInputAnimation } from '@hooks/inputAnimation';
import useCompletionPercentage from '@hooks/useCompletionPercentage';

import { BasicLifeStyleScreenProps } from '@type/param/stack';

type Item = {
  index: number;
  value: string | number;
  name: string;
  select: boolean;
};

const BasicInformationComponent = ({ navigation }: BasicLifeStyleScreenProps) => {
  const { setLifeStyle } = useLifeStyleStore();

  const [admissionYear, setAdmissionYear] = useState<string>('');
  const [numOfRoommate, setNumOfRoommate] = useState<number | undefined>(undefined);
  const [acceptance, setAcceptance] = useState<string>('');

  const canNext = admissionYear !== '' && numOfRoommate !== undefined && acceptance !== '';

  const [numOfRoommateItems, setNumOfRoommateItems] = useState<Item[]>([
    { index: 1, value: 0, name: '미정', select: false },
    { index: 2, value: 2, name: '2인', select: false },
    { index: 3, value: 3, name: '3인', select: false },
    { index: 4, value: 4, name: '4인', select: false },
    { index: 5, value: 5, name: '5인', select: false },
    { index: 6, value: 6, name: '6인', select: false },
  ]);

  const [acceptanceItems, setAcceptanceItems] = useState<Item[]>([
    { index: 1, value: '합격', name: '합격', select: false },
    { index: 2, value: '결과 대기중', name: '결과 대기중', select: false },
    { index: 3, value: '예비번호를 받았어요!', name: '예비번호를 받았어요!', select: false },
  ]);

  const toPrev = () => {
    navigation.goBack();
  };

  const toNext = async (): Promise<void> => {
    setLifeStyle({
      admissionYear: admissionYear,
      numOfRoommate: numOfRoommate,
      acceptance: acceptance,
    });

    navigation.navigate('EssentialLifeStyleScreen');
  };

  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  const roommateInputAnimation = useInputAnimation(showRoommateInput, 400);
  const acceptanceInputAnimation = useInputAnimation(showAcceptance, 400);

  const totalFields = 3;
  const progressWidth = useCompletionPercentage({
    fields: {
      admissionYear,
      numOfRoommate,
      acceptance,
    },
    totalFields,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-1 flex-col bg-white">
        <BackHeader
          title="기본정보"
          buttonString="다음"
          leftPressFunc={toPrev}
          rightPressFunc={toNext}
          canNext={canNext}
          width={progressWidth}
        />
        <ScrollView className="px-5">
          {showAcceptance && (
            <Animated.View
              style={{
                opacity: acceptanceInputAnimation.opacity,
                transform: [{ translateY: acceptanceInputAnimation.translateY }],
              }}
            >
              <CustomRadioInputBox
                title="기숙사 합격여부를 선택해주세요"
                value={acceptance}
                setValue={setAcceptance}
                items={acceptanceItems}
                setItems={setAcceptanceItems}
                isTime={false}
              />
            </Animated.View>
          )}

          {showRoommateInput && (
            <Animated.View
              style={{
                opacity: roommateInputAnimation.opacity,
                transform: [{ translateY: roommateInputAnimation.translateY }],
              }}
            >
              <CustomRadioInputBox
                title="신청실의 인원을 선택해주세요"
                value={numOfRoommate}
                setValue={(text) => {
                  setNumOfRoommate(text);
                  setShowAcceptance(true);
                }}
                items={numOfRoommateItems}
                setItems={setNumOfRoommateItems}
                isTime={false}
              />
            </Animated.View>
          )}

          <CustomTextInputBox
            title="학번을 입력해주세요"
            value={admissionYear}
            setValue={setAdmissionYear}
            placeholder="ex. 23"
            enterFunc={() => setShowRoommateInput(true)}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BasicInformationComponent;
