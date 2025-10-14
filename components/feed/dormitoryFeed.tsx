import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import { useGetDormitoryMenuAndNotice } from '@/hooks/dormitory/dormitory';
import { Menu, MenuTimeKey } from '@/server/dormitory/response';

import MenuItem from '../common/dormitoryItem/menuItem';
import NoticeItem from '../common/dormitoryItem/noticeItem';
import { TextNextHeader } from '../common/textNextHeader';

export default function DormitoryFeed() {

  const [menuData, noticeData] = useGetDormitoryMenuAndNotice();

  const progress = useSharedValue<number>(0);

  const menuItems = Object.entries(menuData.data?.result ?? {}).map(([key, value]) => [key as MenuTimeKey, value]) as [MenuTimeKey, Menu][];

  console.log(menuItems);
  return (<>
    <ScrollView className="flex-1 bg-[#F7FAFF] relative pt-6">
      <TextNextHeader
        title={
          <Text className="Semibold18 text-emphasizedFont">오늘의 메뉴</Text>
        }
        className='mb-4'
        handleMore={() => { }}
      />
      <>
        <Carousel
          width={Dimensions.get('window').width}
          containerStyle={{
            height: 110,
          }}
          loop={true}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlay={false}
          onProgressChange={progress}
          data={menuItems ?? []}
          renderItem={({ item }) => <MenuItem menuItem={item} />}
          onSnapToItem={(index) => {
            progress.value = index;
          }}
        />
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
        handleMore={() => { }}
      />
      <View className="flex flex-col gap-y-[12px]">
        {noticeData.data?.result.map((item) => (
          <NoticeItem key={item.title} noticeItem={item} />
        ))
        }
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
