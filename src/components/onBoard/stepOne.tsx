import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import TextInputBoxComponent from '@components/textInputBox';
import RadioBoxComponent from '@components/basicRadioBox';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepOne: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const isComplete = name !== '' && nickname !== '' && gender !== '' && age !== '';

  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  useEffect(() => {
    console.log('Name:', name);
    console.log('Nickname:', nickname);
    console.log('Gender:', gender);
    console.log('Age:', age);
    console.log('isComplete:', isComplete);
  }, [name, nickname, gender, age, isComplete]);

  return (
    <View className="flex-1 px-5">
      <View className="mt-[56px] mb-[185px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            원활한 서비스 이용을 위해
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            개인정보를 입력해주세요!
          </Text>
        </View>

        <View>
          <TextInputBoxComponent
            title="이름"
            value={name}
            setValue={setName}
            placeholder="이름을 입력해주세요"
            hasButton={false}
          />
        </View>

        <View>
          <TextInputBoxComponent
            title="닉네임"
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력해주세요"
            hasButton={false}
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
          <TextInputBoxComponent
            title="나이"
            value={age}
            setValue={setAge}
            placeholder="태어난 연도를 입력해주세요"
            hasButton={false}
          />
        </View>
      </View>

      <View className="flex">
        <Pressable onPress={handleNextStep}>
          <View
            className={`text-base font-semibold p-4 rounded-xl ${
              isComplete ? 'bg-main' : 'bg-[#C4C4C4]'
            }`}
          >
            <Text className="text-center text-white">다음</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default StepOne;
