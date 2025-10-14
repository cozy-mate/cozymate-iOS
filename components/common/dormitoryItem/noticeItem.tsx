
import { Linking, Text, View } from 'react-native';

import GrayArrowIcon from "@/assets/images/common/grayArrow.svg";
import OpacityPressable from '@/components/opacityPressable';
import { Notice } from '@/server/dormitory/response';


interface NoticeItemProps {
    noticeItem: Notice;
}

export default function NoticeItem({ noticeItem }: NoticeItemProps) {
    return (
        // url 로 이동
        <OpacityPressable onPress={() => Linking.openURL(noticeItem.url)}>

            <View className="border border-disabledColor px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
                <View className="flex flex-row justify-between items-center">
                    <View className="flex-1 gap-1">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="Medium16 text-basicFont" numberOfLines={1} ellipsizeMode="tail">
                                {noticeItem.title}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="Medium12 text-disabledFont">
                                {noticeItem.createdAt.replaceAll('-', '.')}
                            </Text>
                        </View>
                    </View>

                    <GrayArrowIcon />
                </View>
            </View>
        </OpacityPressable >
    );
}
