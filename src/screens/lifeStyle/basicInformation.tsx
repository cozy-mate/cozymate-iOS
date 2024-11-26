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

import { useProfileStore } from '@zustand/member/member';
import { useRegisterLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useInputAnimation } from '@hooks/inputAnimation';
import { useGetUniversityInfo } from '@hooks/api/university';
import useCompletionPercentage from '@hooks/useCompletionPercentage';

import { BasicLifeStyleScreenProps } from '@type/param/stack';

type Item = {
  index: number;
  value: string | number;
  name: string;
  select: boolean;
};

const BasicInformationComponent = ({ navigation, route }: BasicLifeStyleScreenProps) => {
  const { returnToUser, returnToRoom } = route.params ?? {};

  const { profile } = useProfileStore();
  const { data: universityData } = useGetUniversityInfo(profile.universityId);

  const { setRegisterLifeStyle } = useRegisterLifeStyleStore();

  const [admissionYear, setAdmissionYear] = useState<string>('');
  const [dormitoryName, setDormitoryName] = useState<string>('');
  const [numOfRoommate, setNumOfRoommate] = useState<number | undefined>(undefined);
  const [acceptance, setAcceptance] = useState<string>('');

  const canNext =
    admissionYear !== '' &&
    dormitoryName !== '' &&
    numOfRoommate !== undefined &&
    acceptance !== '';

  // 유저 대학교의 기숙사 정보(string[])를 Item 형식으로 변환
  const dormitoryItems: Item[] = universityData.result.dormitoryNames.map((name, index) => ({
    index: index + 1,
    value: name,
    name: name,
    select: false,
  }));

  const [dormitoryNameItems, setDormitoryNameItems] = useState<Item[]>(dormitoryItems);

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
    setRegisterLifeStyle({
      admissionYear: admissionYear,
      dormitoryName: dormitoryName,
      numOfRoommate: numOfRoommate,
      acceptance: acceptance,
    });

    if (returnToUser) {
      navigation.navigate('EssentialLifeStyleScreen', { returnToUser });
    } else if (returnToRoom) {
      navigation.navigate('EssentialLifeStyleScreen', { returnToRoom });
    } else {
      navigation.navigate('EssentialLifeStyleScreen');
    }
  };

  const [showDormitoryName, setShowDormitoryName] = useState<boolean>(false);
  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  const dormitoryNameAnimation = useInputAnimation(showDormitoryName, 400);
  const roommateInputAnimation = useInputAnimation(showRoommateInput, 400);
  const acceptanceInputAnimation = useInputAnimation(showAcceptance, 400);

  const totalFields = 4;
  const progressWidth = useCompletionPercentage({
    fields: {
      admissionYear,
      dormitoryName,
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

          {showDormitoryName && (
            <Animated.View
              style={{
                opacity: dormitoryNameAnimation.opacity,
                transform: [{ translateY: dormitoryNameAnimation.translateY }],
              }}
            >
              <CustomRadioInputBox
                title="신청한 기숙사를 선택해주세요"
                value={dormitoryName}
                setValue={(text) => {
                  setDormitoryName(text);
                  setShowRoommateInput(true);
                }}
                items={dormitoryNameItems}
                setItems={setDormitoryNameItems}
                isTime={false}
              />
            </Animated.View>
          )}

          <CustomTextInputBox
            title="학번을 입력해주세요"
            value={admissionYear}
            setValue={setAdmissionYear}
            placeholder="ex. 23"
            enterFunc={() => setShowDormitoryName(true)}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BasicInformationComponent;
