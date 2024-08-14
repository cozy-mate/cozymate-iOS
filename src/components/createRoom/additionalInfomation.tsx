import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import TextInputBoxComponent from '@components/textInputBox';
import RadioBoxComponent from '@components/radioBox';
import CustomRadioBoxComponent from './customRadioBox';

interface InformationProps {
  handleNextStep: () => void;
}

const AdditionalInformation: React.FC<InformationProps> = ({ handleNextStep }) => {
  const [sharing, setSharing] = useState<string>('');
  const [game, setGame] = useState<string>('');
  const [call, setCall] = useState<string>('');
  const [study, setStudy] = useState<string>('');
  const [cleanliness, setCleanliness] = useState<string>('');
  const [noise, setNoise] = useState<string>('');
  const [cleaning, setCleaning] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const [mbti, setMBTI] = useState<string>('');

  const isComplete =
    sharing !== '' &&
    game !== '' &&
    call !== '' &&
    study !== '' &&
    cleanliness !== '' &&
    noise !== '' &&
    cleaning !== '' &&
    personality !== '' &&
    mbti !== '';

  const [oxItems, setOXItems] = useState([
    { index: 1, item: 'O', select: false },
    { index: 2, item: 'X', select: false },
  ]);

  const [plusOXItems, setPlusOXItems] = useState([
    { index: 1, item: 'O', select: false },
    { index: 2, item: 'X', select: false },
    { index: 3, item: '때마다 다를 거 같아요', select: false },
  ]);

  const [cleaningItems, setCleaningItems] = useState([
    { index: 1, item: '매일매일 해요!', select: false },
    { index: 2, item: '이틀에 한 번 정도 해요!', select: false },
    { index: 3, item: '일주일에 3-4번은 하는 거 같아요!', select: false },
    { index: 4, item: '2주에 한 번씩 해요!', select: false },
    { index: 5, item: '한 달에 한 번씩 해요!', select: false },
    { index: 6, item: '거의 안 해요!', select: false },
  ]);

  const [personalityItems, setPersonalityItems] = useState([
    { index: 1, item: '조용한걸 좋아해요!', select: false },
    { index: 2, item: '활발해요!', select: false },
    { index: 3, item: '말이 많아요!', select: false },
  ]);

  const [mbtiItems, setMbtiItems] = useState([
    { index: 1, item: 'ISTJ', select: false },
    { index: 2, item: 'ISFJ', select: false },
    { index: 3, item: 'INFJ', select: false },
    { index: 4, item: 'INTJ', select: false },
    { index: 5, item: 'ISTP', select: false },
    { index: 6, item: 'ISFP', select: false },
    { index: 7, item: 'INFP', select: false },
    { index: 8, item: 'INTP', select: false },
    { index: 9, item: 'ESTP', select: false },
    { index: 10, item: 'ESFP', select: false },
    { index: 11, item: 'ENFP', select: false },
    { index: 12, item: 'ENTP', select: false },
    { index: 13, item: 'ESTJ', select: false },
    { index: 14, item: 'ESFJ', select: false },
    { index: 15, item: 'ENFJ', select: false },
    { index: 16, item: 'ENTJ', select: false },
  ]);

  return (
    <ScrollView>
      <View className="flex-1 pl-5 pr-2 pt-8 rounded-t-[30px] bg-white">
        <View className="mb-12">
          <CustomRadioBoxComponent
            title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
            value={sharing}
            setValue={setSharing}
            items={oxItems}
            setItems={setOXItems}
          />
        </View>

        <View className="mb-12">
          <CustomRadioBoxComponent
            title="방 안에서 게임 여부를 선택해주세요"
            value={game}
            setValue={setGame}
            items={oxItems}
            setItems={setOXItems}
          />
        </View>

        <View className="mb-12">
          <CustomRadioBoxComponent
            title="방 안에서 전화 여부를 선택해주세요"
            value={call}
            setValue={setCall}
            items={oxItems}
            setItems={setOXItems}
          />
        </View>

        <View className="mb-12">
          <CustomRadioBoxComponent
            title="방 안에서 공부 여부를 선택해주세요"
            value={study}
            setValue={setStudy}
            items={plusOXItems}
            setItems={setPlusOXItems}
          />
        </View>

        {/* <View className="mb-10">
          <CustomRadioBoxComponent
            title="흡연여부를 선택해주세요"
            value={smoking}
            setValue={setSmoking}
            items={smokingItems}
            setItems={setSmokingItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="잠버릇을 선택해주세요"
            value={sleepHabit}
            setValue={setSleepHabit}
            items={sleepHabitItems}
            setItems={setSleepHabitItems}
          />
        </View> */}

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="평소에 청소를 얼만큼 하시나요?"
            value={cleaning}
            setValue={setCleaning}
            items={cleaningItems}
            setItems={setCleaningItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="당신의 성격을 알려주세요!"
            value={personality}
            setValue={setPersonality}
            items={personalityItems}
            setItems={setPersonalityItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="MBTI를 알려주세요!"
            value={mbti}
            setValue={setMBTI}
            items={mbtiItems}
            setItems={setMbtiItems}
          />
        </View>

        <View
          className={`w-[330px] items-center px-4 py-5  rounded-[39px] ${
            isComplete ? 'bg-main' : 'bg-disabledFont'
          }`}
        >
          <Pressable onPress={handleNextStep}>
            <Text className="text-sm font-semibold text-white">다음</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdditionalInformation;
