import { Fragment, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import ReportModalComponent from '@/components/common/reportModal';
import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const AdditionalInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data } = useGetMemberDetail(Number(id));

  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  return (
    <Fragment>
      <View className="px-[20px] gap-y-[12px]">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-16 font-600 leading-16 text-emphasizedFont ml-[4px]">
            하고싶은 말
          </Text>

          <Pressable onPress={() => setIsReportModalVisible(true)} className="py-[11.5px]">
            <Text className="text-12 font-500 leading-12 text-disabledFont underline">
              신고하기
            </Text>
          </Pressable>
        </View>

        <View className="p-4 rounded-xl border border-strokeColor">
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.selfIntroduction}
          </Text>
        </View>
      </View>

      <ReportModalComponent
        isVisible={isReportModalVisible}
        memberId={data.result.memberDetail.memberId}
        source="MEMBER_STAT"
        closeModal={() => setIsReportModalVisible(false)}
      />
    </Fragment>
  );
};

export default AdditionalInfoComponent;
