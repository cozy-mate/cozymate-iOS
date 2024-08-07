import BorderTextInputBox from '@components/common/borderTextInputBox';
import RadioBoxComponent from '@components/basicRadioBox';

import { signUpState } from '@recoil/recoil';
import { SignUp } from '@recoil/type';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import DateSelectModal from '@components/onBoard/dateSelectModal';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const [signUp, setSignUp] = useRecoilState(signUpState);

  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const isComplete = name !== '' && nickname !== '' && gender !== '' && birthday !== '';

  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  const toNext = async (): Promise<void> => {
    setSignUp((prevState: SignUp) => ({
      ...prevState,
      name: name,
      nickname: nickname,
      gender: gender,
      birth: birthday,
    }));

    navigation.navigate('CharacterInputScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        {/* 상단 View */}
        <View className="flex mt-14">
          {/* 설명 Text */}
          <View className="px-2 mb-6">
            <Text className="text-lg font-semibold text-emphasizedFont leading-[21px] tracking-[-0.02em]">
              원활한 서비스 이용을 위해{'\n'}개인정보를 입력해주세요!
            </Text>
          </View>

          {/* 이름 입력 Input */}
          <BorderTextInputBox
            title="이름"
            value={name}
            setValue={setName}
            placeholder="이름을 입력해주세요"
            hasButton={false}
          />

          {/* 닉네임 입력 Input */}
          <BorderTextInputBox
            title="닉네임"
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력해주세요"
            hasButton={false}
          />

          {/* 성별 입력 Input */}
          <RadioBoxComponent
            title="성별"
            value={gender}
            setValue={setGender}
            items={items}
            setItems={setItems}
          />

          {/* 생년월일 입력 Input */}
          <DateSelectModal selectedDate={birthday} setSelectedDate={setBirthday} title="생년월일" />
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={toNext}>
            <View className={`p-4 rounded-xl ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
              <Text className="text-base font-semibold text-center text-white">다음</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoInputScreen;
