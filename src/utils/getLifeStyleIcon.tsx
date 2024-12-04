import React from 'react';
import { Text, View } from 'react-native';

import RedMbti from '@assets/lifeStyleIcon/red/redMbti.svg';
import RedMajor from '@assets/lifeStyleIcon/red/redMajor.svg';
import RedDrink from '@assets/lifeStyleIcon/red/redDrink.svg';
import BlueMbti from '@assets/lifeStyleIcon/blue/blueMbti.svg';
import RedIntake from '@assets/lifeStyleIcon/red/redIntake.svg';
import BlueMajor from '@assets/lifeStyleIcon/blue/blueMajor.svg';
import BlueDrink from '@assets/lifeStyleIcon/blue/blueDrink.svg';
import WhiteMbti from '@assets/lifeStyleIcon/white/whiteMbti.svg';
import RedSmoking from '@assets/lifeStyleIcon/red/redSmoking.svg';
import BlueIntake from '@assets/lifeStyleIcon/blue/blueIntake.svg';
import WhiteMajor from '@assets/lifeStyleIcon/white/whiteMajor.svg';
import WhiteDrink from '@assets/lifeStyleIcon/white/whiteDrink.svg';
import RedIntimacy from '@assets/lifeStyleIcon/red/redIntimacy.svg';
import RedCanShare from '@assets/lifeStyleIcon/red/redCanShare.svg';
import RedStudying from '@assets/lifeStyleIcon/red/redStudying.svg';
import BlueSmoking from '@assets/lifeStyleIcon/blue/blueSmoking.svg';
import WhiteIntake from '@assets/lifeStyleIcon/white/whiteIntake.svg';
import RedBirthYear from '@assets/lifeStyleIcon/red/redBirthYear.svg';
import BlueIntimacy from '@assets/lifeStyleIcon/blue/blueIntimacy.svg';
import BlueCanShare from '@assets/lifeStyleIcon/blue/blueCanShare.svg';
import BlueStudying from '@assets/lifeStyleIcon/blue/blueStudying.svg';
import RedAcceptance from '@assets/lifeStyleIcon/red/redAcceptance.svg';
import RedWakeUpTime from '@assets/lifeStyleIcon/red/redWakeUpTime.svg';
import RedIsPlayGame from '@assets/lifeStyleIcon/red/redIsPlayGame.svg';
import WhiteSmoking from '@assets/lifeStyleIcon/white/whiteSmoking.svg';
import BlueBirthYear from '@assets/lifeStyleIcon/blue/blueBirthYear.svg';
import WhiteIntimacy from '@assets/lifeStyleIcon/white/whiteIntimacy.svg';
import WhiteCanShare from '@assets/lifeStyleIcon/white/whiteCanShare.svg';
import WhiteStudying from '@assets/lifeStyleIcon/white/whiteStudying.svg';
import RedTurnOffTime from '@assets/lifeStyleIcon/red/redTurnOffTime.svg';
import RedLifePattern from '@assets/lifeStyleIcon/red/redLifePattern.svg';
import RedIsPhoneCall from '@assets/lifeStyleIcon/red/redIsPhoneCall.svg';
import RedPersonality from '@assets/lifeStyleIcon/red/redPersonality.svg';
import BlueAcceptance from '@assets/lifeStyleIcon/blue/blueAcceptance.svg';
import BlueWakeUpTime from '@assets/lifeStyleIcon/blue/blueWakeUpTime.svg';
import BlueIsPlayGame from '@assets/lifeStyleIcon/blue/blueIsPlayGame.svg';
import WhiteBirthYear from '@assets/lifeStyleIcon/white/whiteBirthYear.svg';
import RedSleepingTime from '@assets/lifeStyleIcon/red/redSleepingTime.svg';
import BlueTurnOffTime from '@assets/lifeStyleIcon/blue/blueTurnOffTime.svg';
import BlueLifePattern from '@assets/lifeStyleIcon/blue/blueLifePattern.svg';
import BlueIsPhoneCall from '@assets/lifeStyleIcon/blue/blueIsPhoneCall.svg';
import BluePersonality from '@assets/lifeStyleIcon/blue/bluePersonality.svg';
import WhiteAcceptance from '@assets/lifeStyleIcon/white/whiteAcceptance.svg';
import WhiteWakeUpTime from '@assets/lifeStyleIcon/white/whiteWakeUpTime.svg';
import WhiteIsPlayGame from '@assets/lifeStyleIcon/white/whiteIsPlayGame.svg';
import RedAdmissionYear from '@assets/lifeStyleIcon/red/redAdmissionYear.svg';
import RedSleepingHabit from '@assets/lifeStyleIcon/red/redSleepingHabit.svg';
import BlueSleepingTime from '@assets/lifeStyleIcon/blue/blueSleepingTime.svg';
import WhiteTurnOffTime from '@assets/lifeStyleIcon/white/whiteTurnOffTime.svg';
import WhiteLifePattern from '@assets/lifeStyleIcon/white/whiteLifePattern.svg';
import WhiteIsPhoneCall from '@assets/lifeStyleIcon/white/whiteIsPhoneCall.svg';
import WhitePersonality from '@assets/lifeStyleIcon/white/whitePersonality.svg';
import BlueAdmissionYear from '@assets/lifeStyleIcon/blue/blueAdmissionYear.svg';
import BlueSleepingHabit from '@assets/lifeStyleIcon/blue/blueSleepingHabit.svg';
import WhiteSleepingTime from '@assets/lifeStyleIcon/white/whiteSleepingTime.svg';
import WhiteAdmissionYear from '@assets/lifeStyleIcon/white/whiteAdmissionYear.svg';
import WhiteSleepingHabit from '@assets/lifeStyleIcon/white/whiteSleepingHabit.svg';
import RedHeatingIntensity from '@assets/lifeStyleIcon/red/redHeatingIntensity.svg';
import RedCleanSensitivity from '@assets/lifeStyleIcon/red/redCleanSensitivity.svg';
import RedNoiseSensitivity from '@assets/lifeStyleIcon/red/redNoiseSensitivity.svg';
import RedCleaningFrequency from '@assets/lifeStyleIcon/red/redCleaningFrequency.svg';
import BlueHeatingIntensity from '@assets/lifeStyleIcon/blue/blueHeatingIntensity.svg';
import BlueCleanSensitivity from '@assets/lifeStyleIcon/blue/blueCleanSensitivity.svg';
import BlueNoiseSensitivity from '@assets/lifeStyleIcon/blue/blueNoiseSensitivity.svg';
import BlueCleaningFrequency from '@assets/lifeStyleIcon/blue/blueCleaningFrequency.svg';
import WhiteHeatingIntensity from '@assets/lifeStyleIcon/white/whiteHeatingIntensity.svg';
import WhiteCleanSensitivity from '@assets/lifeStyleIcon/white/whiteCleanSensitivity.svg';
import WhiteNoiseSensitivity from '@assets/lifeStyleIcon/white/whiteNoiseSensitivity.svg';
import WhiteCleaningFrequency from '@assets/lifeStyleIcon/white/whiteCleaningFrequency.svg';
import RedAirConditioningIntensity from '@assets/lifeStyleIcon/red/redAirConditioningIntensity.svg';
import BlueAirConditioningIntensity from '@assets/lifeStyleIcon/blue/blueAirConditioningIntensity.svg';
import WhiteAirConditioningIntensity from '@assets/lifeStyleIcon/white/whiteAirConditioningIntensity.svg';

