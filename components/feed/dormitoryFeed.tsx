import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { Dimensions, RefreshControl, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import { useGetDormitoryMenuAndNotice } from '@/hooks/dormitory/dormitory';
import { Menu, MenuTimeKey } from '@/server/dormitory/response';

import MenuItem from '../common/dormitoryItem/menuItem';
import NoticeItem from '../common/dormitoryItem/noticeItem';
import { TextNextHeader } from '../common/textNextHeader';

export default function DormitoryFeed() {

  const [{ data: menuData, isFetching: isMenuFetching, error: menuError, refetch: menuRefetch },
    { data: noticeData, isFetching: isNoticeFetching, error: noticeError, refetch: noticeRefetch }] = useGetDormitoryMenuAndNotice();

  const progress = useSharedValue<number>(0);

  const menuItems = Object.entries(menuData?.result ?? {}).map(([key, value]) => [key as MenuTimeKey, value]) as [MenuTimeKey, Menu][];

  return (<>
    <ScrollView className="flex-1 bg-[#F7FAFF] relative pt-6" refreshControl={<RefreshControl refreshing={isMenuFetching} onRefresh={() => { menuRefetch(); noticeRefetch(); }} />}>
      <TextNextHeader
        title={
          <Text className="Semibold18 text-emphasizedFont">오늘의 메뉴</Text>
        }
        className='mb-4'
        handleMore={() => router.push('/feed/menu')}
      />
      <>
        {(() => {
          // 로딩 또는 초기 데이터 미존재 시: 스켈레톤 3개
          if (isMenuFetching || !menuData) {
            return (
              <View className="gap-y-[12px]">
                <MenuItem menuItem={['breakfast', { time: '08:00~09:00', menu: '' }] as [MenuTimeKey, Menu]} isFetching={true} />

              </View>
            );
          }
          if (menuItems.length === 0 || (isAxiosError(menuError) && menuError.response?.data?.code === 'DORMITORYMENU400')) {
            return <Text className="text-disabledFont w-full text-center">오늘 메뉴 정보가 없습니다.</Text>
          }
          if (isAxiosError(menuError)) {
            return <Text className="text-disabledFont w-full text-center">메뉴 정보를 불러오는 중 오류가 발생했습니다.</Text>
          }
          return <Carousel
            width={Dimensions.get('window').width}
            height={110}
            loop={true}
            snapEnabled={true}
            pagingEnabled={true}
            autoPlay={false}
            onProgressChange={progress}
            data={menuItems ?? []}
            renderItem={({ item }) => <MenuItem menuItem={item} onPress={() => router.push(`/feed/menu?date=${item[0]}`)} isFetching={isMenuFetching} />}
            onSnapToItem={(index) => {
              progress.value = index;
            }}
          />;
        })()}
        <Pagination.Custom
          progress={progress}
          data={menuItems}
          dotStyle={{ backgroundColor: '#E6E6E6', borderRadius: 9999, width: 8, height: 8 }}
          activeDotStyle={{
            backgroundColor: '#68A4FF',
            borderRadius: 9999,
            width: 16,
            height: 8,
            overflow: 'hidden',
          }}
          containerStyle={{ gap: 8 }}
        />
      </>
      <TextNextHeader
        title={
          <Text className="Semibold18 text-emphasizedFont my-4">공지사항</Text>
        }
        handleMore={() => router.push('/feed/notice')}
      />
      <View className="flex flex-col gap-y-[12px]">
        {(() => {
          if (isNoticeFetching || !noticeData) {
            return (
              <>
                <NoticeItem noticeItem={{ title: '', url: '', createdAt: '' } as any} isFetching={true} />
                <NoticeItem noticeItem={{ title: '', url: '', createdAt: '' } as any} isFetching={true} />
                <NoticeItem noticeItem={{ title: '', url: '', createdAt: '' } as any} isFetching={true} />
              </>
            );
          }
          if (noticeData?.result?.length === 0) {
            return <Text className="text-disabledFont w-full text-center">공지사항이 없습니다.</Text>
          }
          if (isAxiosError(noticeError)) {
            return <Text className="text-disabledFont w-full text-center">공지사항을 불러오는 중 오류가 발생했습니다.</Text>
          }
          return noticeData?.result?.map((item, index) => (
            <NoticeItem key={index} noticeItem={item} isFetching={isNoticeFetching} />
          ))
        })()}
      </View>
      {/* 채팅 */}
      {/* <TextNextHeader
        title={
          <Text className="Semibold18 text-emphasizedFont">기숙사 채팅</Text>
        }
        handleMore={() => { }}
      /> */}
    </ScrollView >
  </>
  );
}
