import CustomRadioInputBox from '@components/common/customRadioInputBox';
import CustomTextInputBox from '@components/common/customTextInputBox';
import { lifeStyleState } from '@recoil/recoil';
import { LifeStyle } from '@recoil/type';
import { BasicLifeStyleScreenProps } from '@type/param/loginStack';
import React, { useState } from 'react';
import { Animated, SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import BackHeader from 'src/layout/backHeader';

import { useInputAnimation } from '@hooks/inputAnimation';
import useCompletionPercentage from '@hooks/useCompletionPercentage';

type Item = {
  index: number;
  value: string | number;
  name: string;
  select: boolean;
};

const BasicInformationComponent = ({ navigation }: BasicLifeStyleScreenProps) => {
  const [, setLifeStyle] = useRecoilState(lifeStyleState);

  const [admissionYear, setAdmissionYear] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [numOfRoommate, setNumOfRoommate] = useState<number>(0);
  const [acceptance, setAcceptance] = useState<string>('');

  const canNext = admissionYear !== '' && major !== '' && numOfRoommate !== 0 && acceptance !== '';

  const [numOfRoommateItems, setNumOfRoommateItems] = useState<Item[]>([
    { index: 1, value: 2, name: '2인', select: false },
    { index: 2, value: 3, name: '3인', select: false },
    { index: 3, value: 4, name: '4인', select: false },
    { index: 4, value: 5, name: '5인', select: false },
    { index: 5, value: 6, name: '6인', select: false },
  ]);

  const [acceptanceItems, setAcceptanceItems] = useState<Item[]>([
    { index: 1, value: '합격', name: '합격', select: false },
    { index: 2, value: '대기중', name: '대기중', select: false },
    { index: 3, value: '예비번호', name: '예비번호를 받았어요!', select: false },
  ]);

  const toPrev = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  const toNext = async (): Promise<void> => {
    setLifeStyle((prevState: LifeStyle) => ({
      ...prevState,
      admissionYear: admissionYear,
      major: major,
      numOfRoommate: numOfRoommate,
      acceptance: acceptance,
    }));

    navigation.navigate('EssentialLifeStyleScreen');
  };

  const [showMajorInput, setShowMajorInput] = useState<boolean>(false);
  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  const majorInputAnimation = useInputAnimation(showMajorInput, 400);
  const roommateInputAnimation = useInputAnimation(showRoommateInput, 400);
  const acceptanceInputAnimation = useInputAnimation(showAcceptance, 400);

  const totalFields = 4;
  const progressWidth = useCompletionPercentage({
    fields: {
      admissionYear,
      major,
      numOfRoommate,
      acceptance,
    },
    totalFields,
  });

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
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
                setShowAcceptance(!!text);
              }}
              items={numOfRoommateItems}
              setItems={setNumOfRoommateItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showMajorInput && (
          <Animated.View
            style={{
              opacity: majorInputAnimation.opacity,
              transform: [{ translateY: majorInputAnimation.translateY }],
            }}
          >
            <CustomTextInputBox
              title="학과를 입력해주세요"
              value={major}
              setValue={setMajor}
              placeholder="ex. 경영학과"
              onEnterPress={() => setShowRoommateInput(true)}
            />
          </Animated.View>
        )}

        <CustomTextInputBox
          title="학번을 입력해주세요"
          value={admissionYear}
          setValue={setAdmissionYear}
          placeholder="ex. 23"
          onEnterPress={() => setShowMajorInput(true)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInformationComponent;
