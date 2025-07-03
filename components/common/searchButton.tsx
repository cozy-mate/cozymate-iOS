import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import MagnifierIcon from '@/assets/images/common/magnifier.svg';

interface SearchButtonComponentProps {
  type: 'user' | 'room';
}

const SearchButtonComponent: React.FC<SearchButtonComponentProps> = ({ type }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/${type}/search`)}
      className="bg-colorBox rounded-xl px-[4px] py-[8px] flex flex-row items-center"
    >
      <View className="p-[8px]">
        <MagnifierIcon />
      </View>
      <Text className="Medium14 text-disabledFont">
        {type === 'user' ? '룸메이트 닉네임을 검색해보세요' : '방 이름을 검색해보세요'}
      </Text>
    </Pressable>
  );
};

export default SearchButtonComponent;
