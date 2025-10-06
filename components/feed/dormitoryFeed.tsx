import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { TextNextHeader } from '../common/textNextHeader';

export default function DormitoryFeed() {
  return <ScrollView className="flex-1 bg-[#F7FAFF] relative pt-6 gap-y-8">
    <TextNextHeader
      title={
        <Text className="Semibold18 text-emphasizedFont">오늘의 메뉴</Text>
      }
      handleMore={() => { }}
    />
    <TextNextHeader
      title={
        <Text className="Semibold18 text-emphasizedFont">공지사항</Text>
      }
      handleMore={() => { }}
    />
    <TextNextHeader
      title={
        <Text className="Semibold18 text-emphasizedFont">기숙사 채팅</Text>
      }
      handleMore={() => { }}
    />
  </ScrollView>;
}
