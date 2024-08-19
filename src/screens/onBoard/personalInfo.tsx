import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { signUpState } from '@recoil/recoil';
import { SignUp } from '@recoil/type';

import BorderTextInputBox from '@components/common/borderTextInputBox';
import RadioBoxComponent from '@components/basicRadioBox';
import DateSelectModal from '@components/onBoard/dateSelectModal';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';
import { checkNickname } from '@server/api/member';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const [signUp, setSignUp] = useRecoilState(signUpState);

  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const isComplete = name !== '' && nickname !== '' && gender !== '' && birthday !== '';

  const [items, setItems] = useState([
    { index: 1, value: 'MALE', item: '남자', select: false },
    { index: 2, value: 'FEMALE', item: '여자', select: false },
  ]);

  const [checkKor, setCheckKor] = useState<boolean>(true);

  const checkNameKorean = (name: string) => {
    const korRex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;

    if (name.trim() !== '' && !korRex.test(name)) {
      setCheckKor(false);
    } else {
      setCheckKor(true);
    }
  };

  useEffect(() => {
    checkNameKorean(name);
  }, [name]);

  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  const [checkLength, setCheckLength] = useState<boolean>(true);

  const [canUse, setCanUse] = useState<boolean>(true);

  const checkNicknameLength = async (nickname: string) => {
    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length < 2 || trimmedNickname.length > 8) {
      setCheckLength(false);
      setCanUse(false);
      return;
    }
    setCheckLength(true);
  };

  const checkUserNickname = async (nickname: string) => {
    if (nickname.trim() !== '') {
      const response = await checkNickname(nickname);
      setCheckDuplicate(response.result);
      return;
    }
  };

  useEffect(() => {
    checkNicknameLength(nickname);
    checkUserNickname(nickname);

    if (checkDuplicate && checkLength) {
      setCanUse(true);
    }
  }, [nickname]);

  const toNext = async (): Promise<void> => {
    if (!isComplete || !canUse) return;

    setSignUp((prevState: SignUp) => ({
      ...prevState,
      name: name,
      nickname: nickname,
      gender: gender,
      birthday: birthday,
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
            canUse={checkKor}
          />
          {!checkKor && (
            <Text className="text-warning text-xs font-medium mt-[-8px] px-2 mb-4">
              이름은 한글로만 입력가능해요!
            </Text>
          )}

          {/* 닉네임 입력 Input */}
          <BorderTextInputBox
            title="닉네임"
            value={nickname}
            setValue={setNickname}
            placeholder="닉네임을 입력해주세요"
            hasButton={false}
            canUse={nickname.trim() === '' || (checkDuplicate && checkLength)}
          />

          {!checkDuplicate && nickname.trim() !== '' && (
            <Text className="text-warning text-xs font-medium mt-[-8px] px-2 mb-4">
              다른 사람이 사용중인 닉네임이에요!
            </Text>
          )}
          {!checkLength && nickname.trim() !== '' && (
            <Text className="text-warning text-xs font-medium mt-[-8px] px-2 mb-4">
              닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
            </Text>
          )}

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
