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

  const [checkValid, setCheckValid] = useState<boolean>(true);
  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  const [checkLength, setCheckLength] = useState<boolean>(true);
  const [canUse, setCanUse] = useState<boolean>(true);

  const checkValidation = (nickname: string) => {
    const validNickNameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (!validNickNameRegex.test(nickname)) {
      setCheckValid(false);
      setCanUse(false);
      return; // 중복 메시지 방지를 위해 return 추가
    }

    // 유효할 경우 상태를 초기화
    setCheckValid(true);
    setCanUse(true);
  };

  const checkNicknameLength = (nickname: string) => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length === 0) {
      setCheckLength(true); // 공백 입력 시에도 초기화
      return;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 8) {
      setCheckLength(false);
      setCanUse(false);
      return;
    }

    // 길이가 적절하면 오류 상태 해제
    setCheckLength(true);
  };

  const checkUserNickname = async (nickname: string) => {
    if (nickname.trim() !== profile.nickname) {
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
    }
  };

  useEffect(() => {
    if (nickname !== profile.nickname) {
      if (nickname.trim() !== '') {
        checkUserNickname(nickname);
        checkValidation(nickname);
        checkNicknameLength(nickname);

        setCanUse(checkValid && checkLength && checkDuplicate);
      }
    }
  }, [nickname]);

  const { data: userSchoolInfo } = useGetUniversityInfo(profile.universityId);

  const { mutateAsync: changeNickname } = useUpdateNickname();
  const { mutateAsync: changeMajorName } = useUpdatMajorName();
  const { mutateAsync: changeBirthday } = useUpdateBirthday();

  const handleChangeProfile = async (): Promise<void> => {
    try {
      if (type === 'nickname') {
        if (nickname !== profile.nickname) {
          changeNickname(nickname);
          setProfile({
            nickname: nickname,
          });
        }
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
                  (!checkDuplicate || !checkLength || !checkValid) &&
                  nickname.trim() !== '' &&
                  nickname !== profile.nickname
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
                      (!checkDuplicate || !checkLength || !checkValid) &&
                      nickname.trim() !== '' &&
                      nickname !== profile.nickname
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

                  {(!checkLength || !checkValid) &&
                    nickname.trim() !== '' &&
                    nickname !== profile.nickname && (
                      <Text className="mt-2 px-2 text-xs font-medium text-warning">
                        닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
                      </Text>
                    )}

                  {!checkDuplicate &&
                    checkLength &&
                    nickname !== profile.nickname &&
                    nickname.trim() !== '' && (
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
              disabled={
                (type === 'nickname' && !checkLength) || !checkDuplicate || !checkValid || !canUse
              }
              className={`flex rounded-lg  p-4 drop-shadow-buttonBack ${
                (type === 'nickname' && !checkLength) || !checkDuplicate || !checkValid || !canUse
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
