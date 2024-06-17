import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputBoxComponent from '@components/inputBox';
import YellowCharacter from '@assets/onBoard/yellowCharacter.svg';

const StepOne = () => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');

  return (
    <View className="flex-1">
      <View className="mt-8 mb-7">
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
          <InputBoxComponent
            title="성별"
            value={gender}
            setValue={setGender}
            placeholder="성별을 입력해주세요"
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

      <YellowCharacter />
    </View>
  );
};

export default StepOne;
