import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { useGetReceivedRequestList } from '@/hooks/room/room';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';

const ReceivedRequestComponent: React.FC = () => {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { data } = useGetReceivedRequestList();

  const handleMore = () => {
    trackButton(ButtonEvent.request_more, EventCategory.home_content, {
      category: 'home_content',
      button: 'request_more',
    });
    router.push('/user/receivedRequest');
  };

  const handleUserPress = (memberId: number) => {
    trackButton(ButtonEvent.request_component, EventCategory.home_content, {
      category: 'home_content',
      button: 'request_component',
    });
    router.push(`/user/${memberId}`);
  };

  return (
    <View className="gap-y-[16px] px-[20px]">
      <View className="flex flex-row justify-between items-center">
        <View className="gap-y-[4px] ml-[4px]">
          <Text className="text-18 font-600 text-emphasizedFont">{data?.result.length}개의</Text>
          <Text className="text-18 font-600 text-emphasizedFont">방 참여 요청이 도착했어요</Text>
        </View>

        <Pressable onPress={handleMore}>
          <View className="flex flex-row items-center gap-x-[4px]">
            <Text className="text-12 font-600 leading-12 text-disabledFont">더보기</Text>
            <GrayArrowIcon />
          </View>
        </Pressable>
      </View>

      {data?.result.length !== 0 ? (
        data?.result.map((member) => (
          <Pressable
            key={member.memberId}
            onPress={() => handleUserPress(member.memberId)}
            className="px-[16px] py-[20px] flex flex-row justify-between items-center border border-disabledColor rounded-xl"
          >
            <Text className="text-16 font-600 leading-16 text-basicFont mx-[8px]">
              {member.nickname}
            </Text>

            <Text className="text-16 font-500 leading-16 text-mainColor">
              {member.mateEquality}%
            </Text>
          </Pressable>
        ))
      ) : (
        <View className="mt-[32px] mb-[24px]">
          <Text className="text-14 font-500 text-disabledFont text-center pt-[8px]">
            직접 룸메이트를 찾으러 가볼까요?
          </Text>
          <Pressable
            onPress={() => router.push('/user/roomMate')}
            className="p-[8px] gap-x-[8px] flex flex-row justify-center items-center"
          >
            <Text className="text-16 font-600 text-mainColor text-center">
              룸메이트 찾으러 가기
            </Text>
            <BlueRightArrowIcon />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReceivedRequestComponent;
