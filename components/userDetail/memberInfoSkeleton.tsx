import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

import Background from '@/assets/images/common/background.svg';

export default function MemberInfoSkeleton() {
  return (
    <View>
      <Background style={{ position: 'absolute' }} />

      <View className="flex flex-row items-center gap-x-[8px]">
        <ContentLoader
          speed={1}
          width={Dimensions.get('screen').width}
          height={93}
          backgroundColor="#E0E0E0"
          foregroundColor="#F5F5F5"
        >
          <Circle cx="40" cy="20" r="20" />

          <Rect x="68" y="0" rx="4" ry="4" width="40" height="19" />
          <Rect x="68" y="23" rx="4" ry="4" width="120" height="17" />

          <Rect
            x="20"
            y="52"
            rx="12"
            ry="12"
            width={Dimensions.get('screen').width - 40}
            height="41"
          />
        </ContentLoader>
      </View>
    </View>
  );
}
