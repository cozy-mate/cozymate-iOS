import AddButton from '@components/lifeStyle/addButton';
import { lifeStyleState } from '@recoil/recoil';
import { registerUserData } from '@server/api/member-stat';
import { AdditionalLifeStyleScreenProps } from '@type/param/stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import BackHeader from 'src/layout/backHeader';

const AdditionalInformationComponent = ({ navigation }: AdditionalLifeStyleScreenProps) => {
  const [lifeStyle, setLifeStyle] = useRecoilState(lifeStyleState);

  const [unconditionalInputs, setUnconditionalInputs] = useState<string[]>([]);
  const [canMatchInputs, setCanMatchInputs] = useState<string[]>([]);
  const [neverInputs, setNeverInputs] = useState<string[]>([]);

  const toPrev = () => {
    navigation.navigate('EssentialLifeStyleScreen');
  };

  const toNext = async () => {
    setLifeStyle({
      ...lifeStyle,
      options: {
        ...lifeStyle.options,
        '무조건 지켜줘야 해요!': unconditionalInputs,
        '이정도는 맞춰줄 수 있어요!': canMatchInputs,
        '이건 절대 절대 안 돼요!': neverInputs,
      },
    });

    console.log(lifeStyle);

    try {
      await registerUserData({
        universityId: 1,
        admissionYear: lifeStyle.admissionYear,
        major: lifeStyle.major,
        numOfRoommate: lifeStyle.numOfRoommate,
        acceptance: lifeStyle.acceptance,
        wakeUpMeridian: lifeStyle.wakeUpMeridian,
        wakeUpTime: lifeStyle.wakeUpTime,
        sleepingMeridian: lifeStyle.sleepingMeridian,
        sleepingTime: lifeStyle.sleepingTime,
        turnOffMeridian: lifeStyle.turnOffMeridian,
        turnOffTime: lifeStyle.turnOffTime,
        smokingState: lifeStyle.smokingState,
        sleepingHabit: lifeStyle.sleepingHabit,
        airConditioningIntensity: lifeStyle.airConditioningIntensity,
        heatingIntensity: lifeStyle.heatingIntensity,
        lifePattern: lifeStyle.lifePattern,
        intimacy: lifeStyle.intimacy,
        canShare: lifeStyle.canShare,
        isPlayGame: lifeStyle.isPlayGame,
        isPhoneCall: lifeStyle.isPhoneCall,
        studying: lifeStyle.studying,
        intake: lifeStyle.intake,
        cleanSensitivity: lifeStyle.cleanSensitivity,
        noiseSensitivity: lifeStyle.noiseSensitivity,
        cleaningFrequency: lifeStyle.cleaningFrequency,
        personality: lifeStyle.personality,
        mbti: lifeStyle.mbti,
        options: {
          '무조건 지켜줘야 해요!': lifeStyle.options['무조건 지켜줘야 해요!'],
          '이정도는 맞춰줄 수 있어요!': lifeStyle.options['이정도는 맞춰줄 수 있어요!'],
          '이건 절대 절대 안 돼요!': lifeStyle.options['이건 절대 절대 안 돼요!'],
        },
      });
      navigation.navigate('MainScreen', { screen: 'RoomMateScreen' });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleInputChange = (
    type: 'unconditional' | 'canMatch' | 'never',
    text: string,
    index: number,
  ) => {
    if (type === 'unconditional') {
      const updatedInputs = [...unconditionalInputs];
      updatedInputs[index] = text;
      setUnconditionalInputs(updatedInputs);
    } else if (type === 'canMatch') {
      const updatedInputs = [...canMatchInputs];
      updatedInputs[index] = text;
      setCanMatchInputs(updatedInputs);
    } else if (type === 'never') {
      const updatedInputs = [...neverInputs];
      updatedInputs[index] = text;
      setNeverInputs(updatedInputs);
    }
  };

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <BackHeader
        title="선택정보"
        buttonString="완료"
        leftPressFunc={toPrev}
        rightPressFunc={toNext}
        canNext={true}
        width={400}
      />
      <ScrollView className="px-5">
        <AddButton
          title="무조건 지켜줘야 해요!"
          inputs={unconditionalInputs}
          onInputChange={(text, index) => handleInputChange('unconditional', text, index)}
          onAddInput={() => setUnconditionalInputs([...unconditionalInputs, ''])}
        />
        <AddButton
          title="이정도는 맞춰줄 수 있어요!"
          inputs={canMatchInputs}
          onInputChange={(text, index) => handleInputChange('canMatch', text, index)}
          onAddInput={() => setCanMatchInputs([...canMatchInputs, ''])}
        />
        <AddButton
          title="이건 절대 절대 안 돼요!"
          inputs={neverInputs}
          onInputChange={(text, index) => handleInputChange('never', text, index)}
          onAddInput={() => setNeverInputs([...neverInputs, ''])}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdditionalInformationComponent;
