import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, Suspense, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/common/background.svg';
import ChatIcon from '@/assets/images/common/chat.svg';
import FilledHeartIcon from '@/assets/images/common/filledHeart.svg';
import HeartIcon from '@/assets/images/common/heart.svg';
import SelectedListIcon from '@/assets/images/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@/assets/images/userDetail/coloredTableIcon.svg';
import ListIcon from '@/assets/images/userDetail/listIcon.svg';
import TableIcon from '@/assets/images/userDetail/tableIcon.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import TwoButtonModal from '@/components/common/twoButtonModal';
import AdditionalInfoComponent from '@/components/userDetail/additionalInfo';
import BasicInfoComponent from '@/components/userDetail/basicInfo';
import DormitoryInfoComponent from '@/components/userDetail/dormitoryInfo';
import EssentialInfoComponent from '@/components/userDetail/essentialInfo';
import TableInfoComponent from '@/components/userDetail/tableInfo';
import { getPersona } from '@/constants/items/characterItem';
import { useCreateMemberLike, useDeleteMemberLike } from '@/hooks/member-favorite/member-favorite';
import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';
import {
  useCancelInviteMember,
  useCheckIsInvitedMember,
  useCheckIsRequestedMember,
  useInviteMember,
} from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';

export default function UserDetail() {
  const { id } = useLocalSearchParams();

  const { memberState } = useMemberStore();

  const router = useRouter();

  const { data, refetch } = useGetMemberDetail(Number(id));
  const { data: isInvited } = useCheckIsInvitedMember(Number(id));
  const { data: isRequested } = useCheckIsRequestedMember(Number(id));

  const [type, setType] = useState<string>('LIST');

  const { mutateAsync: deleteLike } = useDeleteMemberLike(data.result.favoriteId, refetch);
  const { mutateAsync: createLike } = useCreateMemberLike(
    data.result.memberDetail.memberId,
    refetch,
  );

  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);

  const { mutateAsync: inviteMember } = useInviteMember(
    Number(id),
    data.result.memberDetail.nickname,
    setIsCreateRoomModalOpen,
  );
  const { mutateAsync: cancelInvite } = useCancelInviteMember(Number(id));

  return (
    <Suspense>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-subColor1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, rowGap: 20, paddingBottom: 60 }}
          bounces={false}
        >
          <View className="px-[20px] gap-y-5">
            <Background style={{ position: 'absolute' }} />

            <BackHeaderComponent>
              <View className="flex flex-row items-center gap-x-[4px]">
                <Pressable
                  onPress={() =>
                    router.push(
                      `/chat/send/${Number(id)}?nickname=${encodeURIComponent(data.result.memberDetail.nickname)}`,
                    )
                  }
                  className="pl-[14px] pr-[8px] py-[11px]"
                >
                  <ChatIcon />
                </Pressable>
                {data.result.favoriteId !== 0 ? (
                  <Pressable onPress={() => deleteLike()} className="p-[8px]">
                    <FilledHeartIcon />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => createLike()} className="p-[8px]">
                    <HeartIcon />
                  </Pressable>
                )}
              </View>
            </BackHeaderComponent>

            <View className="flex flex-row items-center gap-x-[8px]">
              {getPersona(data.result.memberDetail.persona, 40, 40)}
              <View className="gap-y-1">
                <Text className="text-16 font-600 text-emphasizedFont">
                  {data.result.memberDetail.nickname}
                </Text>
                {Number(id) !== memberState.memberId && (
                  <Text className="text-14 font-500 text-basicFont">
                    나와의 일치율 {data.result.equality ?? '??'}%
                  </Text>
                )}
              </View>
            </View>

            {data.result.roomId !== 0 ? (
              <Pressable
                onPress={() => router.push(`/room/${data.result.roomId}`)}
                className="bg-mainColor rounded-xl border border-mainColor p-3"
              >
                <Text className="text-14 font-600 text-white text-center">
                  {data.result.memberDetail.nickname}님이 속한 방 바로 가기
                </Text>
              </Pressable>
            ) : (
              <View className="bg-colorBox rounded-xl border border-disabledFont p-3">
                <Text className="text-14 font-600 text-disabledFont text-center">
                  {data.result.memberDetail.nickname}님은 아직 속한 방이 없어요
                </Text>
              </View>
            )}
          </View>

          <View className="bg-white gap-y-[16px] flex-1 pt-3 rounded-t-[20px] pb-[68px]">
            <View className="flex flex-row justify-center items-center">
              <Pressable
                onPress={() => setType('LIST')}
                className="flex flex-row items-center gap-x-[6px] p-[16px]"
              >
                {type === 'LIST' ? <SelectedListIcon /> : <ListIcon />}
                <Text
                  className={`text-14 ${type === 'LIST' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  리스트로 보기
                </Text>
              </Pressable>

              <View className="h-[24px] w-[1px] mx-[18px] bg-disabledColor" />

              <Pressable
                onPress={() => setType('TABLE')}
                className="flex flex-row items-center gap-x-[6px] p-[16px]"
              >
                {type === 'TABLE' ? <SelectedTableIcon /> : <TableIcon />}
                <Text
                  className={`text-14 ${type === 'TABLE' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  표로 보기
                </Text>
              </Pressable>
            </View>

            <View className="gap-y-14">
              {type === 'LIST' ? (
                <Fragment>
                  <BasicInfoComponent id={Number(id)} />
                  <DormitoryInfoComponent id={Number(id)} />
                  <EssentialInfoComponent id={Number(id)} />
                </Fragment>
              ) : (
                <TableInfoComponent id={Number(id)} />
              )}
              <AdditionalInfoComponent id={Number(id)} />
            </View>
          </View>
        </ScrollView>

        <TwoButtonModal
          isVisible={isCreateRoomModalOpen}
          title={`${data.result.memberDetail.nickname}님을 초대할 방이 없어요,\n방을 만드시겠어요?`}
          closeFunc={() => setIsCreateRoomModalOpen(false)}
          leftButtonText="아니오"
          leftButtonFunc={() => setIsCreateRoomModalOpen(false)}
          rightButtonText="예"
          rightButtonFunc={() => {
            setIsCreateRoomModalOpen(false);
            router.push('/room/createRoom');
          }}
        />

        {Number(id) !== memberState.memberId && (
          <View className="absolute bottom-0 w-full px-[22px] pb-[42px] bg-white">
            {/* 해당 사용자를 초대함 => 초대 취소하기 */}
            {isInvited?.result && (
              <BottomButton
                buttonText="초대 취소하기"
                disabled={false}
                onPress={() => cancelInvite()}
                backColor="bg-colorBox"
                borderColor="border-mainColor"
                textColor="text-mainColor"
              />
            )}

            {/* 해당 사용자가 방 참여 요청을 보냄 => 수락/거절 */}
            {isRequested?.result && (
              <View className="gap-x-[8px] flex flex-row items-center">
                <Pressable className="bg-white border border-mainColor rounded-xl p-[16px] flex-1">
                  <Text className="text-16 font-600 leading-16 text-mainColor text-center">
                    거절
                  </Text>
                </Pressable>
                <Pressable className="bg-mainColor border border-mainColor rounded-xl p-[16px] flex-1">
                  <Text className="text-16 font-600 leading-16 text-white text-center">수락</Text>
                </Pressable>
              </View>
            )}

            {!isRequested?.result && !isInvited?.result && (
              <BottomButton
                buttonText="내 방으로 초대하기"
                disabled={false}
                onPress={() => inviteMember()}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </Suspense>
  );
}
