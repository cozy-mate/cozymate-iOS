import { useMemo, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomMultiTextInput from '@/components/common/customInput/customMultiText';
import CustomSelect from '@/components/common/customInput/customSelect';
import RoomNameInput from '@/components/room/createRoom/roomNameInput';
import SelectPersonaComponent from '@/components/room/createRoom/selectPersona';
import { numberOfMateItems } from '@/constants/items/numOfMate';
import { useCreatePublicRoom } from '@/hooks/room/room';
import { useCreateRoomStore } from '@/zustand/room/room';

export default function CreateRoom() {
  const { createRoomInfo, setCreateRoomInfo, clearCreateRoomInfo } = useCreateRoomStore();

  const [isNameError, setIsNameError] = useState<boolean>(false);

  const [hashtag, setHashtag] = useState<string>('');

  const hashtagRegex = /^(?!_)[가-힣a-zA-Z0-9]+(_[가-힣a-zA-Z0-9]+)*(?<!_)$/;

  const handleHashtagSubmit = () => {
    if (hashtag.length !== 0) {
      if (!hashtagRegex.test(hashtag)) {
        Alert.alert('해시태그 형식이 올바르지 않습니다.');
      } else if (hashtag.length > 5) {
        Alert.alert('해시태그는 최대 5글자 입력 가능해요!');
      } else if (hashtag.length !== 0 && createRoomInfo.hashtagList.length < 3) {
        setCreateRoomInfo({ hashtagList: [...createRoomInfo.hashtagList, hashtag.trim()] });
      }

      setHashtag('');
    }
  };

  const { mutateAsync: createPublicRoom, isPending } = useCreatePublicRoom();

  const isInvalid = useMemo(() => {
    return (
      createRoomInfo.persona === 0 ||
      createRoomInfo.name === '' ||
      isNameError ||
      createRoomInfo.maxMateNum === 0 ||
      createRoomInfo.hashtagList.length === 0
    );
  }, [createRoomInfo, isNameError]);

  const shouldDisable = isInvalid || isPending;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-[20px]">
          <BackHeaderComponent additionalFunction={clearCreateRoomInfo} />
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 32,
            rowGap: 42,
            paddingBottom: 160,
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <SelectPersonaComponent persona={createRoomInfo.persona} />

          <View className="gap-y-[40px]">
            <RoomNameInput
              title="방 이름을 입력해주세요"
              value={createRoomInfo.name}
              handleValue={(e: string) => setCreateRoomInfo({ name: e })}
              placeholder="방이름을 입력해주세요"
              handleIsError={(e: boolean) => setIsNameError(e)}
            />

            <CustomSelect
              title="인원을 선택해주세요 (본인 포함)"
              value={createRoomInfo.maxMateNum}
              items={numberOfMateItems}
              handleValue={(e: number) => setCreateRoomInfo({ maxMateNum: e })}
            />

            <CustomMultiTextInput
              title="방을 나타낼 해시태그를 입력해주세요 (최대 3개)"
              inputValue={hashtag}
              setInputValue={setHashtag}
              value={createRoomInfo.hashtagList}
              setValue={(e: string[]) => setCreateRoomInfo({ hashtagList: e })}
              handleSubmit={handleHashtagSubmit}
              placeholder="해시태그를 입력해주세요"
            />
          </View>
        </KeyboardAwareScrollView>

        <BottomButtonComponent
          buttonText="방 생성하기"
          onPress={() => createPublicRoom(createRoomInfo)}
          color={shouldDisable ? 'GRAY' : 'BLUE'}
          disabled={shouldDisable}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
