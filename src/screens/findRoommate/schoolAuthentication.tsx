import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import BorderTextInputBox from '@components/common/borderTextInputBox';
import SearchModal from '@components/findRoommate/searchModal';
import { SchoolAuthenticationScreenProps } from '@type/param/loginStack';

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
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <View className="px-5 mt-12">
        <Text className="px-2 mb-6 text-xl font-semibold leading-6 text-emphasizedFont font-['Pretendard']">
          룸메이트를 구하려면{'\n'}
          <Text className="text-main1">학교 인증</Text>이 필요해요!
        </Text>

        <Pressable onPress={handleSearch}>
          <View
            className={`flex flex-col border-[1px] px-5 py-4 mb-4 rounded-xl ${
              school ? 'border-sub1' : 'border-disabled'
            }`}
          >
            <Text className="font-semibold text-xs leading-[17px] tracking-[-0.03em] text-colorFont">
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
