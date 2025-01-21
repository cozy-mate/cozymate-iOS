import React, { useState } from 'react';
import { Keyboard, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import { dormitoryItems, acceptanceItems, numOfRoommateItems } from './basicData';

import AnimationView from '@components/onBoardLifeStyle/animationView';
import TextInputComponent from '@components/onBoardLifeStyle/textInput';
import LifeStyleHeaderComponent from '@components/onBoardLifeStyle/header';
import StringRadioComponent from '@components/onBoardLifeStyle/stringRadio';
import NumberRadioComponent from '@components/onBoardLifeStyle/numberRadio';

import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useInputAnimation } from '@hooks/inputAnimation';
import useCompletionPercentage from '@hooks/useCompletionPercentage';

import { BasicLifeStyleScreenProps } from '@type/param/rootStack';

const BasicLifyStyle = ({ navigation }: BasicLifeStyleScreenProps) => {
  const { lifeStyle, clearNewLifeStyle } = useNewLifeStyleStore();

  const [showDormitoryName, setShowDormitoryName] = useState<boolean>(false);
  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  const dormitoryNameAnimation = useInputAnimation(showDormitoryName, 400);
  const roommateInputAnimation = useInputAnimation(showRoommateInput, 400);
  const acceptanceInputAnimation = useInputAnimation(showAcceptance, 400);

  const toBack = () => {
    clearNewLifeStyle();
    navigation.goBack();
  };

  const toEssential = () => {
    navigation.navigate('EssentialLifyStyleScreen');
  };

  const totalFields = 4;
  const progressWidth = useCompletionPercentage({
    fields: {
      admissionYear: lifeStyle.admissionYear,
      dormitoryName: lifeStyle.dormitoryName,
      numOfRoommate: lifeStyle.numOfRoommate,
      acceptance: lifeStyle.acceptance,
    },
    totalFields,
  });

  const canNext =
    lifeStyle.admissionYear !== '' &&
    lifeStyle.dormitoryName !== '' &&
    lifeStyle.numOfRoommate !== undefined &&
    lifeStyle.acceptance !== '';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <LifeStyleHeaderComponent
          title="기본정보"
          toBack={toBack}
          isComplete={canNext}
          buttonText="다음"
          buttonFunc={toEssential}
          width={progressWidth}
        />

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, rowGap: 56, paddingBottom: 34 }}
        >
          {/* 기숙사 합격 여부 선택 */}
          <AnimationView
            isShow={showAcceptance || !!lifeStyle.acceptance}
            inputAnimation={acceptanceInputAnimation}
          >
            <StringRadioComponent
              title="기숙사 합격여부를 선택해주세요"
              items={acceptanceItems}
              value="acceptance"
            />
          </AnimationView>

          {/* 신청실 인원 선택 */}
          <AnimationView
            isShow={showRoommateInput || !!lifeStyle.numOfRoommate}
            inputAnimation={roommateInputAnimation}
          >
            <NumberRadioComponent
              title="신청실의 인원을 선택해주세요"
              items={numOfRoommateItems}
              value="numOfRoommate"
              showNext={setShowAcceptance}
            />
          </AnimationView>

          {/* 기숙사 선택 */}
          <AnimationView
            isShow={showDormitoryName || !!lifeStyle.dormitoryName}
            inputAnimation={dormitoryNameAnimation}
          >
            <StringRadioComponent
              title="신청한 기숙사를 선택해주세요"
              items={dormitoryItems}
              value="dormitoryName"
              showNext={setShowRoommateInput}
            />
          </AnimationView>

          {/* 학번 */}
          <TextInputComponent
            title="학번을 입력해주세요"
            isNumber={true}
            value="admissionYear"
            showNext={setShowDormitoryName}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BasicLifyStyle;
