import ContentLoader, { Rect } from 'react-content-loader/native';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { Menu, MenuTimeKey } from '@/server/dormitory/response';

interface MenuItemProps {
    menuItem: [MenuTimeKey, Menu];
    onPress?: () => void;
    isFetching?: boolean;
}

const MENU_TIME_KEY_MAP: Record<MenuTimeKey, string> = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
} as const;

export const MenuItem = ({ menuItem, onPress = () => { }, isFetching = true }: MenuItemProps) => {

    const [menuTime, { time, menu = "[]" }] = menuItem;

    return (
        <OpacityPressable onPress={onPress} className='h-fit w-full'>
            <View className="flex flex-col border border-disabledColor h-fit p-3 rounded-xl mx-[20px]">
                {isFetching ? (
                    <>
                        <View className="flex flex-row items-center justify-start">
                            <ContentLoader speed={2} width={140} height={20} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                                <Rect x="0" y="2" rx="4" ry="4" width="40" height="16" />
                                <Rect x="48" y="2" rx="4" ry="4" width="80" height="16" />
                            </ContentLoader>
                        </View>
                        <View className="mx-[8px] mt-[8px]">
                            <ContentLoader speed={2} width={260} height={16} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                                <Rect x="0" y="0" rx="4" ry="4" width="240" height="14" />
                            </ContentLoader>
                        </View>
                    </>
                ) : (
                    <>
                        <View className="flex flex-row items-center justify-start">
                            <View className="py-[2px] px-[8px] rounded bg-colorBox">
                                {/* 자간 조정 */}
                                <Text className="Medium12 text-colorFont leading-[14px]">{MENU_TIME_KEY_MAP[menuTime]}</Text>
                            </View>
                            <Text className="Medium12 text-basicFont mx-[8px]">
                                {time}
                            </Text>
                        </View>
                        {/* @description 이런 문자열로 와서 임시 처리 로직 넣었습니다 \"백순대볶음*양념장\n쌀밥\n김치떡국\n새송이볶음\n무말랭이무침\n갓김치\" */}
                        <Text className="text-basicFont mx-[8px] whitespace-nowrap mt-[8px]">
                            {!menu || menu === "[]" || menu === "" ? "메뉴가 없습니다" : menu.replace(/\\n|["\[\]]/g, (m) => (m === '\\n' ? ' ' : ''))}
                        </Text>
                    </>
                )}
            </View>
        </OpacityPressable >
    );
}
