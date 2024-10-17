import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View, Keyboard, Pressable, SafeAreaView } from 'react-native';

import RadioBoxComponent from '@components/basicRadioBox';
import SchoolSelect from '@components/onBoard/schoolSelect';
import DateSelectModal from '@components/onBoard/dateSelectModal';
import BorderTextInputBox from '@components/common/borderTextInputBox';

import { SignUp } from '@recoil/type';
import { signUpState } from '@recoil/recoil';

import { checkNickname } from '@server/api/member';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const [, setSignUp] = useRecoilState(signUpState);

  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [school, setSchool] = useState<number>(0);

  const isComplete = name !== '' && nickname !== '' && gender !== '' && birthday !== '';

  const [items, setItems] = useState([
    { index: 1, value: 'MALE', item: '남자', select: false },
    { index: 2, value: 'FEMALE', item: '여자', select: false },
  ]);

  // const [checkKor, setCheckKor] = useState<boolean>(true);

  // const checkNameKorean = (name: string) => {
  //   const korRex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;

  //   if (name.trim() !== '' && !korRex.test(name)) {
  //     setCheckKor(false);
  //   } else {
  //     setCheckKor(true);
  //   }
  // };

  // useEffect(() => {
  //   checkNameKorean(name);
  // }, [name]);

  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  // const [checkLength, setCheckLength] = useState<boolean>(true);

  const [canUse, setCanUse] = useState<boolean>(true);

  // const checkNicknameLength = async (nickname: string) => {
  //   const trimmedNickname = nickname.trim();
  //   if (trimmedNickname.length < 2 || trimmedNickname.length > 8) {
  //     setCheckLength(false);
  //     setCanUse(false);
  //     return;
  //   }
  //   setCheckLength(true);
  // };

  const checkUserNickname = async (nickname: string) => {
    if (nickname.trim() !== '') {
      const response = await checkNickname(nickname);
      setCheckDuplicate(response.result);
      return;
    }
  };

  useEffect(() => {
    // checkNicknameLength(nickname);
    checkUserNickname(nickname);

    if (checkDuplicate) {
      setCanUse(true);
    }
  }, [nickname, checkDuplicate]);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          {/* 상단 View */}
          <View className="mt-14 flex">
            {/* 설명 Text */}
            <View className="mb-6 px-2">
              <Text className="text-lg font-semibold leading-[21px] tracking-tight text-emphasizedFont">
                원활한 서비스 이용을 위해{'\n'}개인정보를 입력해주세요!
              </Text>
            </View>

            {/* 이름 입력 Input
            <BorderTextInputBox
              title="이름"
              value={name}
              setValue={setName}
              placeholder="이름을 입력해주세요"
              hasButton={false}
              canUse={canUse}
            /> */}
            {/* {!checkKor && (
            <Text className="text-warning text-xs font-medium mt-[-8px] px-2 mb-4">
              이름은 한글로만 입력가능해요!
            </Text>
          )} */}

            {/* 닉네임 입력 Input */}
            <BorderTextInputBox
              title="닉네임"
              value={nickname}
              setValue={setNickname}
              placeholder="닉네임을 입력해주세요"
              hasButton={false}
              canUse={nickname.trim() === '' || (checkDuplicate && canUse)}
            />

            {!checkDuplicate && nickname.trim() !== '' && (
              <Text className="mb-4 mt-[-8px] px-2 text-xs font-medium text-warning">
                다른 사람이 사용중인 닉네임이에요!
              </Text>
            )}
            {/* {!checkLength && nickname.trim() !== '' && (
            <Text className="text-warning text-xs font-medium mt-[-8px] px-2 mb-4">
              닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
            </Text>
          )} */}

            {/* 성별 입력 Input */}
            <RadioBoxComponent
              title="성별"
              value={gender}
              setValue={setGender}
              items={items}
              setItems={setItems}
            />

            {/* 생년월일 입력 Input */}
            <DateSelectModal
              selectedDate={birthday}
              setSelectedDate={setBirthday}
              title="생년월일"
            />

            {/* 학교 입력 Input */}
            <SchoolSelect school={school} setSchool={setSchool} title="학교" />
          </View>

          {/* 하단 View */}
          <View className="flex">
            <Pressable onPress={toNext}>
              <View className={`rounded-xl p-4 ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
                <Text className="text-center text-base font-semibold text-white">다음</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfoInputScreen;
