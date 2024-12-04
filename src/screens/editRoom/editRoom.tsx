import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import SelectCharacterModal from './selectCharacterModal';

import OneButtonModal from '@components/commonComponents/oneButtonModal';

import { useRoomInfoStore } from '@zustand/room/room';

import { updateRoom } from '@server/api/room';

import { useGetRoomData } from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';

import { EditRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import XButton from '@assets/createRoom/smallXButton.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';

const EditRoomScreen = ({ navigation, route }: EditRoomScreenProps) => {
  const { id, type } = route.params;

  const { roomInfo, setRoomInfo } = useRoomInfoStore();

  const { refetch: roomInfoRefetch } = useGetRoomData(id);

  const [name, setName] = useState<string>(roomInfo.name);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashtagList, setHashtagList] = useState<string[]>(roomInfo.hashtagList);

  const [isLongName, setIsLongName] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [persona, setPersona] = useState<number>(roomInfo.persona);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState<boolean>(false);

  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState<boolean>(false);

  const handleCharacterModal = () => {
    setIsCharacterModalOpen(!isCharacterModalOpen);
  };

  useEffect(() => {
    if (name !== '' && !isLongName) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [hashtagList, isLongName, name]);

  const stringRegex = /^(?!_)[가-힣a-zA-Z0-9]+([가-힣a-zA-Z0-9]+)*(?<!_)$/;

  const valueHandleChange = (text: string) => {
    if (stringRegex.test(text)) {
      setName(text);
      setIsLongName(text.length > 12);
    } else {
      setIsLongName(false);
    }
  };

  const handleHashTagSubmit = () => {
    if (hashTag.trim() !== '' && hashtagList.length < 3) {
      if (stringRegex.test(hashTag.trim())) {
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

  const toBack = () => {
    navigation.goBack();
  };

  const toUpdate = async (): Promise<void> => {
    try {
      if (type === 'PUBLIC') {
        const response = await updateRoom(id, {
          name: name,
          persona: persona,
          hashtagList: hashtagList,
        });

        setRoomInfo({
          roomId: response.result.roomId,
          name: response.result.name,
          inviteCode: response.result.inviteCode,
          persona: response.result.persona,
          mateDetailList: response.result.mateDetailList,
          managerMemberId: response.result.managerMemberId,
          managerNickname: response.result.managerNickname,
          isRoomManager: response.result.isRoomManager,
          favoriteId: response.result.favoriteId,
          maxMateNum: response.result.maxMateNum,
          arrivalMateNum: response.result.arrivalMateNum,
          dormitoryName: response.result.dormitoryName,
          roomType: response.result.roomType,
          hashtagList: response.result.hashtagList,
          equality: response.result.equality,
          difference: response.result.difference,
        });
      } else if (type === 'PRIVATE') {
        const response = await updateRoom(id, { name: name, persona: persona });

        setRoomInfo({
          roomId: response.result.roomId,
          name: response.result.name,
          inviteCode: response.result.inviteCode,
          persona: response.result.persona,
          mateDetailList: response.result.mateDetailList,
          managerMemberId: response.result.managerMemberId,
          managerNickname: response.result.managerNickname,
          isRoomManager: response.result.isRoomManager,
          favoriteId: response.result.favoriteId,
          maxMateNum: response.result.maxMateNum,
          arrivalMateNum: response.result.arrivalMateNum,
          dormitoryName: response.result.dormitoryName,
          roomType: response.result.roomType,
          hashtagList: response.result.hashtagList,
          equality: response.result.equality,
          difference: response.result.difference,
        });
      }

      roomInfoRefetch();

      navigation.navigate('MainScreen', { screen: 'RoomMainScreen' });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex flex-1 flex-col justify-between bg-white">
          <View className="flex flex-1 flex-col justify-between px-5">
            <View>
              {/* 상단 이전 버튼 */}
              <View className="mb-[33px] mt-2 flex flex-row items-center">
                <Pressable onPress={toBack}>
                  <BackButton />
                </Pressable>
              </View>

              {/* 캐릭터 선택 */}
              <View className="relative mb-10 flex items-center justify-center">
                <View className="relative">
                  {getProfileImage(persona, 130, 130)}
                  <View className="absolute bottom-0 right-0">
                    <Pressable onPress={handleCharacterModal}>
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
                    onChangeText={valueHandleChange}
                    placeholder="방이름을 입력해주세요"
                  />
                  {isLongName && (
                    <Text className="mt-2 pl-2 text-xs font-medium text-warning">
                      방이름은 최대 12글자만 가능해요!
                    </Text>
                  )}
                </View>

                {/* 방 해시태그 입력 */}
                {type === 'PUBLIC' && (
                  <View className="mt-10">
                    <Text className="mb-2 px-1 text-base font-semibold text-basicFont">
                      방을 나타낼 해시태그를 입력해주세요 (최대 3개)
                    </Text>
                    <TextInput
                      className="mb-2 rounded-xl bg-colorBox p-4 text-sm font-medium leading-4 text-basicFont"
                      value={hashTag}
                      onChangeText={setHashTag}
                      onSubmitEditing={handleHashTagSubmit}
                      placeholder="해시태그를 입력해주세요"
                    />
                    <View className="flex flex-row">
                      {hashtagList.length > 0 &&
                        hashtagList.map((hash, index) => (
                          <View
                            key={index}
                            className="mr-2 flex flex-row items-center rounded-full border border-main1 bg-sub2 py-1 pl-3.5 pr-1.5"
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
            </View>

            <View className="flex">
              <Pressable
                onPress={toUpdate}
                className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}
              >
                <Text className="text-center text-base font-semibold text-white">수정</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {isCharacterModalOpen && (
        <SelectCharacterModal
          persona={persona}
          setPersona={setPersona}
          closeModal={handleCharacterModal}
          pressFunc={null}
        />
      )}

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
    </>
  );
};

export default EditRoomScreen;
