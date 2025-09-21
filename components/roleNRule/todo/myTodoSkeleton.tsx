import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

export default function MyTodoSkeleton() {
  return (
    <View className="shadow-chipback rounded-lg bg-white">
      <ContentLoader
        speed={3}
        width={Dimensions.get('screen').width - 40}
        height={136}
        backgroundColor="#d1d1d1"
        foregroundColor="#E6E6E6"
      >
        <Rect x="17" y="17" rx="4" ry="4" width="22" height="22" />
        <Rect x="48" y="19.5" rx="4" ry="4" width="120" height="17" />

        <Rect x="17" y="57" rx="4" ry="4" width="22" height="22" />
        <Rect x="48" y="59.5" rx="4" ry="4" width="120" height="17" />

        <Rect x="17" y="97" rx="4" ry="4" width="22" height="22" />
        <Rect x="48" y="99.5" rx="4" ry="4" width="120" height="17" />
      </ContentLoader>
    </View>
  );
}
