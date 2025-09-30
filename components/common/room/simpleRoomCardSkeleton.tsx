import ContentLoader, { Rect } from 'react-content-loader/native';
import { Text, View } from 'react-native';

export default function SimpleRoomCardSkeleton() {
  return (
    <View className="p-[16px] gap-y-[8px] border border-disabledColor rounded-xl">
      <View className="flex flex-row gap-x-[8px]">
        <ContentLoader
          speed={3}
          width={150}
          height={21}
          backgroundColor="#d1d1d1"
          foregroundColor="#E6E6E6"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="43.3" height="21" />
          <Rect x="49.3" y="0" rx="4" ry="4" width="43.3" height="21" />
          <Rect x="98.6" y="0" rx="4" ry="4" width="43.3" height="21" />
        </ContentLoader>
      </View>

      <ContentLoader
        speed={3}
        width={80}
        height={19.3}
        backgroundColor="#d1d1d1"
        foregroundColor="#E6E6E6"
      >
        <Rect x="0" y="0" rx="4" ry="4" width="60" height="19.3" />
      </ContentLoader>

      <View className="flex flex-row justify-between items-center">
        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">?명</Text>의 룸메이트가 있어요
        </Text>

        <Text className="Medium16 text-colorFont">?? %</Text>
      </View>
    </View>
  );
}
