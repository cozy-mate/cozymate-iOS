import React, { Fragment, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

import SelectCharacterModal from 'src/screens/editRoom/selectCharacterModal';

import ChipSelectModal from '@components/common/chipSelectModal';

import { useProfileStore } from '@zustand/member/member';
import { usePreferencesStore } from '@zustand/member-stat/member-stat';

import { useUpdatePersona } from '@hooks/api/member';

import { getProfileImage } from '@utils/profileImage';
import { getMyImportantLifeStyle } from '@utils/getLifeStyleIcon';

import { MyInfoScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import RightArrow from '@assets/myPage/rightArrow.svg';

const MyInfoScreen = ({ navigation }: MyInfoScreenProps) => {
  const { profile, setProfile } = useProfileStore();
  const { preferenceList } = usePreferencesStore();

  const [persona, setPersona] = useState<number>(profile.persona);
  const [isCharacterSelectOpen, setIsCharacterSelectOpen] = useState<boolean>(false);
  const [isChipModalOpen, setIsChipModalOpen] = useState<boolean>(false);

  const openChipModal = () => {
    setIsChipModalOpen(true);
  };

  const closeChipModal = () => {
    setIsChipModalOpen(false);
  };

  const toMyPage = () => {
    navigation.goBack();
  };

  const toUpdate = (type: 'nickname' | 'birthday' | 'majorName') => {
    navigation.navigate('BasicInfoUpdateScreen', { type: type });
  };

  const translateBirthDay = (birth: string) => {
    const [year, month, day] = birth.split('-');
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  const { mutateAsync: changePersona } = useUpdatePersona();

  const handleUpdate = async (persona: number): Promise<void> => {
    changePersona(persona);
    setProfile({
      persona: persona,
    });
  };

  return (
    <Fragment>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView bounces={false}>
          <View className="flex flex-col">
            <View className="my-2 flex flex-row justify-between px-5">
              <Pressable onPress={toMyPage}>
                <BackButton />
              </Pressable>
            </View>

            <View className="relative flex items-center">
              <View className="relative h-[120px] w-[120px] overflow-hidden rounded-[60px]">
                <View>{getProfileImage(persona, 120, 120)}</View>
                <Pressable
                  onPress={() => setIsCharacterSelectOpen(true)}
                  className="absolute bottom-0 flex h-[32px] w-[120px] items-center justify-center overflow-hidden rounded-b-[32px] bg-updateButtonBack"
                >
                  <Text className="text-center text-xs font-semibold text-white">수정</Text>
                </Pressable>
              </View>
            </View>

            <View className="mt-8 px-5">
              <View className="mb-4 flex w-full flex-col rounded-xl border border-disabled p-4 py-1">
                <Pressable
                  onPress={() => toUpdate('nickname')}
                  className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
                >
                  <View className="flex flex-row">
                    <Text className="text-sm font-medium text-disabledFont">닉네임</Text>
                    <Text className="ml-2 text-sm font-medium text-emphasizedFont">
                      {profile.nickname}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <RightArrow />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => toUpdate('majorName')}
                  className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
                >
                  <View className="flex flex-row">
                    <Text className="text-sm font-medium text-disabledFont">학과</Text>
                    <Text className="ml-2 text-sm font-medium text-emphasizedFont">
                      {profile.majorName}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <RightArrow />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => toUpdate('birthday')}
                  className="flex flex-row justify-between py-3"
                >
                  <View className="flex flex-row">
                    <Text className="text-sm font-medium text-disabledFont">생년월일</Text>
                    <Text className="ml-2 text-sm font-medium text-emphasizedFont">
                      {translateBirthDay(profile.birthday)}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <RightArrow />
                  </View>
                </Pressable>
              </View>

              <View className="mb-4 flex w-full flex-col   rounded-xl border border-disabled px-4 py-5">
                <View className="mb-3 flex flex-row justify-between">
                  {preferenceList.map((chip, index) => (
                    <View key={index} className="flex w-[60px] flex-col items-center">
                      {getMyImportantLifeStyle(chip)}
                    </View>
                  ))}
                </View>
                <Pressable onPress={openChipModal} className="flex items-center">
                  <Text className="text-xs font-medium text-disabledFont underline">수정하기</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {isCharacterSelectOpen && (
        <SelectCharacterModal
          persona={persona}
          setPersona={setPersona}
          closeModal={() => setIsCharacterSelectOpen(false)}
          pressFunc={handleUpdate}
        />
      )}
      {isChipModalOpen && <ChipSelectModal closeModal={closeChipModal} />}
    </Fragment>
  );
};

export default MyInfoScreen;
