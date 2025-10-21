import { isAxiosError } from "axios";
import { View, Text, FlatList, RefreshControl } from "react-native";


import { NoticeItem } from "@/components/common/dormitoryItem/noticeItem";
import { DetailLayout } from "@/components/common/layout";
import { TextHeader } from "@/components/common/textHeader";
import { useGetDormitoryImportantNoticeList, useGetDormitoryNoticeList } from "@/hooks/dormitory/dormitory";

export default function Notice() {

    const { data: noticeData, isRefetching: isNoticeFetching, error: noticeError } = useGetDormitoryImportantNoticeList();

    const { data: noticeListData, isRefetching: isNoticeListFetching, error: noticeListError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch: noticeListRefetch } = useGetDormitoryNoticeList();

    return <DetailLayout className="bg-[#F7FAFF]">
        <FlatList
            refreshControl={<RefreshControl refreshing={isNoticeListFetching} onRefresh={() => { noticeListRefetch(); }} />}
            ListHeaderComponent={
                <View className="gap-y-[12px] mt-[12px]">
                    <TextHeader title={
                        <Text className="Semibold18 text-emphasizedFont">주요 공지사항</Text>
                    } />
                    {(() => {
                        if (isNoticeFetching || !noticeData) {
                            return <Text className="text-disabledFont w-full text-center">주요 공지사항을 불러오는 중입니다.</Text>
                        }
                        if (noticeData?.result?.result?.length === 0 || (isAxiosError(noticeError) && noticeError.response?.data?.code === 'DORMITORYNOTICE400')) {
                            return <Text className="text-disabledFont w-full text-center">공지사항이 없습니다.</Text>
                        }
                        if (isAxiosError(noticeError)) {
                            return <Text className="text-disabledFont w-full text-center">공지사항을 불러오는 중 오류가 발생했습니다.</Text>
                        }
                        return noticeData?.result.result.map((item, index) => (
                            <NoticeItem key={index} noticeItem={item} isFetching={isNoticeFetching} />
                        ))
                    })()}
                    <TextHeader title={
                        <Text className="Semibold18 text-emphasizedFont mt-[40px] mb-[12px]">공지사항</Text>
                    } />
                </View>
            }
            ListEmptyComponent={(() => {
                if (isNoticeListFetching || !noticeListData) {
                    return <Text className="text-disabledFont w-full text-center">공지사항을 불러오는 중입니다.</Text>
                }
                if (isAxiosError(noticeListError)) {
                    return <Text className="text-disabledFont w-full text-center">공지사항을 불러오는 중 오류가 발생했습니다.</Text>
                }
                return <Text className="text-disabledFont w-full text-center">공지사항이 없습니다.</Text>
            })()}
            data={noticeListData?.pages.flatMap((page) => page.result.result) ?? []}
            ItemSeparatorComponent={() => <View className="h-[12px]" />}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            renderItem={({ item }) => <NoticeItem noticeItem={item} isFetching={isNoticeListFetching} />
            }
        />
    </DetailLayout>
}