import { Fragment, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import ReportModalComponent from '@/components/common/reportModal';
import { UserDetailComponentProps } from '@/type/member-stat';

const AdditionalInfoComponent: React.FC<UserDetailComponentProps> = ({ data }) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  return (
    <Fragment>
      <View className="px-[20px] gap-y-[12px]">
        <View className="flex flex-row justify-between items-center">
          <Text className="Semibold16 text-emphasizedFont ml-[4px]">하고싶은 말</Text>

          <Pressable onPress={() => setIsReportModalVisible(true)} className="py-[11.5px]">
            <Text className="Medium12 text-disabledFont underline">신고하기</Text>
          </Pressable>
        </View>

        <View className="p-[16px] rounded-xl border border-strokeColor">
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.selfIntroduction}</Text>
        </View>
      </View>

      <ReportModalComponent
        isVisible={isReportModalVisible}
        memberId={data.memberDetail.memberId}
        source="MEMBER_STAT"
        closeModal={() => setIsReportModalVisible(false)}
      />
    </Fragment>
  );
};

export default AdditionalInfoComponent;
