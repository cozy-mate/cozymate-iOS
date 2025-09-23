import ContentLoader, { Rect } from 'react-content-loader/native';
import { Text, View } from 'react-native';

export default function MiniRoomCardSkeleton() {
  return (
    <View className="flex flex-row justify-between items-center px-[8px] py-[10px]">
      <View>
        {/* 방 이름 */}
        <ContentLoader
          speed={3}
          width={80}
          height={19.3}
          backgroundColor="#d1d1d1"
          foregroundColor="#E6E6E6"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="60" height="19.3" />
        </ContentLoader>

        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">?명</Text>의 룸메이트가 있어요
        </Text>
      </View>

      <Text className="Medium16 text-colorFont">?? %</Text>
    </View>
  );
}
