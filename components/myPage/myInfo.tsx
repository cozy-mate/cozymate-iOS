import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';
import PersonaSelectComponent from '@/components/common/personaSelect';
import { getPersona } from '@/constants/items/characterItem';
import { useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';

const MyInfoComponent: React.FC = () => {
  const router = useRouter();

  const { data } = useGetMemberProfile();

  const [persona, setPersona] = useState<number>(data.result.persona);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState<boolean>(false);

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <View className="flex flex-col items-center gap-y-[32px]">
      <View className="relative h-[120px] w-[120px] overflow-hidden rounded-[60px]">
        {getPersona(data.result.persona, 120, 120)}
        <Pressable
          onPress={() => setIsPersonaModalOpen(true)}
          className="absolute bottom-0 flex h-[32px] w-[120px] items-center justify-center overflow-hidden rounded-b-[32px] bg-updateButtonBack"
        >
          <Text className="text-12 font-600 text-white text-center">수정</Text>
        </Pressable>
      </View>

      <View className="border border-[#F1F2F4] rounded-xl p-[16px] w-full">
        <Pressable
          onPress={() => router.push('/myPage/updateInfo/nickname')}
          className="flex flex-row justify-between items-center pb-[12px] border-b border-b-[#F1F2F4]"
        >
          <View className="flex flex-row gap-x-[8px] items-center">
            <Text className="text-14 font-500 leading-14 text-disabledFont ml-1">닉네임</Text>
            <Text className="text-14 font-500 leading-14 text-emphasizedFont">
              {data.result.nickname}
            </Text>
          </View>
          <GrayArrow />
        </Pressable>

        <Pressable
          onPress={() => router.push('/myPage/updateInfo/birthday')}
          className="flex flex-row justify-between items-center pt-[12px]"
        >
          <View className="flex flex-row gap-x-[8px] items-center">
            <Text className="text-14 font-500 leading-14 text-disabledFont ml-1">생년월일</Text>
            <Text className="text-14 font-500 leading-14 text-emphasizedFont">
              {formatDate(data.result.birthday)}
            </Text>
          </View>

          <GrayArrow />
        </Pressable>
      </View>

      <PersonaSelectComponent
        isVisible={isPersonaModalOpen}
        close={() => setIsPersonaModalOpen(false)}
        value={persona}
        handleValue={(persona: number) => setPersona(persona)}
        onPress={() =>
          updateInfo({
            nickname: data.result.nickname,
            majorName: data.result.majorName,
            birthday: data.result.birthday,
            persona: persona,
          })
        }
      />
    </View>
  );
};

export default MyInfoComponent;
