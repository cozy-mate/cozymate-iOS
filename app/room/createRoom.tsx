import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectPersonaIcon from '@/assets/images/common/selectPersona.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import CustomMultiTextInputComponent from '@/components/common/customMultiTextInputBox';
import CustomSelectComponent from '@/components/common/customSelect';
import CustomTextInputComponent from '@/components/common/customTextInput';
import PersonaSelectComponent from '@/components/common/personaSelect';
import { getPersona } from '@/constants/items/characterItem';
import { numOfMateItems } from '@/constants/items/numOfMate';
import { useCreatePublicRoom } from '@/hooks/room/room';

export default function CreateRoom() {
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState<boolean>(false);
  const [persona, setPersona] = useState<number>(0);

  const [name, setName] = useState<string>('');

  const [maxMateNum, setMaxMateNum] = useState<number>(0);

  const [hashtag, setHashtag] = useState<string>('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const handleHashtagSubmit = () => {
    if (hashtag.trim() !== '' && hashtagList.length < 3) {
      setHashtagList([...hashtagList, hashtag.trim()]);
    }
    setHashtag(''); // 입력 후 초기화
  };

  const handleHashtagRemove = (tag: string) => {
    setHashtagList(hashtagList.filter((item) => item !== tag));
  };

  const { mutateAsync: createPublicRoom } = useCreatePublicRoom();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-8">
        <BackHeaderComponent />

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
            <CustomTextInputComponent
              title="방 이름을 입력해주세요"
              value={name}
              handleValue={(e: string) => setName(e)}
              placeholder="방이름을 입력해주세요"
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
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="방 생성하기"
          disabled={persona === 0 || name === '' || maxMateNum === 0 || hashtagList.length === 0}
          onPress={() => createPublicRoom({ name, persona, maxMateNum, hashtagList })}
        />
      </View>

      <PersonaSelectComponent
        isVisible={isPersonaModalOpen}
        close={() => setIsPersonaModalOpen(false)}
        value={persona}
        handleValue={(persona: number) => setPersona(persona)}
        onPress={() => setIsPersonaModalOpen(false)}
      />
    </SafeAreaView>
  );
}
