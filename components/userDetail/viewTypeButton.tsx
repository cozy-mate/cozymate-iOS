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
          className={`${currentType === 'LIST' ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
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
          className={`${currentType === 'TABLE' ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
        >
          표로 보기
        </Text>
      </Pressable>
    </View>
  );
};

export default ViewTypeButtonComponent;
