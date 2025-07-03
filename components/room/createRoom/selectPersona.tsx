import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import SelectPersonaIcon from '@/assets/images/common/selectPersona.svg';
import { getPersona } from '@/constants/items/characterItem';

interface SelectPersonaComponentProps {
  persona: number;
}

const SelectPersonaComponent: React.FC<SelectPersonaComponentProps> = ({ persona }) => {
  const router = useRouter();

  return (
    <View className="self-center relative">
      {persona === 0 ? (
        <View className="bg-[#D9D9D9] rounded-full w-[130px] h-[130px]" />
      ) : (
        getPersona(persona, 130, 130)
      )}
      <Pressable
        onPress={() => router.push('/room/createRoom/selectPersona')}
        className="absolute bottom-0 right-0"
      >
        <SelectPersonaIcon />
      </Pressable>
    </View>
  );
};

export default SelectPersonaComponent;
