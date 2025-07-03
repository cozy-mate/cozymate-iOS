import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useGetReceivedRequestList } from '@/hooks/room/roomManager';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';

import SimpleUserItem from '../common/userItem/simpleUserItem';

const ReceivedRequestComponent: React.FC = () => {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { data: hasRoom } = useCheckHasRoom();

  const { data } = useGetReceivedRequestList(hasRoom.result.isRoomManager);

  const handleMore = () => {
    trackButton(ButtonEvent.request_more, EventCategory.home_content);
    router.push('/user/receivedRequest');
  };

  const handleUserPress = (memberId: number) => {
    trackButton(ButtonEvent.request_component, EventCategory.home_content, {
      memberId,
    });
  };

  return (
    hasRoom.result.roomId !== 0 &&
    hasRoom.result.isRoomManager && (
      <View>
        <View className="gap-y-[16px] px-[20px]">
          <View className="flex flex-row justify-between items-center">
            <View className="gap-y-[4px] ml-[4px]">
              <Text
                className={`Semibold18 ${data?.result.length !== 0 ? 'text-emphasizedFont' : 'text-colorFont'} `}
              >
                {data?.result.length ?? 0}개의
              </Text>
              <Text className="Semibold18 text-emphasizedFont">방 참여 요청이 도착했어요</Text>
            </View>

            <Pressable onPress={handleMore}>
              <View className="flex flex-row items-center gap-x-[4px]">
                <Text className="Semibold12 text-disabledFont">더보기</Text>
                <GrayArrowIcon />
              </View>
            </Pressable>
          </View>

          {data?.result.length !== 0 ? (
            data?.result.map((member) => (
              <SimpleUserItem key={member.memberId} userData={member} onPress={handleUserPress} />
            ))
          ) : (
            <View className="mt-[32px] mb-[24px]">
              <Text className="Medium14 text-disabledFont text-center pt-[8px]">
                직접 룸메이트를 찾으러 가볼까요?
              </Text>
              <Pressable
                onPress={() => router.push('/user/roomMate')}
                className="p-[8px] gap-x-[8px] flex flex-row justify-center items-center"
              >
                <Text className="Semibold16 text-mainColor text-center">룸메이트 찾으러 가기</Text>
                <BlueRightArrowIcon />
              </Pressable>
            </View>
          )}
        </View>

        <View className="bg-[#F7F9FA] w-full h-[10px] mt-[24px]" />
      </View>
    )
  );
};

export default ReceivedRequestComponent;
