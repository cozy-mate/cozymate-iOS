import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';

import { CreateRoomScreenProps } from '@type/param/stack';

import { useRecoilState } from 'recoil';
import { CreateRoomInfo, RoomInfo } from '@recoil/type';
import { createRoomState, roomInfoState } from '@recoil/recoil';

import BackButton from '@assets/backButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';
import XButton from '@assets/createRoom/smallXButton.svg';
import { createRoom } from '@server/api/room';
import { getProfileImage } from '@utils/profileImage';

const CreateRoomScreen = ({ navigation, route }: CreateRoomScreenProps) => {
  const { type } = route.params;

  const [createroomState, setCreateroomState] = useRecoilState(createRoomState);
  const [, setRoomInfoState] = useRecoilState(roomInfoState);

  const [name, setName] = useState<string>('');
  const [maxMateNum, setMaxMateNum] = useState<number>(0);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashTagList, setHashTagList] = useState<string[]>([]);
  const [isLongName, setIsLongName] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (name !== '' && maxMateNum !== 0 && !isLongName) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }

    setCreateroomState((prevState: CreateRoomInfo) => ({
      ...prevState,
      name: name,
      maxMateNum: maxMateNum,
    }));

    console.log(createroomState);
  }, [name, maxMateNum, isLongName]);

  const [items, setItems] = useState([
    { index: 1, value: 2, name: '2명', select: false },
    { index: 2, value: 3, name: '3명', select: false },
    { index: 3, value: 4, name: '4명', select: false },
    { index: 4, value: 5, name: '5명', select: false },
    { index: 5, value: 6, name: '6명', select: false },
  ]);

  const valueHandleChange = (text: string) => {
    setName(text);
    if (text.length > 12) {
      setIsLongName(true);
    } else {
      setIsLongName(false);
    }
  };

  const handleHashTagSubmit = () => {
    if (hashTag.trim() !== '' && hashTagList.length < 3) {
      setHashTagList([...hashTagList, hashTag.trim()]);
      setHashTag(''); // Clear the input after adding
    }
  };

  const removeHashTag = (index: number) => {
    setHashTagList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  const toSelectCharacter = () => {
    navigation.navigate('SelectCharacterScreen');
  };

  const toNext = async (): Promise<void> => {
    try {
      const response = await createRoom({
        name: createroomState.name,
        profileImage: createroomState.profileImage,
        maxMateNum: createroomState.maxMateNum,
      });

      setCreateroomState({ name: '', profileImage: 0, maxMateNum: 0 });
      console.log(response.result);

      setRoomInfoState((prevState: RoomInfo) => ({
        ...prevState,
        roomId: response.result.roomId,
        name: response.result.name,
        inviteCode: response.result.inviteCode,
        profileImage: response.result.profileImage,
      }));

      navigation.navigate('CompleteCreateRoomScreen');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log(hashTagList);
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-col justify-between flex-1 bg-white">
        <View className="flex flex-col justify-between flex-1 px-5">
          <View>
            {/* 상단 이전 버튼 */}
            <View className="flex flex-row items-center mt-2 mb-[33px]">
              <Pressable onPress={toMain}>
                <BackButton />
              </Pressable>
            </View>

            {/* 캐릭터 선택 */}
            <View className="relative flex items-center justify-center mb-10">
              <View className="relative">
                {createroomState.profileImage ? (
                  <>{getProfileImage(createroomState.profileImage, 130, 130)}</>
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
                <Text className="px-1 mb-2 text-base font-semibold text-basicFont">
                  방이름을 입력해주세요
                </Text>
                <TextInput
                  className="p-4 text-sm font-medium leading-4 text-basicFont bg-colorBox rounded-xl"
                  value={name}
                  onChangeText={valueHandleChange}
                  placeholder="방이름을 입력해주세요"
                />
                {isLongName && (
                  <Text className="pl-2 mt-2 text-xs font-medium text-warning">
                    방이름은 최대 12글자만 가능해요!
                  </Text>
                )}
              </View>

              {/* 방 인원 선택 */}
              <View className="my-10">
                <Text className="px-1 mb-2 text-base font-semibold text-basicFont">
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
              {type === 'public' && (
                <View>
                  <Text className="px-1 mb-2 text-base font-semibold text-basicFont">
                    방을 나타낼 해시태그를 입력해주세요 (최대 3개)
                  </Text>
                  <TextInput
                    className="p-4 mb-2 text-sm font-medium leading-4 text-basicFont bg-colorBox rounded-xl"
                    value={hashTag}
                    onChangeText={setHashTag}
                    onSubmitEditing={handleHashTagSubmit}
                    placeholder="해시태그를 입력해주세요"
                  />
                  <View className="flex flex-row">
                    {hashTagList.length > 0 &&
                      hashTagList.map((hash, index) => (
                        <View
                          key={index}
                          className="rounded-full border-main1 border-[1px] pl-3.5 pr-1.5 py-1 bg-sub2 flex flex-row items-center mr-2"
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
              onPress={toNext}
              className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} p-4 rounded-xl`}
            >
              <Text className="text-base font-semibold text-center text-white">방 생성하기</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateRoomScreen;
