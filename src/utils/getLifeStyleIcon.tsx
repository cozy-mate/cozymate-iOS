import React from 'react';
import { Text, View } from 'react-native';

import RedMbti from '@assets/lifeStyleIcon/red/redMbti.svg';
import RedMajor from '@assets/lifeStyleIcon/red/redMajor.svg';
import RedDrink from '@assets/lifeStyleIcon/red/redDrink.svg';
import BlueMbti from '@assets/lifeStyleIcon/blue/blueMbti.svg';
import GrayMbti from '@assets/lifeStyleIcon/gray/grayMbti.svg';
import RedIntake from '@assets/lifeStyleIcon/red/redIntake.svg';
import BlueMajor from '@assets/lifeStyleIcon/blue/blueMajor.svg';
import BlueDrink from '@assets/lifeStyleIcon/blue/blueDrink.svg';
import GrayMajor from '@assets/lifeStyleIcon/gray/grayMajor.svg';
import GrayDrink from '@assets/lifeStyleIcon/gray/grayDrink.svg';
import BlueIntake from '@assets/lifeStyleIcon/blue/blueIntake.svg';
import GrayIntake from '@assets/lifeStyleIcon/gray/grayIntake.svg';
import RedIntimacy from '@assets/lifeStyleIcon/red/redIntimacy.svg';
import RedCanShare from '@assets/lifeStyleIcon/red/redCanShare.svg';
import RedStudying from '@assets/lifeStyleIcon/red/redStudying.svg';
import RedBirthYear from '@assets/lifeStyleIcon/red/redBirthYear.svg';
import BlueIntimacy from '@assets/lifeStyleIcon/blue/blueIntimacy.svg';
import BlueCanShare from '@assets/lifeStyleIcon/blue/blueCanShare.svg';
import BlueStudying from '@assets/lifeStyleIcon/blue/blueStudying.svg';
import GrayIntimacy from '@assets/lifeStyleIcon/gray/grayIntimacy.svg';
import GrayCanShare from '@assets/lifeStyleIcon/gray/grayCanShare.svg';
import GrayStudying from '@assets/lifeStyleIcon/gray/grayStudying.svg';
import RedAcceptance from '@assets/lifeStyleIcon/red/redAcceptance.svg';
import RedWakeUpTime from '@assets/lifeStyleIcon/red/redWakeUpTime.svg';
import RedIsPlayGame from '@assets/lifeStyleIcon/red/redIsPlayGame.svg';
import BlueBirthYear from '@assets/lifeStyleIcon/blue/blueBirthYear.svg';
import GrayBirthYear from '@assets/lifeStyleIcon/gray/grayBirthYear.svg';
import RedTurnOffTime from '@assets/lifeStyleIcon/red/redTurnOffTime.svg';
import RedLifePattern from '@assets/lifeStyleIcon/red/redLifePattern.svg';
import RedIsPhoneCall from '@assets/lifeStyleIcon/red/redIsPhoneCall.svg';
import RedPersonality from '@assets/lifeStyleIcon/red/redPersonality.svg';
import BlueAcceptance from '@assets/lifeStyleIcon/blue/blueAcceptance.svg';
import BlueWakeUpTime from '@assets/lifeStyleIcon/blue/blueWakeUpTime.svg';
import BlueIsPlayGame from '@assets/lifeStyleIcon/blue/blueIsPlayGame.svg';
import GrayAcceptance from '@assets/lifeStyleIcon/gray/grayAcceptance.svg';
import GrayWakeUpTime from '@assets/lifeStyleIcon/gray/grayWakeUpTime.svg';
import GrayIsPlayGame from '@assets/lifeStyleIcon/gray/grayIsPlayGame.svg';
import RedSleepingTime from '@assets/lifeStyleIcon/red/redSleepingTime.svg';
import RedSmokingState from '@assets/lifeStyleIcon/red/redSmokingState.svg';
import BlueTurnOffTime from '@assets/lifeStyleIcon/blue/blueTurnOffTime.svg';
import BlueLifePattern from '@assets/lifeStyleIcon/blue/blueLifePattern.svg';
import BlueIsPhoneCall from '@assets/lifeStyleIcon/blue/blueIsPhoneCall.svg';
import BluePersonality from '@assets/lifeStyleIcon/blue/bluePersonality.svg';
import GrayTurnOffTime from '@assets/lifeStyleIcon/gray/grayTurnOffTime.svg';
import GrayLifePattern from '@assets/lifeStyleIcon/gray/grayLifePattern.svg';
import GrayIsPhoneCall from '@assets/lifeStyleIcon/gray/grayIsPhoneCall.svg';
import GrayPersonality from '@assets/lifeStyleIcon/gray/grayPersonality.svg';
import RedAdmissionYear from '@assets/lifeStyleIcon/red/redAdmissionYear.svg';
import RedSleepingHabit from '@assets/lifeStyleIcon/red/redSleepingHabit.svg';
import BlueSleepingTime from '@assets/lifeStyleIcon/blue/blueSleepingTime.svg';
import BlueSmokingState from '@assets/lifeStyleIcon/blue/blueSmokingState.svg';
import GraySleepingTime from '@assets/lifeStyleIcon/gray/graySleepingTime.svg';
import GraySmokingState from '@assets/lifeStyleIcon/gray/graySmokingState.svg';
import BlueAdmissionYear from '@assets/lifeStyleIcon/blue/blueAdmissionYear.svg';
import BlueSleepingHabit from '@assets/lifeStyleIcon/blue/blueSleepingHabit.svg';
import GrayAdmissionYear from '@assets/lifeStyleIcon/gray/grayAdmissionYear.svg';
import GraySleepingHabit from '@assets/lifeStyleIcon/gray/graySleepingHabit.svg';
import RedHeatingIntensity from '@assets/lifeStyleIcon/red/redHeatingIntensity.svg';
import RedCleanSensitivity from '@assets/lifeStyleIcon/red/redCleanSensitivity.svg';
import RedNoiseSensitivity from '@assets/lifeStyleIcon/red/redNoiseSensitivity.svg';
import RedCleaningFrequency from '@assets/lifeStyleIcon/red/redCleaningFrequency.svg';
import BlueHeatingIntensity from '@assets/lifeStyleIcon/blue/blueHeatingIntensity.svg';
import BlueCleanSensitivity from '@assets/lifeStyleIcon/blue/blueCleanSensitivity.svg';
import BlueNoiseSensitivity from '@assets/lifeStyleIcon/blue/blueNoiseSensitivity.svg';
import GrayHeatingIntensity from '@assets/lifeStyleIcon/gray/grayHeatingIntensity.svg';
import GrayCleanSensitivity from '@assets/lifeStyleIcon/gray/grayCleanSensitivity.svg';
import GrayNoiseSensitivity from '@assets/lifeStyleIcon/gray/grayNoiseSensitivity.svg';
import BlueCleaningFrequency from '@assets/lifeStyleIcon/blue/blueCleaningFrequency.svg';
import GrayCleaningFrequency from '@assets/lifeStyleIcon/gray/grayCleaningFrequency.svg';
import RedAirConditioningIntensity from '@assets/lifeStyleIcon/red/redAirConditioningIntensity.svg';
import BlueAirConditioningIntensity from '@assets/lifeStyleIcon/blue/blueAirConditioningIntensity.svg';
import GrayAirConditioningIntensity from '@assets/lifeStyleIcon/gray/grayAirConditioningIntensity.svg';

