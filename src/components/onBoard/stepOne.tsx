import React, { useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import InputBoxComponent from '@components/inputBox';
import YellowCharacter from '@assets/onBoard/yellowCharacter.svg';
import RadioBoxComponent from '@components/radioBox';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepOne: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  return (
    <View className="flex-1">
      <View className="mt-[67px] mb-[13px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            원활한 서비스 이용을 위해
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            개인정보를 입력해주세요!
          </Text>
        </View>

        <View>
          <InputBoxComponent
            title="이름"
            value={name}
            setValue={setName}
            placeholder="이름을 입력해주세요"
          />
        </View>

        <View>
          <InputBoxComponent
            title="닉네임"
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력해주세요"
          />
        </View>

        <View>
          <RadioBoxComponent
            title="성별"
            value={gender}
            setValue={setGender}
            items={items}
            setItems={setItems}
          />
        </View>

        <View>
          <InputBoxComponent
            title="나이"
            value={age}
            setValue={setAge}
            placeholder="태어난 연도를 입력해주세요"
          />
        </View>
      </View>

      <Pressable onPress={handleNextStep}>
        <Text>클릭</Text>
      </Pressable>
      <YellowCharacter />
    </View>
  );
};

export default StepOne;
