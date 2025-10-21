import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Text } from 'react-native';

export default function EssentialInfoSkeleton() {
  // 각 항목별 예상 너비 (대략적인 값)
  const skeletonWidths = {
    time: 60,
    short: 80,
    medium: 100,
    long: 150,
  };

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">필수 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        {[
          { label: '기상시간', width: skeletonWidths.time },
          { label: '취침시간', width: skeletonWidths.time },
          { label: '소등시간', width: skeletonWidths.time },
          { label: '흡연여부', width: skeletonWidths.short },
          { label: '잠버릇', width: skeletonWidths.long },
          { label: '에어컨', width: skeletonWidths.short },
          { label: '히터', width: skeletonWidths.short },
          { label: '생활 패턴', width: skeletonWidths.medium },
          { label: '친밀도', width: skeletonWidths.short },
          { label: '물건공유', width: skeletonWidths.short },
          { label: '공부여부', width: skeletonWidths.short },
          { label: '섭취여부', width: skeletonWidths.short },
          { label: '게임여부', width: skeletonWidths.short },
          { label: '전화여부', width: skeletonWidths.short },
          { label: '청결 예민도', width: skeletonWidths.short },
          { label: '소음 예민도', width: skeletonWidths.short },
          { label: '청소빈도', width: skeletonWidths.short },
          { label: '음주빈도', width: skeletonWidths.short },
          { label: '성격', width: skeletonWidths.long },
          { label: 'MBTI', width: skeletonWidths.short },
        ].map((item, idx) => (
          <React.Fragment key={idx}>
            <View className="flex flex-row items-center gap-x-[12px] flex-1">
              <Text className="Medium14 text-colorFont">{item.label}</Text>
              <ContentLoader
                speed={1}
                width={item.width}
                height={16}
                viewBox={`0 0 ${item.width} 16`}
                backgroundColor="#E0E0E0"
                foregroundColor="#F5F5F5"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={item.width} height={16} />
              </ContentLoader>
            </View>

            {idx !== 19 && <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
