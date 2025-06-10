import { Pressable, Text, View } from 'react-native';

import SelectedListIcon from '@/assets/images/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@/assets/images/userDetail/coloredTableIcon.svg';
import ListIcon from '@/assets/images/userDetail/listIcon.svg';
import TableIcon from '@/assets/images/userDetail/tableIcon.svg';

interface ViewTypeButtonComponentProps {
  currentType: 'LIST' | 'TABLE';
  onPress: any;
}

const ViewTypeButtonComponent: React.FC<ViewTypeButtonComponentProps> = ({
  currentType,
  onPress,
}) => {
  return (
    <View className="flex flex-row justify-center items-center">
      <Pressable
        onPress={() => onPress('VIEW', 'LIST')}
        className="flex flex-row items-center gap-x-[6px] p-[16px]"
      >
        {currentType === 'LIST' ? <SelectedListIcon /> : <ListIcon />}
        <Text
          className={`text-14 ${currentType === 'LIST' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
        >
          리스트로 보기
        </Text>
      </Pressable>

      <View className="h-[24px] w-[1px] mx-[18px] bg-disabledColor" />

      <Pressable
        onPress={() => onPress('VIEW', 'TABLE')}
        className="flex flex-row items-center gap-x-[6px] p-[16px]"
      >
        {currentType === 'TABLE' ? <SelectedTableIcon /> : <TableIcon />}
        <Text
          className={`text-14 ${currentType === 'TABLE' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
        >
          표로 보기
        </Text>
      </Pressable>
    </View>
  );
};

export default ViewTypeButtonComponent;
