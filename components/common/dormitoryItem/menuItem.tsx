import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { Menu, MenuTimeKey } from '@/server/dormitory/response';

interface MenuItemProps {
    menuItem: [MenuTimeKey, Menu];
    onPress?: () => void;
}

const MENU_TIME_KEY_MAP: Record<MenuTimeKey, string> = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
} as const;

export default function MenuItem({ menuItem, onPress = () => { } }: MenuItemProps) {

    const [menuTime, { time, menu }] = menuItem;


    return (
        <OpacityPressable onPress={onPress} className='h-fit'>
            <View className="flex flex-col border border-disabledColor h-[100px] px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
                <View className="flex flex-row items-center justify-start">
                    <View className="py-[2px] px-[8px] rounded bg-colorBox">
                        {/* 자간 조정 */}
                        <Text className="Medium12 text-colorFont leading-[14px]">{MENU_TIME_KEY_MAP[menuTime]}</Text>
                    </View>
                    < Text className="Medium12 text-basicFont mx-[8px]">
                        {time}
                    </Text>
                </View>
                {/* @description 이런 문자열로 와서 임시 처리 로직 넣었습니다 \"백순대볶음*양념장\n쌀밥\n김치떡국\n새송이볶음\n무말랭이무침\n갓김치\" */}
                <Text className="text-basicFont mx-[8px] whitespace-nowrap mt-[8px]">
                    {menu.replace(/\\n|["\[\]]/g, (m) => (m === '\\n' ? ' ' : ''))}
                </Text>
            </View>
        </OpacityPressable >
    );
}
