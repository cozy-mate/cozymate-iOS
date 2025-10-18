import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Text, View } from 'react-native';

export default function RoommateSkeleton() {
  return (
    <View className="border border-disabledColor px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
      <View className="flex flex-row items-center justify-between">
        <ContentLoader
          speed={3}
          width={80}
          height={19.3}
          backgroundColor="#d1d1d1"
          foregroundColor="#E6E6E6"
        >
          <Rect x="8" y="0" rx="4" ry="4" width="60" height="19.3" />
        </ContentLoader>
        <Text className="Medium16 text-colorFont">?? %</Text>
      </View>

      <View className="h-[1px] bg-[#F6F6F6] my-[16px]" />

      <View className="flex flex-row justify-between">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
          <ContentLoader
            key={item}
            speed={3}
            width={70}
            height={64}
            backgroundColor="#d1d1d1"
            foregroundColor="#E6E6E6"
          >
            <Circle cx="35" cy="12" r="12" />
            {/* <Rect x="16" y="30" rx="4" ry="4" width="40.7" height="34" /> */}
            <Rect x="14.65" y="30" rx="4" ry="4" width="40.7" height="15" />
            <Rect x="14.65" y="47" rx="4" ry="4" width="40.7" height="17" />
          </ContentLoader>
        ))}
      </View>
    </View>
  );
}
