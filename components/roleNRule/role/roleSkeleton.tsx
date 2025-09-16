import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

export default function RoleSkeleton() {
  return (
    <View className="shadow-chipback rounded-lg bg-white">
      <ContentLoader
        speed={3}
        width={Dimensions.get('screen').width - 40}
        height={101}
        backgroundColor="#d1d1d1"
        foregroundColor="#E6E6E6"
      >
        <Rect x="16" y="16" rx="2" ry="2" width="37" height="21" />

        <Rect x="16" y="43" rx="4" ry="4" width="120" height="17" />

        <Rect x="16" y="68" rx="4" ry="4" width="80" height="17" />
      </ContentLoader>
    </View>
  );
}
