import { FlatList, Pressable, Text, View } from 'react-native';

import Selected from '@/assets/images/character/check.svg';
import { getPersona } from '@/constants/items/characterItem';

interface PersonaListComponentProps {
  title: string[];
  value: number;
  handleValue: (e: number) => void;
}

const PersonaListComponent: React.FC<PersonaListComponentProps> = ({
  title,
  value,
  handleValue,
}) => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
      renderItem={({ item }) => (
        <Pressable key={item} onPress={() => handleValue(item)} className="relative">
          {getPersona(item, 70, 70)}

          {value === item && (
            <View className="absolute">
              <Selected />
            </View>
          )}
        </Pressable>
      )}
      numColumns={4}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 32 }}
      ListHeaderComponent={() => (
        <View className="gap-y-[2px] mx-[8px] mb-[24px]">
          {title.map((item, index) => (
            <Text key={index} className="Semibold18 text-emphasizedFont">
              {item}
            </Text>
          ))}
        </View>
      )}
    />
  );
};

export default PersonaListComponent;
