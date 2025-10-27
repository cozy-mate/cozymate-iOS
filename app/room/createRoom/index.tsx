import { useMemo, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomSelect from '@/components/common/customInput/customSelect';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import LoadingComponent from '@/components/common/loading';
import RoomNameInput from '@/components/room/createRoom/roomNameInput';
import SelectPersonaComponent from '@/components/room/createRoom/selectPersona';
import { numberOfMateItems } from '@/constants/items/numOfMate';
import { useCreatePublicRoom } from '@/hooks/room/room';
import { useCreateRoomStore } from '@/zustand/room/room';

export default function CreateRoom() {
  const { createRoomInfo, setCreateRoomInfo, clearCreateRoomInfo } = useCreateRoomStore();

  const [isNameError, setIsNameError] = useState<boolean>(false);

  const { mutateAsync: createPublicRoom, isPending } = useCreatePublicRoom();

  const isInvalid = useMemo(() => {
    return (
      createRoomInfo.persona === 0 ||
      createRoomInfo.name === '' ||
      isNameError ||
      createRoomInfo.maxMateNum === 0
      // || createRoomInfo.description.trim().length === 0
    );
  }, [createRoomInfo, isNameError]);

  const shouldDisable = isInvalid || isPending;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {isPending && <LoadingComponent />}

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

            <CustomTextInput
              title="한 줄 소개를 입력해주세요 (선택)"
              value={createRoomInfo.description}
              handleValue={(e: string) => setCreateRoomInfo({ description: e })}
              placeholder="룸메이트들에게 방을 소개해주세요"
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
