import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Config from 'react-native-config';

import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';

import { CreateRoomScreenProps } from '@type/param/stack';

import { useRecoilState } from 'recoil';
import { CreateRoomInfo, RoomInfo } from '@recoil/type';
import { createRoomState, roomInfoState } from '@recoil/recoil';

import BackButton from '@assets/backButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';
import { createRoom } from '@server/api/room';
import { getProfileImage } from '@utils/profileImage';

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
  const [createroomState, setCreateroomState] = useRecoilState(createRoomState);
  const [, setRoomInfoState] = useRecoilState(roomInfoState);

  const [name, setName] = useState<string>('');
  const [maxMateNum, setMaxMateNum] = useState<number>(0);
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

            <View className="">
              {/* 방이름 입력 */}
              <View className="mb-[28px]">
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
              <View>
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
