import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import BackButton from '@assets/backButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';

import { CreateRoomScreenProps } from '@type/param/loginStack';
import CustomRadioBoxComponent from '@components/createRoom/customRadioBox';

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
  const [roomName, setRoomName] = useState<string>('');
  const [peopleNumber, setPeopleNumber] = useState<number>(0);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (roomName !== '' && peopleNumber !== 0) {
      setIsComplete(true);
    }
  }, [roomName, peopleNumber]);

  const [items, setItems] = useState([
    { index: 1, value: 2, name: '2명', select: false },
    { index: 2, value: 3, name: '3명', select: false },
    { index: 3, value: 4, name: '4명', select: false },
    { index: 4, value: 5, name: '5명', select: false },
    { index: 5, value: 6, name: '6명', select: false },
  ]);

  useEffect(() => {
    console.log(roomName);
    console.log(peopleNumber);
  }, [roomName, peopleNumber]);

  const valueHandleChange = (text: string) => {
    setRoomName(text);
  };

  const toCozyHome = () => {
    navigation.navigate('CozyHomeScreen');
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
              <CharacterBox />
              <View className="absolute bottom-0 right-0">
                <Pressable>
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
                value={roomName}
                onChangeText={valueHandleChange}
                placeholder="방이름을 입력해주세요"
              />
            </View>

            {/* 방 인원 선택 */}
            <View>
              <Text className="px-1 mb-2 text-base font-semibold text-basicFont">
                인원을 선택해주세요 (본인 포함)
              </Text>
              <CustomRadioBoxComponent
                value={peopleNumber}
                setValue={setPeopleNumber}
                items={items}
                setItems={setItems}
              />
            </View>
          </View>
        </View>

        <View className="flex">
          <Pressable className={`${isComplete ? 'bg-main' : 'bg-[#C4C4C4]'}  p-4 rounded-xl`}>
            <Text className="text-base font-semibold text-center text-white">방 생성하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateRoomScreen;
