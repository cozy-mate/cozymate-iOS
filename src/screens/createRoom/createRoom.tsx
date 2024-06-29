import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import BackButton from '@assets/backButton.svg';
import XButton from '@assets/xButton.svg';
import CharacterBox from '@assets/characterBox.svg';
import SelectIcon from '@assets/createRoom/selectCharacter.svg';

import { CreateRoomScreenProps } from '@type/param/stack';
import TextInputBoxComponent from '@components/textInputBox';
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

  const toSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  const valueHandleChange = (text: string) => {
    setRoomName(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4">
        <View className="flex-row justify-between items-center pl-[1px] mb-[33px]">
          <Pressable onPress={toSignIn}>
            <BackButton />
          </Pressable>
          <Text className="text-black text-[18px] font-semibold">방 만들기</Text>
          <Pressable onPress={toSignIn}>
            <XButton />
          </Pressable>
        </View>
        <View className="flex items-center justify-center mb-10">
          <CharacterBox />
          <View className="relative">
            <SelectIcon />
          </View>
        </View>
        <View className="pl-[6px] mb-[260px]">
          <View className="mb-[28px]">
            <Text className="mb-2 text-base font-semibold text-basicFont">
              방이름을 입력해주세요
            </Text>
            <TextInput
              className="p-4 text-sm font-medium text-basicFont bg-colorBox rounded-xl"
              value={roomName}
              onChangeText={valueHandleChange}
              placeholder="방이름을 입력해주세요"
            />
          </View>
          <View>
            <Text className="mb-2 text-base font-semibold text-basicFont">
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