export type LifestyleOptionKey =
  | 'admissionYear'
  | 'numOfRoommate'
  | 'birthYear'
  | 'majorName'
  | 'acceptance'
  | 'wakeUpTime'
  | 'sleepingTime'
  | 'turnOffTime'
  | 'smoking'
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
  | 'drinkingFrequency'
  | 'personality'
  | 'mbti';

interface LifestyleOption {
  blueIcon: JSX.Element;
  whiteIcon: JSX.Element;
  redIcon: JSX.Element;
  label: string;
}

export const lifestyleOptions: Record<string, LifestyleOption> = {
  admissionYear: {
    blueIcon: <BlueAdmissionYear />,
    whiteIcon: <WhiteAdmissionYear />,
    redIcon: <RedAdmissionYear />,
    label: '학번',
  },
  numOfRoommate: {
    blueIcon: <BlueAdmissionYear />,
    whiteIcon: <WhiteAdmissionYear />,
    redIcon: <RedAdmissionYear />,
    label: '신청실',
  },
  birthYear: {
    blueIcon: <BlueBirthYear />,
    whiteIcon: <WhiteBirthYear />,
    redIcon: <RedBirthYear />,
    label: '출생년도',
  },
  majorName: {
    blueIcon: <BlueMajor />,
    whiteIcon: <WhiteMajor />,
    redIcon: <RedMajor />,
    label: '학과',
  },
  acceptance: {
    blueIcon: <BlueAcceptance />,
    whiteIcon: <WhiteAcceptance />,
    redIcon: <RedAcceptance />,
    label: '합격여부',
  },
  wakeUpTime: {
    blueIcon: <BlueWakeUpTime />,
    whiteIcon: <WhiteWakeUpTime />,
    redIcon: <RedWakeUpTime />,
    label: '기상시간',
  },
  sleepingTime: {
    blueIcon: <BlueSleepingTime />,
    whiteIcon: <WhiteSleepingTime />,
    redIcon: <RedSleepingTime />,
    label: '취침시간',
  },
  turnOffTime: {
    blueIcon: <BlueTurnOffTime />,
    whiteIcon: <WhiteTurnOffTime />,
    redIcon: <RedTurnOffTime />,
    label: '소등시간',
  },
  smoking: {
    blueIcon: <BlueSmoking />,
    whiteIcon: <WhiteSmoking />,
    redIcon: <RedSmoking />,
    label: '흡연여부',
  },
  sleepingHabit: {
    blueIcon: <BlueSleepingHabit />,
    whiteIcon: <WhiteSleepingHabit />,
    redIcon: <RedSleepingHabit />,
    label: '잠버릇',
  },
  airConditioningIntensity: {
    blueIcon: <BlueAirConditioningIntensity />,
    whiteIcon: <WhiteAirConditioningIntensity />,
    redIcon: <RedAirConditioningIntensity />,
    label: '에어컨',
  },
  heatingIntensity: {
    blueIcon: <BlueHeatingIntensity />,
    whiteIcon: <WhiteHeatingIntensity />,
    redIcon: <RedHeatingIntensity />,
    label: '히터',
  },
  lifePattern: {
    blueIcon: <BlueLifePattern />,
    whiteIcon: <WhiteLifePattern />,
    redIcon: <RedLifePattern />,
    label: '생활패턴',
  },
  intimacy: {
    blueIcon: <BlueIntimacy />,
    whiteIcon: <WhiteIntimacy />,
    redIcon: <RedIntimacy />,
    label: '친밀도',
  },
  canShare: {
    blueIcon: <BlueCanShare />,
    whiteIcon: <WhiteCanShare />,
    redIcon: <RedCanShare />,
    label: '물건공유',
  },
  isPlayGame: {
    blueIcon: <BlueIsPlayGame />,
    whiteIcon: <WhiteIsPlayGame />,
    redIcon: <RedIsPlayGame />,
    label: '게임여부',
  },
  isPhoneCall: {
    blueIcon: <BlueIsPhoneCall />,
    whiteIcon: <WhiteIsPhoneCall />,
    redIcon: <RedIsPhoneCall />,
    label: '전화여부',
  },
  studying: {
    blueIcon: <BlueStudying />,
    whiteIcon: <WhiteStudying />,
    redIcon: <RedStudying />,
    label: '공부여부',
  },
  intake: {
    blueIcon: <BlueIntake />,
    whiteIcon: <WhiteIntake />,
    redIcon: <RedIntake />,
    label: '섭취여부',
  },
  cleanSensitivity: {
    blueIcon: <BlueCleanSensitivity />,
    whiteIcon: <WhiteCleanSensitivity />,
    redIcon: <RedCleanSensitivity />,
    label: '청결예민도',
  },
  noiseSensitivity: {
    blueIcon: <BlueNoiseSensitivity />,
    whiteIcon: <WhiteNoiseSensitivity />,
    redIcon: <RedNoiseSensitivity />,
    label: '소음예민도',
  },
  cleaningFrequency: {
    blueIcon: <BlueCleaningFrequency />,
    whiteIcon: <WhiteCleaningFrequency />,
    redIcon: <RedCleaningFrequency />,
    label: '청소빈도',
  },
  drinkingFrequency: {
    blueIcon: <BlueDrink />,
    whiteIcon: <WhiteDrink />,
    redIcon: <RedDrink />,
    label: '음주빈도',
  },
  personality: {
    blueIcon: <BluePersonality />,
    whiteIcon: <WhitePersonality />,
    redIcon: <RedPersonality />,
    label: '성격',
  },
  mbti: { blueIcon: <BlueMbti />, whiteIcon: <WhiteMbti />, redIcon: <RedMbti />, label: 'MBTI' },
};

