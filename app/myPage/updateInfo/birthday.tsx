import { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderPressBox from '@/components/common/borderComponent/borderPressBox';
import { useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';
import BottomButtonComponent from '@/components/common/bottomButton';

export default function BirthdayUpdate() {
  const { data } = useGetMemberProfile();

  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  const [birthday, setBirthday] = useState<string>(data.result.birthday);

  const handleBirthday = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    setIsDateModalOpen(false);
    setBirthday(formattedDateForStorage);
  };

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  const formatDate = (dateString: string): string => {
    if (dateString === '') {
      return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[20px] gap-y-[20px]">
        <BackHeaderComponent />

        <BorderPressBox
          title="생년월일"
          value={formatDate(birthday)}
          placeholder="생일을 선택해주세요"
          onPress={() => setIsDateModalOpen(true)}
          hasArrow={true}
        />
      </View>

      <BottomButtonComponent
        buttonText="수정"
        onPress={() => updateInfo({ ...data.result, birthday: birthday })}
        color={birthday === '' ? 'GRAY' : 'BLUE'}
        disabled={birthday === ''}
      />

      <DateTimePickerModal
        isVisible={isDateModalOpen}
        mode="date"
        onConfirm={handleBirthday}
        onCancel={() => setIsDateModalOpen(false)}
        locale="ko-KR"
      />
    </SafeAreaView>
  );
}
