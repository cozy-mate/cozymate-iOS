import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, SafeAreaView } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import SchoolSelectBox from '@components/onBoard/schoolSelectBox';
import GenderSelectBox from '@components/onBoard/genderSelectBox';
import DateSelectModal from '@components/onBoard/dateSelectModal';
import NicknameInputBox from '@components/onBoard/nicknameInputBox';

import { useSignUpStore } from '@zustand/member/member';

import { checkNickname } from '@server/api/member';

import { useGetUniversityList } from '@hooks/api/university';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const { setSignUpState } = useSignUpStore();

  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [universityId, setUniversityId] = useState<number>(0);

  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  const [checkLength, setCheckLength] = useState<boolean>(true);
  const [canUse, setCanUse] = useState<boolean>(true);

  const isComplete =
    checkDuplicate &&
    checkLength &&
    canUse &&
    nickname !== '' &&
    gender !== '' &&
    birthday !== '' &&
    universityId !== 0;

  const checkNicknameLength = async (nickname: string) => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length == 0) {
      return;
    } else if (trimmedNickname.length < 2 || trimmedNickname.length > 8) {
      setCheckLength(false);
      setCanUse(false);
      return;
    }
    setCheckLength(true);
  };

  const checkUserNickname = async (nickname: string) => {
    if (nickname.trim() !== '') {
      try {
        const response = await checkNickname(nickname);
        console.log(response.result);

        setCheckDuplicate(response.result);
        return;
      } catch (error: any) {
        const errorCode = error?.response?.data?.code;

        if (errorCode === 'MEMBER404') {
          setCheckDuplicate(false);
        }
      }
    }
  };

  const { data: universityList } = useGetUniversityList();

  useEffect(() => {
    checkNicknameLength(nickname);
    checkUserNickname(nickname);

    if (checkDuplicate) {
      setCanUse(true);
    }
  }, [nickname]);

  const toNext = async (): Promise<void> => {
    if (!isComplete || !canUse) return;

    setSignUpState({
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      universityId: universityId,
    });

    navigation.navigate('CharacterInputScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex flex-1 flex-col justify-between px-5">
            {/* 상단 View */}
            <View className="mt-14 flex">
              {/* 설명 Text */}
              <View className="mb-6 px-2">
                <Text className="text-xl font-semibold leading-[21px] tracking-tight text-emphasizedFont">
                  원활한 서비스 이용을 위해{'\n'}개인정보를 입력해주세요!
                </Text>
              </View>

              <View className="space-y-4">
                {/* 닉네임 입력 Input */}
                <View>
                  <NicknameInputBox
                    title="닉네임"
                    value={nickname}
                    setValue={setNickname}
                    placeholder="닉네임을 입력해주세요"
                    canUse={checkLength && checkDuplicate && canUse}
                  />
                </View>
                {!checkDuplicate && nickname.trim() !== '' && (
                  <Text className="mb-4 mt-[-8px] px-2 text-xs font-medium text-warning">
                    다른 사람이 사용중인 닉네임이에요!
                  </Text>
                )}
                {!checkLength && nickname.trim() !== '' && (
                  <Text className="mb-4 mt-[-8px] px-2 text-xs font-medium text-warning">
                    닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
                  </Text>
                )}

                {/* 성별 입력 Input */}
                <View>
                  <GenderSelectBox value={gender} setValue={setGender} />
                </View>

                {/* 생년월일 입력 Input */}
                <View>
                  <DateSelectModal
                    selectedDate={birthday}
                    setSelectedDate={setBirthday}
                    title="생년월일"
                  />
                </View>

                {/* 학교 입력 Input */}
                <View>
                  <SchoolSelectBox
                    value={universityId}
                    setValue={setUniversityId}
                    title="학교"
                    items={universityList.result.universityList}
                  />
                </View>
              </View>
            </View>

            {/* 하단 View */}
            <View className="flex">
              <BottomButton
                color={'bg-main1'}
                borderColor={'border-main1'}
                textColor={'text-white'}
                text={'다음'}
                disabled={!isComplete}
                onPressFunc={toNext}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfoInputScreen;
