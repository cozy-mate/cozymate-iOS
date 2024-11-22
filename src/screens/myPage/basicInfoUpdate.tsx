import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import MajorSelect from '@components/myPage/majorSelect';
import DateSelectModal from '@components/onBoard/dateSelectModal';
import BorderTextInputBox from '@components/common/borderTextInputBox';

import { useProfileStore } from '@zustand/member/member';

import { checkNickname } from '@server/api/member';

import { useGetUniversityInfo } from '@hooks/api/university';
import { useUpdateBirthday, useUpdateNickname, useUpdatMajorName } from '@hooks/api/member';

import { BasicInfoUpdateScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const BasicInfoUpdateScreen = ({ navigation, route }: BasicInfoUpdateScreenProps) => {
  const { type } = route.params;
  const { profile, setProfile } = useProfileStore();

  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [majorName, setMajorName] = useState<string>(profile.majorName);
  const [birthday, setBirthday] = useState<string>(profile.birthday);

  // const handleDate = (date: string) => {
  //   const [year, month, day] = date.split('-');
  //   return `${year}년 ${month}월 ${day}일`;
  // };

  const toMyInfo = () => {
    navigation.goBack();
  };

  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  const [checkLength, setCheckLength] = useState<boolean>(true);
  const [canUse, setCanUse] = useState<boolean>(true);

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
    if (nickname === profile.nickname) {
      setCheckDuplicate(true);
      return;
    }

    if (nickname.trim() !== '') {
      const response = await checkNickname(nickname);
      setCheckDuplicate(response.result);
      return;
    }
  };

  useEffect(() => {
    checkNicknameLength(nickname);
    checkUserNickname(nickname);

    if (checkDuplicate) {
      setCanUse(true);
    }
  }, [nickname, checkDuplicate]);

  const { data: userSchoolInfo } = useGetUniversityInfo(profile.universityId);

  const { mutateAsync: changeNickname } = useUpdateNickname();
  const { mutateAsync: changeMajorName } = useUpdatMajorName();
  const { mutateAsync: changeBirthday } = useUpdateBirthday();

  const handleChangeProfile = async (): Promise<void> => {
    if (type === 'nickname') {
      changeNickname(nickname);
      setProfile({
        nickname: nickname,
      });
      toMyInfo();
    } else if (type === 'majorName') {
      changeMajorName(majorName);
      setProfile({
        majorName: majorName,
      });
      toMyInfo();
    } else if (type === 'birthday') {
      changeBirthday(birthday);
      setProfile({
        birthday: birthday,
      });
      toMyInfo();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false} contentContainerStyle={{ flex: 1 }}>
        <View className="flex flex-1 flex-col">
          <View className="my-2 flex flex-1 flex-col justify-between px-5">
            <View className="flex">
              <Pressable onPress={toMyInfo} className="mb-5">
                <BackButton />
              </Pressable>

              {type === 'nickname' && (
                <>
                  <BorderTextInputBox
                    title="닉네임"
                    value={nickname}
                    setValue={setNickname}
                    placeholder="닉네임을 입력해주세요"
                    hasButton={false}
                    canUse={checkLength && checkDuplicate && canUse}
                  />

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
                </>
              )}

              {type === 'majorName' && (
                <MajorSelect
                  value={majorName}
                  setValue={setMajorName}
                  items={userSchoolInfo.result.departments}
                  title="학과"
                />
              )}

              {type === 'birthday' && (
                <DateSelectModal
                  selectedDate={birthday}
                  setSelectedDate={setBirthday}
                  title="생년월일"
                />
              )}
            </View>

            <Pressable
              onPress={handleChangeProfile}
              className="flex rounded-lg bg-main1 p-4 drop-shadow-buttonBack"
            >
              <Text className="text-center text-base font-semibold leading-5 text-white">확인</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInfoUpdateScreen;
