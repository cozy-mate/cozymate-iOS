import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import BottomButton from '@components/common/bottomButton';
import OneButtonModal from '@components/commonComponents/oneButtonModal';
import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';

import {
  useRoomInfoStore,
  useCreatePublicRoomStore,
  useCreatePrivateRoomStore,
} from '@zustand/room/room';

import { useCreatePublicRoom, useCreatePrivateRoom } from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';

import { CreateRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import XButton from '@assets/createRoom/smallXButton.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';

const CreateRoomScreen = ({ navigation, route }: CreateRoomScreenProps) => {
  const { type } = route.params;

  const { createPublicRoomInfo, clearCreatePublicRoom } = useCreatePublicRoomStore();
  const { createPrivateRoomInfo, clearCreatePrivateRoom } = useCreatePrivateRoomStore();
  const { setRoomInfo } = useRoomInfoStore();

  const [name, setName] = useState<string>('');

  const [isLongName, setIsLongName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [maxMateNum, setMaxMateNum] = useState<number>(0);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (type === 'PUBLIC') {
      const isPublicComplete =
        name !== '' &&
        !isLongName &&
        errorMessage === '' &&
        hashtagList.length >= 1 &&
        hashtagList.length <= 3 &&
        createPublicRoomInfo.persona !== 0;
      setIsComplete(isPublicComplete);
    } else if (type === 'PRIVATE') {
      const isPrivateComplete = name !== '' && !isLongName && createPrivateRoomInfo.persona !== 0;
      setIsComplete(isPrivateComplete);
    }
  }, [
    name,
    isLongName,
    errorMessage,
    hashtagList,
    createPublicRoomInfo,
    createPrivateRoomInfo,
    type,
  ]);

  const [items, setItems] = useState([
    { index: 1, value: 2, name: '2명', select: false },
    { index: 2, value: 3, name: '3명', select: false },
    { index: 3, value: 4, name: '4명', select: false },
    { index: 4, value: 5, name: '5명', select: false },
    { index: 5, value: 6, name: '6명', select: false },
  ]);

  const validRegex = /^(?! )[가-힣a-zA-Z0-9 ]+(?<! )$/;

  useEffect(() => {
    if (name.trim() !== '') {
      if (name.length > 12) {
        setIsLongName(true);
        setErrorMessage('방이름은 최대 12글자만 가능합니다.');
      } else if (!validRegex.test(name)) {
        setIsLongName(false);
        setErrorMessage(
          '한글, 영어, 숫자 및 공백만 입력 가능합니다. 공백은 처음이나 끝에 올 수 없습니다.',
        );
      } else {
        setIsLongName(false);
        setErrorMessage(''); // 에러 메시지 초기화
      }
    }
  }, [name]);

  const handleChangeText = (text: string) => {
    setName(text); // 입력값 업데이트
  };

  const handleHashTag = (text: string) => {
    setHashTag(text);
  };

  const handleHashTagSubmit = () => {
    if (hashTag.trim() !== '' && hashtagList.length < 3) {
      if (validRegex.test(hashTag.trim())) {
        setHashtagList([...hashtagList, hashTag.trim()]);
        setHashTag('');
      } else {
        setHashTag('');
        setIsHashtagModalOpen(true);
      }
    } else if (hashtagList.length >= 3) {
      setIsHashtagModalOpen(true);
    }
  };

  const removeHashTag = (index: number) => {
    setHashtagList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const toMain = () => {
    navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
    clearCreatePublicRoom();
    clearCreatePrivateRoom();
  };

  const toSelectCharacter = () => {
    navigation.navigate('SelectCharacterScreen', { type: type });
  };

  const { mutateAsync: mutateCreatePublicRoom } = useCreatePublicRoom();
  const { mutateAsync: mutateCreatPrivateRoom } = useCreatePrivateRoom();

  const toNextforPublic = async () => {
    try {
      const response = await mutateCreatePublicRoom({
        name: name,
        persona: createPublicRoomInfo.persona,
        maxMateNum: maxMateNum,
        hashtagList: hashtagList,
      });

      setRoomInfo(response.result);

      clearCreatePublicRoom();

      navigation.navigate('CompleteCreateRoomScreen', { type: 'PUBLIC' });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const toNextforPrivate = async () => {
    try {
      const response = await mutateCreatPrivateRoom({
        name: name,
        persona: createPrivateRoomInfo.persona,
        maxMateNum: maxMateNum,
      });

      setRoomInfo(response.result);

      clearCreatePrivateRoom();

      navigation.navigate('CompleteCreateRoomScreen', { type: 'PRIVATE' });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-1 flex-col justify-between bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          <KeyboardAwareScrollView>
            {/* 상단 이전 버튼 */}
            <View className="mb-[33px] mt-2 flex flex-row items-center">
              <Pressable onPress={toMain}>
                <BackButton />
              </Pressable>
            </View>

            {/* 캐릭터 선택 */}
            <View className="relative mb-10 flex items-center justify-center">
              <View className="relative">
                {type === 'PUBLIC' && createPublicRoomInfo?.persona ? (
                  getProfileImage(createPublicRoomInfo.persona, 130, 130)
                ) : type === 'PRIVATE' && createPrivateRoomInfo?.persona ? (
                  getProfileImage(createPrivateRoomInfo.persona, 130, 130)
                ) : (
                  <CharacterBox />
                )}
                <View className="absolute bottom-0 right-0">
                  <Pressable onPress={toSelectCharacter}>
                    <SelectIcon />
                  </Pressable>
                </View>
              </View>
            </View>

            <View>
              {/* 방이름 입력 */}
              <View>
                <Text className="mb-2 px-1 text-base font-semibold text-basicFont">
                  방이름을 입력해주세요
                </Text>
                <TextInput
                  className="rounded-xl bg-colorBox p-4 text-sm font-medium leading-4 text-basicFont"
                  value={name}
                  onChangeText={handleChangeText}
                  placeholder="방이름을 입력해주세요"
                />
                {errorMessage !== '' && (
                  <Text className="mt-2 pl-2 text-xs font-medium text-warning">{errorMessage}</Text>
                )}
              </View>

              {/* 방 인원 선택 */}
              <View className="my-10">
                <Text className="mb-2 px-1 text-base font-semibold text-basicFont">
                  인원을 선택해주세요 (본인 포함)
                </Text>
                <CustomRadioBoxComponent
                  value={maxMateNum}
                  setValue={setMaxMateNum}
                  items={items}
                  setItems={setItems}
                />
              </View>

              {/* 방 해시태그 입력 */}
              {type === 'PUBLIC' && (
                <View>
                  <Text className="mb-2 px-1 text-base font-semibold text-basicFont">
                    방을 나타낼 해시태그를 입력해주세요 (최대 3개)
                  </Text>
                  <TextInput
                    className="mb-2 rounded-xl bg-colorBox p-4 text-sm font-medium leading-4 text-basicFont"
                    value={hashTag}
                    onChangeText={handleHashTag}
                    onSubmitEditing={handleHashTagSubmit}
                    placeholder="해시태그를 입력해주세요"
                  />
                  <View className="flex flex-row flex-wrap">
                    {hashtagList.length > 0 &&
                      hashtagList.map((hash, index) => (
                        <View
                          key={index}
                          className="mb-2 mr-2 flex flex-row items-center rounded-full border border-main1 bg-sub2 py-1 pl-3.5 pr-1.5"
                        >
                          <Text className="text-xs font-semibold text-main1">#{hash}</Text>
                          <Pressable onPress={() => removeHashTag(index)}>
                            <XButton />
                          </Pressable>
                        </View>
                      ))}
                  </View>
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>

          <View className="flex">
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="방 생성하기"
              disabled={!isComplete}
              onPressFunc={type === 'PUBLIC' ? toNextforPublic : toNextforPrivate}
            />
          </View>

          <OneButtonModal
            isVisible={isHashtagModalOpen}
            title={
              hashtagList.length >= 3
                ? `해시태그는 최대 3개까지만\n입력할 수 있어요!`
                : `해시태그는 한글, 영문, 숫자만\n사용할 수 있어요.`
            }
            closeFunc={() => setIsHashtagModalOpen(false)}
            buttonText="확인"
            buttonFunc={() => setIsHashtagModalOpen(false)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateRoomScreen;
