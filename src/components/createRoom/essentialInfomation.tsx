import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import TextInputBoxComponent from '@components/textInputBox';
import RadioBoxComponent from '@components/radioBox';
import CustomRadioBoxComponent from './customRadioBox';

interface InformationProps {
  handleNextStep: () => void;
}

const EssentialInformation: React.FC<InformationProps> = ({ handleNextStep }) => {
  const [wakeUp, setWakeUp] = useState<string>('');
  const [sleep, setSleep] = useState<string>('');
  const [lightsOut, setLightsOut] = useState<string>('');
  const [smoking, setSmoking] = useState<string>('');
  const [sleepHabit, setSleepHabit] = useState<string>('');
  const [temperament, setTemperament] = useState<string>('');
  const [pattern, setPattern] = useState<string>('');
  const [intimacy, setIntimacy] = useState<string>('');

  const isComplete =
    wakeUp !== '' &&
    sleep !== '' &&
    lightsOut !== '' &&
    smoking !== '' &&
    sleepHabit !== '' &&
    temperament !== '' &&
    pattern !== '' &&
    intimacy !== '';

  const [smokingItems, setSmokingItems] = useState([
    { index: 1, item: 'O', select: false },
    { index: 2, item: 'X', select: false },
    { index: 3, item: '끊는 중이에요', select: false },
  ]);

  const [sleepHabitItems, setSleepHabitItems] = useState([
    { index: 1, item: 'X', select: false },
    { index: 2, item: '코골이', select: false },
    { index: 3, item: '이갈이', select: false },
    { index: 4, item: '몽유병', select: false },
  ]);

  const [temperamentItems, setTemperamentItems] = useState([
    { index: 1, item: '더위를 많이 타요', select: false },
    { index: 2, item: '추위를 많이 타요', select: false },
  ]);

  const [patternItems, setPatternItems] = useState([
    { index: 1, item: '아침형 인간', select: false },
    { index: 2, item: '새벽형 인간', select: false },
  ]);

  const [intimacyItems, setIntimacyItems] = useState([
    { index: 1, item: '필요한 말만 했으면 좋겠어요', select: false },
    { index: 2, item: '어느정도 친하게 지내요', select: false },
    { index: 3, item: '완전 친하게 지내고 싶어요', select: false },
  ]);

  return (
    <ScrollView>
      <View className="flex-1 pl-5 pr-2 pt-8 rounded-t-[30px] bg-white">
        {/* <View className="mb-12">
            <CustomRadioBoxComponent
              title="기상시간을 선택해주세요"
              value={wakeUp}
              setValue={setWakeUp}
              items={typeItems}
              setItems={setTypeItems}
            />
          </View>

          <View className="mb-12">
            <CustomRadioBoxComponent
              title="취침시간을 선택해주세요"
              value={sleep}
              setValue={setSleep}
              items={passOrNotItems}
              setItems={setPassOrNotItems}
            />
          </View>

          <View className="mb-12">
            <CustomRadioBoxComponent
              title="소등시간을 선택해주세요"
              value={lightsOut}
              setValue={setLightsOut}
              items={passOrNotItems}
              setItems={setPassOrNotItems}
            />
          </View> */}

        <View className="mb-10">
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
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="체질을 선택해주세요"
            value={temperament}
            setValue={setTemperament}
            items={temperamentItems}
            setItems={setTemperamentItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="생활패턴을 선택해주세요"
            value={pattern}
            setValue={setPattern}
            items={patternItems}
            setItems={setPatternItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="친밀도를 선택해주세요"
            value={intimacy}
            setValue={setIntimacy}
            items={intimacyItems}
            setItems={setIntimacyItems}
          />
        </View>

        <View
          className={`w-[330px] items-center px-4 py-5  rounded-[39px] ${
            isComplete ? 'bg-main' : 'bg-[#ACADB4]'
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

export default EssentialInformation;
