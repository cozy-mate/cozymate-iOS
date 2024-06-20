import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import TextInputBoxComponent from '@components/createRoom/textInputBox';

import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';
import { ScrollView } from 'react-native-gesture-handler';

interface InformationProps {
  handleNextStep: () => void;
}

const BasicInformation: React.FC<InformationProps> = ({ handleNextStep }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [schoolId, setSchoolId] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [passOrNot, setPassOrNot] = useState<string>('');

  const isComplete =
    name !== '' && age !== '' && schoolId !== '' && major !== '' && type !== '' && passOrNot !== '';

  const [typeItems, setTypeItems] = useState([
    { index: 1, item: '2인 1실', select: false },
    { index: 2, item: '3인 1실', select: false },
    { index: 3, item: '4인 1실', select: false },
    { index: 4, item: '5인 1실', select: false },
  ]);

  const [passOrNotItems, setPassOrNotItems] = useState([
    { index: 1, item: '합격', select: false },
    { index: 2, item: '대기중', select: false },
    { index: 3, item: '예비번호를 받았어요!', select: false },
  ]);

  useEffect(() => {
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('SchoolId:', schoolId);
    console.log('Major:', major);
    console.log('Type:', type);
    console.log('PassOrNot:', passOrNot);
    console.log('isComplete:', isComplete);
  }, [name, age, schoolId, major, type, passOrNot, isComplete]);

  return (
    <ScrollView>
      <View className="flex-1 pl-5 pr-2 pt-8 rounded-t-[30px] bg-white">
        <View className="mb-12">
          <TextInputBoxComponent
            title="이름을 입력해주세요"
            value={name}
            setValue={setName}
            placeholder="ex. 김코지"
            hasButton={false}
          />
        </View>

        <View className="mb-12">
          <TextInputBoxComponent
            title="출생년도를 입력해주세요"
            value={age}
            setValue={setAge}
            placeholder="ex. 2002"
            hasButton={false}
          />
        </View>

        <View className="mb-12">
          <TextInputBoxComponent
            title="학번을 입력해주세요"
            value={schoolId}
            setValue={setSchoolId}
            placeholder="ex. 23"
            hasButton={false}
          />
        </View>

        <View className="mb-12">
          <TextInputBoxComponent
            title="학과를 입력해주세요"
            value={major}
            setValue={setMajor}
            placeholder="ex. 문화콘텐츠문화경영학과"
            hasButton={false}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="신청실을 선택해주세요"
            value={type}
            setValue={setType}
            items={typeItems}
            setItems={setTypeItems}
          />
        </View>

        <View className="mb-10">
          <CustomRadioBoxComponent
            title="합격여부를 선택해주세요"
            value={passOrNot}
            setValue={setPassOrNot}
            items={passOrNotItems}
            setItems={setPassOrNotItems}
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

export default BasicInformation;