export type LifestyleOptionKey =
  | 'admissionYear'
  | 'birthYear'
  | 'major'
  | 'acceptance'
  | 'wakeUpTime'
  | 'sleepingTime'
  | 'turnOffTime'
  | 'smokingState'
  | 'sleepingHabit'
  | 'airConditioningIntensity'
  | 'heatingIntensity'
  | 'lifePattern'
  | 'intimacy'
  | 'canShare'
  | 'isPlayGame'
  | 'isPhoneCall'
  | 'studying'
  | 'intake'
  | 'cleanSensitivity'
  | 'noiseSensitivity'
  | 'cleaningFrequency'
  | 'personality'
  | 'mbti'
  | 'drink';

interface LifestyleOption {
  blueIcon: JSX.Element;
  grayIcon: JSX.Element;
  redIcon: JSX.Element;
  label: string;
}

export const lifestyleOptions: Record<LifestyleOptionKey, LifestyleOption> = {
  admissionYear: {
    blueIcon: <BlueAdmissionYear />,
    grayIcon: <GrayAdmissionYear />,
    redIcon: <RedAdmissionYear />,
    label: '학번',
  },
  birthYear: {
    blueIcon: <BlueBirthYear />,
    grayIcon: <GrayBirthYear />,
    redIcon: <RedBirthYear />,
    label: '출생년도',
  },
  major: { blueIcon: <BlueMajor />, grayIcon: <GrayMajor />, redIcon: <RedMajor />, label: '학과' },
  acceptance: {
    blueIcon: <BlueAcceptance />,
    grayIcon: <GrayAcceptance />,
    redIcon: <RedAcceptance />,
    label: '합격여부',
  },
  wakeUpTime: {
    blueIcon: <BlueWakeUpTime />,
    grayIcon: <GrayWakeUpTime />,
    redIcon: <RedWakeUpTime />,
    label: '기상시간',
  },
  sleepingTime: {
    blueIcon: <BlueSleepingTime />,
    grayIcon: <GraySleepingTime />,
    redIcon: <RedSleepingTime />,
    label: '취침시간',
  },
  turnOffTime: {
    blueIcon: <BlueTurnOffTime />,
    grayIcon: <GrayTurnOffTime />,
    redIcon: <RedTurnOffTime />,
    label: '소등시간',
  },
  smokingState: {
    blueIcon: <BlueSmokingState />,
    grayIcon: <GraySmokingState />,
    redIcon: <RedSmokingState />,
    label: '흡연여부',
  },
  sleepingHabit: {
    blueIcon: <BlueSleepingHabit />,
    grayIcon: <GraySleepingHabit />,
    redIcon: <RedSleepingHabit />,
    label: '잠버릇',
  },
  airConditioningIntensity: {
    blueIcon: <BlueAirConditioningIntensity />,
    grayIcon: <GrayAirConditioningIntensity />,
    redIcon: <RedAirConditioningIntensity />,
    label: '에어컨',
  },
  heatingIntensity: {
    blueIcon: <BlueHeatingIntensity />,
    grayIcon: <GrayHeatingIntensity />,
    redIcon: <RedHeatingIntensity />,
    label: '히터',
  },
  lifePattern: {
    blueIcon: <BlueLifePattern />,
    grayIcon: <GrayLifePattern />,
    redIcon: <RedLifePattern />,
    label: '생활패턴',
  },
  intimacy: {
    blueIcon: <BlueIntimacy />,
    grayIcon: <GrayIntimacy />,
    redIcon: <RedIntimacy />,
    label: '친밀도',
  },
  canShare: {
    blueIcon: <BlueCanShare />,
    grayIcon: <GrayCanShare />,
    redIcon: <RedCanShare />,
    label: '물건공유',
  },
  isPlayGame: {
    blueIcon: <BlueIsPlayGame />,
    grayIcon: <GrayIsPlayGame />,
    redIcon: <RedIsPlayGame />,
    label: '게임여부',
  },
  isPhoneCall: {
    blueIcon: <BlueIsPhoneCall />,
    grayIcon: <GrayIsPhoneCall />,
    redIcon: <RedIsPhoneCall />,
    label: '전화여부',
  },
  studying: {
    blueIcon: <BlueStudying />,
    grayIcon: <GrayStudying />,
    redIcon: <RedStudying />,
    label: '공부여부',
  },
  intake: {
    blueIcon: <BlueIntake />,
    grayIcon: <GrayIntake />,
    redIcon: <RedIntake />,
    label: '섭취여부',
  },
  cleanSensitivity: {
    blueIcon: <BlueCleanSensitivity />,
    grayIcon: <GrayCleanSensitivity />,
    redIcon: <RedCleanSensitivity />,
    label: '청결예민도',
  },
  noiseSensitivity: {
    blueIcon: <BlueNoiseSensitivity />,
    grayIcon: <GrayNoiseSensitivity />,
    redIcon: <RedNoiseSensitivity />,
    label: '소음예민도',
  },
  cleaningFrequency: {
    blueIcon: <BlueCleaningFrequency />,
    grayIcon: <GrayCleaningFrequency />,
    redIcon: <RedCleaningFrequency />,
    label: '청소빈도',
  },
  personality: {
    blueIcon: <BluePersonality />,
    grayIcon: <GrayPersonality />,
    redIcon: <RedPersonality />,
    label: '성격',
  },
  mbti: { blueIcon: <BlueMbti />, grayIcon: <GrayMbti />, redIcon: <RedMbti />, label: 'MBTI' },
  drink: {
    blueIcon: <BlueDrink />,
    grayIcon: <GrayDrink />,
    redIcon: <RedDrink />,
    label: '음주빈도',
  },
};

