import { Fragment, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import WhiteXIcon from '@/assets/images/common/whiteX.svg';
import MemberStatModalComponent from '@/components/roomDetail/memberStatModal';
import { useGetRoomMemberStats } from '@/hooks/room-member-stat/room-member-stat';
import { useTracker } from '@/providers/TrackerProvider';
import { ChipItem, RoomItem } from '@/type/room';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { getLifeStyleLabel } from '@/utils/lifeStyle';
import { closeTooltip, getTooltip, setTooltip } from '@/utils/tooltip';

interface MateLifeStyleComponentProps {
  data: RoomItem;
}

const MateLifeStyleComponent: React.FC<MateLifeStyleComponentProps> = ({ data }) => {
  const [isMemberStatModalOpen, setIsMemberStatModalOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const { trackButton } = useTracker();

  const [statItem, setStatItem] = useState<ChipItem>({
    title: '',
    memberList: [],
    color: '',
  });
  const { mutateAsync: getStats } = useGetRoomMemberStats();

  const handleStat = async (memberStatKey: string) => {
    const response = await getStats({ roomId: Number(data.roomId), memberStatKey });
    // TODO : Member Stat Key를 타입으로 고정
    const buttonEventKey = `chip_${memberStatKey}` as keyof typeof ButtonEvent;
    trackButton(ButtonEvent[buttonEventKey], EventCategory.content_room, {
      roomId: Number(data.roomId),
      chip: ButtonEvent[buttonEventKey],
    });
    setStatItem({
      title: getLifeStyleLabel(memberStatKey),
      memberList: response.result.memberList,
      color: response.result.color,
    });

    setIsMemberStatModalOpen(true);
  };

  useEffect(() => {
    const handleToolTip = async () => {
      const tooltip = await getTooltip();
      if (tooltip === 'TRUE' || tooltip === null) {
        setIsTooltipOpen(true);
      } else {
        setIsTooltipOpen(false);
      }
    };

    handleToolTip();
  }, []);

  return (
    <Fragment>
      <View className="px-[20px] gap-y-[12px]">
        <Text className="Semibold16 text-emphasizedFont">룸메이트 라이프스타일 한 눈에 보기</Text>

        <View className="flex flex-row flex-wrap gap-[8px]">
          {data.difference.blue.map((chip, index) => (
            <Pressable
              key={index}
              onPress={() => handleStat(chip)}
              className="px-[14px] py-[8px] rounded-full border border-mainColor bg-subColor1"
            >
              <Text className="Semibold12 text-mainColor">{getLifeStyleLabel(chip)}</Text>
            </Pressable>
          ))}

          {data.difference.red.map((chip, index) => (
            <Pressable
              key={index}
              onPress={() => handleStat(chip)}
              className="px-[14px] py-[8px] rounded-full border border-warningColor bg-warningSubColor"
            >
              <Text className="Semibold12 text-warningColor">{getLifeStyleLabel(chip)}</Text>
            </Pressable>
          ))}

          {data.difference.white.map((chip, index) => (
            <Pressable
              key={index}
              onPress={() => handleStat(chip)}
              className="px-[14px] py-[8px] rounded-full border border-transparent bg-white shadow-chipback"
            >
              <Text className="Medium12 text-disabledFont">{getLifeStyleLabel(chip)}</Text>
            </Pressable>
          ))}

          {/* 툴팁 */}
          {isTooltipOpen && (
            <View style={{ position: 'absolute', left: 40, top: 40, borderBottomColor: '#51555C' }}>
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 6,
                  borderRightWidth: 6,
                  borderBottomWidth: 8,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#51555C',
                  position: 'absolute',
                  top: -6,
                  left: 16,
                }}
              />
              <Pressable
                onPress={async () => {
                  setIsTooltipOpen(false);
                  await closeTooltip();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#51555C',
                  padding: 8,
                  paddingLeft: 16,
                  borderRadius: 20,
                }}
              >
                <Text className="Medium12 text-white">
                  칩을 선택하면 룸메이트 간의{'\n'}라이프스타일 답변을 비교할 수 있어요!
                </Text>
                <View className="p-[11px]">
                  <WhiteXIcon />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <MemberStatModalComponent
        isVisible={isMemberStatModalOpen}
        closeModal={() => setIsMemberStatModalOpen(false)}
        item={statItem}
      />
    </Fragment>
  );
};

export default MateLifeStyleComponent;
