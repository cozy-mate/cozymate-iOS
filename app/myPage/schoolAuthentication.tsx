import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import UniversityComponent from '@/components/myPage/university';
import { useGetMemberUniversityInfo } from '@/hooks/member/member';

export default function SchoolAuthentication() {
  const { data } = useGetMemberUniversityInfo();

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] gap-y-[8px]">
      <BackHeaderComponent />

      <View className="gap-y-[16px]">
        <UniversityComponent title="학교" value={data.result.universityName} editable={false} />
        <UniversityComponent title="학교 이메일" value={data.result.mailAddress} editable={false} />
        <UniversityComponent title="학과" value={data.result.majorName} editable={false} />
      </View>
    </SafeAreaView>
  );
}