interface LifeStyleIconProps {
  icon: JSX.Element;
  label: string;
  answer: string;
}

const truncateAnswer = (answer: string, maxLength: number) => {
  if (answer.length > maxLength) {
    return answer.slice(0, maxLength) + '..';
  }
  return answer;
};

const LifestyleIcon: React.FC<LifeStyleIconProps> = ({ icon, label, answer }) => (
  <View className="flex flex-col items-center">
    {icon}
    <Text className="mt-1.5 text-xs font-medium text-disabledFont">{label}</Text>
    <Text className="text-xs font-semibold text-basicFont">{truncateAnswer(answer, 5)}</Text>
  </View>
);

// 룸메이트의 라이프 스타일 비교를 위한 컴포넌트를 생성하는 메서드
export const getRoommateLifeStyleIcon = (option: LifestyleOptionKey, answer: string) => {
  const { blueIcon, label } = lifestyleOptions[option] || lifestyleOptions.sleepingTime;
  return <LifestyleIcon icon={blueIcon} label={label} answer={answer} />;
};

// 방 안의 룸메이트들의 라이프 스타일 비교를 위한 컴포넌트를 생성하는 메서드
export const getRoomLifeStyleIcon = (
  option: LifestyleOptionKey,
  color: 'blue' | 'gray' | 'red',
  answer: string,
) => {
  const { blueIcon, grayIcon, redIcon, label } =
    lifestyleOptions[option] || lifestyleOptions.sleepingTime;

  let icon;
  if (color === 'blue') {
    icon = blueIcon;
  } else if (color === 'gray') {
    icon = grayIcon;
  } else {
    icon = redIcon;
  }

  return <LifestyleIcon icon={icon} label={label} answer={answer} />;
};
