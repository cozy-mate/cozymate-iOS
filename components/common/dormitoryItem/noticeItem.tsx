import ContentLoader, { Rect } from 'react-content-loader/native';
import { Linking, Text, View } from 'react-native';

import GrayArrowIcon from "@/assets/images/common/grayArrow.svg";
import OpacityPressable from '@/components/opacityPressable';
import { Notice } from '@/server/dormitory/response';


interface NoticeItemProps {
    noticeItem: Notice;
    isFetching?: boolean;
}

export const NoticeItem = ({ noticeItem, isFetching = true }: NoticeItemProps) => {
    return (
        // url 로 이동
        <OpacityPressable disabled={isFetching} onPress={isFetching ? () => { } : () => Linking.openURL(noticeItem.url)}>

            <View className="border border-disabledColor px-[16px] py-[12px] rounded-xl mx-[20px] bg-white">
                {isFetching ? (
                    <>
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex-1 gap-[8px]">
                                <ContentLoader speed={2} width={240} height={18} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                                    <Rect x="0" y="2" rx="4" ry="4" width="220" height="14" />
                                </ContentLoader>
                                <ContentLoader speed={2} width={100} height={16} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                                    <Rect x="0" y="1" rx="4" ry="4" width="80" height="12" />
                                </ContentLoader>
                            </View>
                            <ContentLoader speed={2} width={20} height={20} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                                <Rect x="0" y="2" rx="4" ry="4" width="20" height="16" />
                            </ContentLoader>
                        </View>
                    </>
                ) : (
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-1 gap-2">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="Medium16 text-basicFont" numberOfLines={1} ellipsizeMode="tail">
                                    {noticeItem.title}
                                </Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="Medium12 text-disabledFont">
                                    {noticeItem.createdAt.replace(/-/g, '.')}
                                </Text>
                            </View>
                        </View>

                        <GrayArrowIcon />
                    </View>
                )}
            </View>
        </OpacityPressable >
    );
}
