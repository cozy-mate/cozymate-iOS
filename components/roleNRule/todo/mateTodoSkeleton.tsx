import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

export default function MateTodoSkeleton() {
  return (
    <View className="shadow-chipback rounded-lg bg-white">
      <ContentLoader
        speed={3}
        width={Dimensions.get('screen').width - 40}
        height={136}
        backgroundColor="#d1d1d1"
        foregroundColor="#E6E6E6"
      >
        {/* 주소 */}
        <Circle cx="28" cy="28" r="12" />
        <Rect x="48" y="19.5" rx="4" ry="4" width="24" height="17" />

        {/* 이름 */}
        <Rect x="17" y="57" rx="4" ry="4" width="22" height="22" />
        <Rect x="48" y="59.5" rx="4" ry="4" width="120" height="17" />

        {/* 사이즈 */}
        <Rect x="17" y="97" rx="4" ry="4" width="22" height="22" />
        <Rect x="48" y="99.5" rx="4" ry="4" width="120" height="17" />
      </ContentLoader>
    </View>
  );
}
