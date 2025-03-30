import { Modal, Text, View } from 'react-native';

import BottomButton from '../bottomButton';
import CharacterList from '../characterList';

interface PersonaSelectComponentProps {
  isVisible: boolean;
  close: () => void;
  value: number;
  handleValue: (num: number) => void;
  onPress: () => void;
}

const PersonaSelectComponent: React.FC<PersonaSelectComponentProps> = ({
  isVisible,
  close,
  value,
  handleValue,
  onPress,
}) => {
  return (
    isVisible && (
      <Modal transparent={false}>
        <View className="flex-1 bg-white">
          <View className="mt-[103px] px-[20px] gap-y-[24px]">
            <View className="gap-y-[2px] mx-[8px]">
              <Text className="text-20 text-emphasizedFont leading-20 font-600">
                우리방을 대표할
              </Text>
              <Text className="text-20 text-emphasizedFont leading-20 font-600">
                캐릭터를 선택해주세요!
              </Text>
            </View>

            <CharacterList value={value} handleValue={handleValue} />
          </View>

          <View className="absolute bottom-[42px] w-full px-[22px]">
            <BottomButton buttonText="확인" disabled={value === 0} onPress={onPress} />
          </View>
        </View>
      </Modal>
    )
  );
};

export default PersonaSelectComponent;
