import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderDateBox from '@/components/common/borderDateBox';
import BorderPressBox from '@/components/common/borderPressBox';
import BorderTextButtonBox from '@/components/common/borderTextButtonBox';
import BottomButton from '@/components/common/bottomButton';
import MajorSelectModalComponent from '@/components/onBoard/majorSelectModal';
import { useCheckNickname, useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';

export default function UpdateInfo() {
  const { type } = useLocalSearchParams();

  const { data } = useGetMemberProfile();

  const { mutateAsync: checkNickname } = useCheckNickname();

  const [nickname, setNickname] = useState<string>(data.result.nickname);
  const [majorName, setMajorName] = useState<string>(data.result.majorName);
  const [birthday, setBirthday] = useState<string>(data.result.birthday);

  const [isMajorSelectModalOpen, setIsMajorSelectModalOpen] = useState<boolean>(false);

  const handleMajor = (major: string) => {
    setMajorName(major);

    setIsMajorSelectModalOpen(false);
  };

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[20px]">
        <BackHeaderComponent />

        {type === 'nickname' && (
          <BorderTextButtonBox
            title="닉네임"
            value={nickname}
            handleValue={(e: string) => setNickname(e)}
            placeholder="닉네임을 입력해주세요"
            buttonText="중복 확인"
            buttonPress={() => checkNickname(nickname)}
            canPress={nickname !== ''}
            errorMessage="다른 사용자가 이미 사용 중인 닉네임이에요!"
          />
        )}

        {type === 'majorName' && (
          <>
            <BorderPressBox
              title="학과"
              value={majorName}
              placeholder="학과를 선택해주세요"
              onPress={() => setIsMajorSelectModalOpen(true)}
            />

            <MajorSelectModalComponent
              isVisible={isMajorSelectModalOpen}
              universityId={data.result.universityId}
              handleValue={handleMajor}
              closeModal={() => setIsMajorSelectModalOpen(false)}
            />
          </>
        )}

        {type === 'birthday' && (
          <BorderDateBox
            title="생년월일"
            value={birthday}
            handleValue={(e: string) => setBirthday(e)}
          />
        )}
      </View>

      <View className="absolute bottom-0 pb-[42px] w-full px-[22px] bg-white">
        <BottomButton
          buttonText="수정"
          disabled={
            (type === 'nickname' && nickname.trim() === '') ||
            (type === 'majorName' && majorName.trim() === '') ||
            (type === 'birthday' && birthday.trim() === '')
          }
          onPress={() =>
            updateInfo({
              nickname: nickname,
              majorName: majorName,
              birthday: birthday,
              persona: data.result.persona,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
