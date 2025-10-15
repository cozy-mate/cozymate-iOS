import { isAxiosError } from "axios";
import { useMemo, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { MenuItem } from "@/components/common/dormitoryItem/menuItem";
import { DetailLayout } from "@/components/common/layout";
import { TextHeader } from "@/components/common/textHeader";
import { useGetDormitoryMenu } from "@/hooks/dormitory/dormitory";
import { Menu as DormitoryMenu, MenuTimeKey } from "@/server/dormitory/response";
import { formatDateYYYYMMDD, startOfWeekSunday, addDays, getWeeksAround } from "@/utils/date";

export default function Menu() {
    const today = useMemo(() => new Date(), []);
    const currentWeekStart = useMemo(() => startOfWeekSunday(today), [today]);
    const [selectedDate, setSelectedDate] = useState<string>(formatDateYYYYMMDD(today));
    const weeks = useMemo(() => getWeeksAround(currentWeekStart, 6), [currentWeekStart]);

    const { data, isFetching, error } = useGetDormitoryMenu(selectedDate);

    const menuItems = data?.result ? Object.entries(data.result).map(([k, v]) => [k as MenuTimeKey, v as DormitoryMenu]) as [MenuTimeKey, DormitoryMenu][] : [];

    return <DetailLayout>
        <View className="mt-[8px]">

            <Carousel
                width={Dimensions.get('window').width}
                height={84}
                data={weeks}
                pagingEnabled
                snapEnabled
                defaultIndex={6}
                renderItem={({ item }) => {
                    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
                    const days = Array.from({ length: 7 }, (_, i) => addDays(item, i));
                    return (
                        <View className="flex flex-row items-center justify-between px-[16px]">
                            {days.map((d) => {
                                const key = formatDateYYYYMMDD(d);
                                const isSelected = key === selectedDate;
                                const isToday = key === formatDateYYYYMMDD(today);
                                return (
                                    <Pressable key={key} onPress={() => setSelectedDate(key)}>
                                        <View className={`items-center justify-center w-[44px] h-[64px] rounded-2xl ${isSelected
                                            ? 'bg-mainColor'
                                            : isToday
                                                ? 'bg-subColor2 border-2 border-mainColor'
                                                : 'bg-[#F1F4FA]'
                                            }`}>
                                            <Text className={`Medium12 ${isSelected
                                                ? 'text-white'
                                                : isToday
                                                    ? 'text-mainColor'
                                                    : 'text-disabledFont'
                                                }`}>{weekdays[d.getDay()]}</Text>
                                            <Text className={`Semibold16 ${isSelected
                                                ? 'text-white'
                                                : isToday
                                                    ? 'text-mainColor'
                                                    : 'text-basicFont'
                                                }`}>{d.getDate()}</Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    );
                }}
                onSnapToItem={(index) => {
                    const weekStart = weeks[index];
                    const startKey = formatDateYYYYMMDD(weekStart);
                    const endKey = formatDateYYYYMMDD(addDays(weekStart, 6));
                    const todayKey = formatDateYYYYMMDD(today);

                    if (selectedDate < startKey || selectedDate > endKey) {
                        if (todayKey >= startKey && todayKey <= endKey) {
                            setSelectedDate(todayKey);
                        } else {
                            setSelectedDate(startKey);
                        }
                    }
                }}
            />
        </View>
        <TextHeader title={
            <View className="flex flex-row items-end">
                <Text className="Semibold18 text-emphasizedFont">
                    {selectedDate}
                </Text>
                {selectedDate === formatDateYYYYMMDD(today) && <Text className="Regular12 text-disabledFont ml-1">(오늘)</Text>}</View>
        } />
        <View className="mt-[16px] gap-y-[12px] text-center w-full">
            {(() => {
                if (isAxiosError(error) && error.response?.data?.code === 'DORMITORYMENU400') {
                    return <Text className="text-disabledFont w-full text-center">해당 날짜의 메뉴가 없습니다.</Text>
                }
                if (error) {
                    return <Text className="text-disabledFont w-full text-center">메뉴를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</Text>
                }
                if (isFetching && !data) {
                    return (
                        <>
                            <Text className="text-disabledFont w-full text-center">메뉴를 불러오는 중입니다.</Text>
                        </>
                    );
                }
                if (isFetching && data) {
                    return (
                        <>
                            <MenuItem menuItem={['breakfast', { time: '08:00~09:00', menu: '' }]} isFetching={true} />
                        </>
                    );
                }

                if (menuItems.length === 0) {
                    return <Text className="text-disabledFont w-full text-center">해당 날짜의 메뉴가 없습니다.</Text>
                }

                return null;
            })()}

            {!isFetching && data && menuItems.length > 0 && menuItems.map((mi) => (
                <MenuItem key={mi[0]} menuItem={mi} isFetching={false} />
            ))}
        </View>
    </DetailLayout>
}