interface LifeStyleIconProps {
  icon: JSX.Element;
  label: string;
  answer?: string | number | string[] | null;
  isMine: boolean;
}

const truncateAnswer = (answer: string, maxLength: number) => {
  if (answer.length > maxLength) {
    return answer.slice(0, maxLength) + '..';
  }
  return answer;
};

const LifestyleIcon: React.FC<LifeStyleIconProps> = ({ icon, label, answer, isMine }) => (
  <View className="flex flex-col items-center">
    {icon}
    <Text
      className={`mt-1.5 text-xs tracking-tighter ${
        isMine ? 'font-semibold text-emphasizedFont' : 'font-medium text-disabledFont'
      }`}
    >
      {label}
    </Text>
    {!isMine ? (
      answer !== undefined && answer !== null ? (
        <Text className="text-xs font-semibold tracking-tighter text-basicFont">
          {truncateAnswer(answer.toString(), 6)}
        </Text>
      ) : (
        <Text className="text-xs font-semibold tracking-tighter text-basicFont">-</Text>
      )
    ) : null}
  </View>
);

export const getLifestyleLabel = (key: string): string => {
  const option = lifestyleOptions[key];
  return option ? option.label : 'Unknown Option';
};

// 마이페이지의 내 정보에서 선택한 라이프 스타일을 보여주는 컴포넌트를 생성하는 메서드
export const getMyImportantLifeStyle = (option: LifestyleOptionKey) => {
  const { blueIcon, label } = lifestyleOptions[option] || lifestyleOptions.sleepingTime;
  return <LifestyleIcon icon={blueIcon} label={label} isMine={true} />;
};

