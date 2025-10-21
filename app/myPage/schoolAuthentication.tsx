import { Suspense } from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderPressBox from '@/components/common/borderComponent/borderPressBox';
import LoadingComponent from '@/components/common/loading';
import { useGetMemberUniversityInfo } from '@/hooks/member/member';

function SchoolAuthenticationComponent() {
  const { data } = useGetMemberUniversityInfo();

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] gap-y-[8px]">
      <BackHeaderComponent />

      <View className="gap-y-[16px] mt-[16px]">
        <BorderPressBox
          title="학교"
          value={data.result.universityName}
          placeholder=""
          onPress={() => {}}
          isFocused={true}
        />

        {/* <BorderPressBox
          title="학교 이메일"
          value={data.result.mailAddress}
          placeholder=""
          onPress={() => {}}
          isFocused={true}
        /> */}

        <BorderPressBox
          title="학과"
          value={data.result.majorName}
          placeholder=""
          onPress={() => {}}
          isFocused={true}
        />
      </View>
    </SafeAreaView>
  );
}

export default function SchoolAuthentication() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <SchoolAuthenticationComponent />
    </Suspense>
  );
}
