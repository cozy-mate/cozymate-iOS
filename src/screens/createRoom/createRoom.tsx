import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';

import { CreateRoomScreenProps } from '@type/param/loginStack';

import { useRecoilState } from 'recoil';
import { RoomInfo } from '@recoil/type';
import { createRoomState } from '@recoil/recoil';

import BackButton from '@assets/backButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
  const [createroomState, setCreateroomState] = useRecoilState(createRoomState);

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

  const toCozyHome = () => {
    navigation.navigate('CozyHomeScreen');
  };

  const toSelectCharacter = () => {
    navigation.navigate('SelectCharacterScreen');
  };

  const toNext = async (): Promise<void> => {
    setCreateroomState((prevState: RoomInfo) => ({
      ...prevState,
      name: name,
      maxMateNum: maxMateNum,
    }));

    navigation.navigate('CompleteCreateRoomScreen');
  };

  return (
    <SafeAreaView className="flex flex-col justify-between flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        <View>
          {/* 상단 이전 버튼 */}
          <View className="flex flex-row items-center mt-2 mb-[33px]">
            <Pressable onPress={toCozyHome}>
              <BackButton />
            </Pressable>
          </View>

          {/* 캐릭터 선택 */}
          <View className="relative flex items-center justify-center mb-10">
            <View className="relative">
              {createroomState.profileImage ? (
                <Image
                  source={{
                    uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${createroomState.profileImage}.png`,
                  }}
                  style={{ width: 130, height: 130 }}
                  resizeMode="cover"
                />
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
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}  p-4 rounded-xl`}
          >
            <Text className="text-base font-semibold text-center text-white">방 생성하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateRoomScreen;
