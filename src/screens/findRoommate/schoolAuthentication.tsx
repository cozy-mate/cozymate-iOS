import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, SafeAreaView } from 'react-native';

import SearchModal from '@components/findRoommate/searchModal';
import BorderTextInputBox from '@components/common/borderTextInputBox';

import { SchoolAuthenticationScreenProps } from '@type/param/stack';

const SchoolAuthenticationScreen = ({ navigation }: SchoolAuthenticationScreenProps) => {
  const [school, setSchool] = useState<string>('');
  const [schoolEmail, setSchoolEmail] = useState<string>('');
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSended, setIsSended] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSend = () => {
    setIsSended(true);
  };

  const toNext = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-white">
      <View className="mt-12 px-5">
        <Text className="mb-6 px-2 font-['Pretendard'] text-xl font-semibold leading-6 text-emphasizedFont">
          룸메이트를 구하려면{'\n'}
          <Text className="text-main1">학교 인증</Text>이 필요해요!
        </Text>

        <Pressable onPress={handleSearch}>
          <View
            className={`mb-4 flex flex-col rounded-xl border px-5 py-4 ${
              school ? 'border-sub1' : 'border-disabled'
            }`}
          >
            <Text className="text-xs font-semibold leading-[17px] tracking-tight text-colorFont">
              학교
            </Text>
            <Text className={`${school ? 'text-basicFont' : 'text-disabledFont'} mt-1.5`}>
              {school ? school : '이름을 입력해주세요'}
            </Text>
          </View>
        </Pressable>

        <BorderTextInputBox
          title="학교 이메일"
          value={schoolEmail}
          setValue={setSchoolEmail}
          placeholder="이메일을 입력해주세요"
          hasButton={true}
          buttonString="인증번호 전송"
          pressFunc={handleSend}
        />

        {isSended && (
          <BorderTextInputBox
            title="인증번호 확인"
            value={authenticationCode}
            setValue={setAuthenticationCode}
            placeholder="인증번호 확인"
            hasButton={true}
            buttonString="인증번호 확인"
            pressFunc={toNext}
          />
        )}
      </View>

      {isSearchOpen && (
        <SearchModal value={school} setValue={setSchool} handleOpen={handleSearch} />
      )}
    </SafeAreaView>
  );
};

export default SchoolAuthenticationScreen;
