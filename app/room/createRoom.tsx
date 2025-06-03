import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectPersonaIcon from '@/assets/images/common/selectPersona.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import CustomSelectComponent from '@/components/common/customSelect';
import PersonaSelectComponent from '@/components/common/personaSelect';
import CustomMultiTextInputComponent from '@/components/createRoom/customMultiTextInputBox';
import RoomNameInputComponent from '@/components/createRoom/roomNameInput';
import { getPersona } from '@/constants/items/characterItem';
import { numOfMateItems } from '@/constants/items/numOfMate';
import { useCreatePublicRoom } from '@/hooks/room/room';
import BottomButtonComponent from '@/newComponents/common/bottomButton';

export default function CreateRoom() {
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState<boolean>(false);
  const [persona, setPersona] = useState<number>(0);

  const [name, setName] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const [maxMateNum, setMaxMateNum] = useState<number>(0);

  const [hashtag, setHashtag] = useState<string>('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const hashtagRegex = /^(?!_)[가-힣a-zA-Z0-9]+(_[가-힣a-zA-Z0-9]+)*(?<!_)$/;

  const handleHashtagSubmit = () => {
    if (hashtag.length !== 0) {
      if (!hashtagRegex.test(hashtag)) {
        Alert.alert('해시태그 형식이 올바르지 않습니다.');
      } else if (hashtag.length > 5) {
        Alert.alert('해시태그는 최대 5글자 입력 가능해요!');
      } else if (hashtag.length !== 0 && hashtagList.length < 3) {
        setHashtagList([...hashtagList, hashtag.trim()]);
      }

      setHashtag('');
    }
  };

  const handleHashtagRemove = (tag: string) => {
    setHashtagList(hashtagList.filter((item) => item !== tag));
  };

  const { mutateAsync: createPublicRoom } = useCreatePublicRoom();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="gap-y-[42px] flex items-center">
              <View className="relative">
                {persona === 0 ? (
                  <View className="bg-[#D9D9D9] rounded-full w-[130px] h-[130px]" />
                ) : (
                  getPersona(persona, 130, 130)
                )}
                <Pressable
                  onPress={() => setIsPersonaModalOpen(true)}
                  className="absolute bottom-0 right-0"
                >
                  <SelectPersonaIcon />
                </Pressable>
              </View>

              <View className="w-full gap-y-10">
                <RoomNameInputComponent
                  title="방 이름을 입력해주세요"
                  value={name}
                  handleValue={(e: string) => setName(e)}
                  placeholder="방이름을 입력해주세요"
                  isError={isError}
                  handleIsError={(e: boolean) => setIsError(e)}
                />

                <CustomSelectComponent
                  title="인원을 선택해주세요 (본인 포함)"
                  value={maxMateNum}
                  items={numOfMateItems}
                  handleValue={(e) => setMaxMateNum(Number(e))}
                />

                <CustomMultiTextInputComponent
                  title="방을 나타낼 해시태그를 입력해주세요 (최대 3개)"
                  value={hashtag}
                  handleValue={(e: string) => setHashtag(e)}
                  handleSubmit={handleHashtagSubmit}
                  valueList={hashtagList}
                  handleRemove={handleHashtagRemove}
                  placeholder="해시태그를 입력해주세요"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <BottomButtonComponent
          buttonText="방 생성하기"
          onPress={() => createPublicRoom({ name, persona, maxMateNum, hashtagList })}
          color={
            persona === 0 || isError || name === '' || maxMateNum === 0 || hashtagList.length === 0
              ? 'GRAY'
              : 'BLUE'
          }
          disabled={
            persona === 0 || isError || name === '' || maxMateNum === 0 || hashtagList.length === 0
          }
        />

        <PersonaSelectComponent
          isVisible={isPersonaModalOpen}
          close={() => setIsPersonaModalOpen(false)}
          value={persona}
          handleValue={(persona: number) => setPersona(persona)}
          onPress={() => setIsPersonaModalOpen(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
