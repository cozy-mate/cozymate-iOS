import React from 'react';
import { Text, View, Modal } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import CharacterSelect from '@components/roomDetail/characterSelect';

interface SelectCharacterModalProps {
  persona: number;
  setPersona: React.Dispatch<React.SetStateAction<number>>;
  closeModal: () => void;
  pressFunc: any;
}

const SelectCharacterModal: React.FC<SelectCharacterModalProps> = ({
  persona,
  setPersona,
  closeModal,
  pressFunc,
}) => {
  const handleUpdate = async (): Promise<void> => {
    pressFunc(persona);
    closeModal();
  };

  return (
    <Modal transparent={true} animationType="fade">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-between bg-white px-5 pb-[56px] pt-[47px]">
        <View className="flex flex-col bg-white pt-14">
          <Text className={`mb-6 text-xl font-semibold text-emphasizedFont`}>
            cozymate와 함께할{'\n'}캐릭터를 선택해주세요!
          </Text>

          <CharacterSelect persona={persona} setValue={setPersona} />
        </View>

        <BottomButton
          color="bg-main1"
          borderColor="border-main1"
          textColor="text-white"
          text="확인"
          disabled={persona === 0}
          onPressFunc={handleUpdate}
        />
      </View>
    </Modal>
  );
};

export default SelectCharacterModal;