const IntensityItems = ['안틀어요', '약하게 틀어요', '적당하게 틀어요', '강하게 틀어요'];

const SensitivityItems = [
  '매우 예민하지 않아요',
  '예민하지 않아요',
  '보통이에요',
  '예민해요',
  '매우 예민해요',
];

// 방 안의 룸메이트들의 라이프 스타일 비교를 위한 컴포넌트를 생성하는 메서드
export const getRoommateLifeStyleIcon = (
  option: string,
  color: string,
  answer: string | number | string[],
) => {
  const { blueIcon, whiteIcon, redIcon, label } = lifestyleOptions[option];

  let icon;
  if (color === 'blue') {
    icon = blueIcon;
  } else if (color === 'white') {
    icon = whiteIcon;
  } else {
    icon = redIcon;
  }

  // answer 값 처리
  if (option === 'numOfRoommate') {
    answer = `${answer}명`;
  } else if (option === 'wakeUpTime' || option === 'sleepingTime' || option === 'turnOffTime') {
    const time = Number(answer);
    const period = time < 12 ? '오전' : '오후';
    const formattedTime = time % 12 === 0 ? 12 : time % 12;
    answer = `${period} ${String(formattedTime).padStart(2, '0')}시`;
  } else if (option === 'sleepingHabit' || option === 'personality') {
    if (Array.isArray(answer)) {
      answer = answer.join(', ');
    }
  } else if (option === 'airConditioningIntensity' || option === 'heatingIntensity') {
    answer = IntensityItems[Number(answer)];
  } else if (option === 'cleanSensitivity' || option === 'noiseSensitivity') {
    answer = SensitivityItems[Number(answer) - 1];
  }

  return <LifestyleIcon icon={icon} label={label} answer={answer} isMine={false} />;
};

export const getRoomLifeStyleIcon = (option: string, color: string, answer: string) => {
  const { blueIcon, whiteIcon, redIcon, label } = lifestyleOptions[option];

  let icon;
  if (color === 'blue') {
    icon = blueIcon;
  } else if (color === 'white') {
    icon = whiteIcon;
  } else {
    icon = redIcon;
  }

  return <LifestyleIcon icon={icon} label={label} answer={answer} isMine={false} />;
};
