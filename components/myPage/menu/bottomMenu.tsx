import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';
import { useCheckHasInquiry } from '@/hooks/inquiry/inquiry';

const BottomMenuComponent: React.FC = () => {
  const router = useRouter();

  const { data: hasInquiry } = useCheckHasInquiry();

  const bottomMenuItems = [
    {
      title: '문의하기',
      subTitle: null,
      onPress: () =>
        hasInquiry.result
          ? router.push('/myPage/inquiry/list')
          : router.push('/myPage/inquiry/register'),
    },
    { title: '차단 목록', subTitle: null, onPress: () => router.push('/myPage/blockMember') },
  ];

  return (
    <View className="border border-[#F1F2F4] rounded-xl px-[16px] py-[4px]">
      {bottomMenuItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          className={`flex flex-row justify-between py-[12px] ${index !== bottomMenuItems.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
        >
          <Text className="Medium14 text-emphasizedFont">{item.title}</Text>

          <View className="flex flex-row items-center gap-x-[4px]">
            {item.subTitle !== null && item.subTitle}
            <GrayArrow />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default BottomMenuComponent;
