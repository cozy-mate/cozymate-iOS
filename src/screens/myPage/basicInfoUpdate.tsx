import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Keyboard, Pressable, TextInput, ScrollView, SafeAreaView } from 'react-native';

import UnivInfoSelect from '@components/onBoard/univInfoSelect';
import DateSelectModal from '@components/onBoard/dateSelectModal';

import { useProfileStore } from '@zustand/member/member';

import { checkNickname } from '@server/api/member';

import { useGetUniversityInfo } from '@hooks/api/university';
import { useUpdateBirthday, useUpdateNickname, useUpdatMajorName } from '@hooks/api/member';

import { showRejectToast } from '@utils/toast';

import { BasicInfoUpdateScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const BasicInfoUpdateScreen = ({ navigation, route }: BasicInfoUpdateScreenProps) => {
  const { type } = route.params;
  const { profile, setProfile } = useProfileStore();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [majorName, setMajorName] = useState<string>(profile.majorName);
  const [birthday, setBirthday] = useState<string>(profile.birthday);

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
    if (nickname.trim() !== '') {
      try {
        const response = await checkNickname(nickname);

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

  useEffect(() => {
    checkNicknameLength(nickname);
    checkUserNickname(nickname);

    if (checkDuplicate) {
      setCanUse(true);
    }
  }, [nickname]);

  const { data: userSchoolInfo } = useGetUniversityInfo(profile.universityId);

  const { mutateAsync: changeNickname } = useUpdateNickname();
  const { mutateAsync: changeMajorName } = useUpdatMajorName();
  const { mutateAsync: changeBirthday } = useUpdateBirthday();

  const handleChangeProfile = async (): Promise<void> => {
    try {
      if (type === 'nickname') {
        changeNickname(nickname);
        setProfile({
          nickname: nickname,
        });
      } else if (type === 'majorName') {
        changeMajorName(majorName);
        setProfile({
          majorName: majorName,
        });
      } else if (type === 'birthday') {
        changeBirthday(birthday);
        setProfile({
          birthday: birthday,
        });
      }
      toMyInfo();
    } catch (error: any) {
      showRejectToast(error.response.data);
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
                <View>
                  <Pressable
                    onPress={handleFocus}
                    className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5
                ${
                  (!checkDuplicate || !checkLength) && nickname.trim() !== ''
                    ? 'border-warning'
                    : isFocused
                    ? 'border-sub1'
                    : 'border-disabled'
                }`}
                  >
                    <View className="flex flex-col justify-center space-y-1.5">
                      <Text
                        className={`text-xs font-semibold leading-4 tracking-tight
                    ${
                      (!checkDuplicate || !checkLength) && nickname.trim() !== ''
                        ? 'text-warning'
                        : isFocused || nickname
                        ? 'text-main1'
                        : 'text-colorFont'
                    }`}
                      >
                        닉네임
                      </Text>
                      <TextInput
                        ref={inputRef}
                        value={nickname}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={(text: string) => setNickname(text)}
                        placeholder="닉네임을 입력해주세요"
                        placeholderTextColor="#ACADB4"
                        className="text-sm font-medium leading-4 tracking-tight text-basicFont"
                      />
                    </View>
                  </Pressable>

                  {!checkLength && nickname.trim() !== '' && (
                    <Text className="mt-2 px-2 text-xs font-medium text-warning">
                      닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
                    </Text>
                  )}

                  {!checkDuplicate && checkLength && nickname.trim() !== '' && (
                    <Text className="mt-2 px-2 text-xs font-medium text-warning">
                      다른 사람이 사용중인 닉네임이에요!
                    </Text>
                  )}
                </View>
              )}

              {type === 'majorName' && (
                <UnivInfoSelect
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
              disabled={type === 'nickname' && !checkLength && !checkDuplicate && !canUse}
              className={`flex rounded-lg  p-4 drop-shadow-buttonBack ${
                type === 'nickname' && !checkLength && !checkDuplicate && !canUse
                  ? 'bg-disabledFont'
                  : 'bg-main1'
              }`}
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
