import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import SettingIcon from '@/assets/icons/setting.svg';
import { useCheckHasRoom, useGetMyRoomDetail } from '@/hooks/room/room';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';

type RuleItem = {
  ruleId: number;
  content: string;
  memo: string;
};

interface RuleContainerProps {
  data: RuleItem[] | undefined;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RuleContainer: React.FC<RuleContainerProps> = ({ data, bottomSheetRef }) => {
  const { data: hasRoom } = useCheckHasRoom();

  const { data: roomData } = useGetMyRoomDetail(hasRoom.result.roomId);

  const { setSelectedItem } = useSelectedItemStore();

  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold18 text-basicFont">
        <Text className="text-mainColor">{roomData?.result.name}</Text>의{'\n'}규칙에 대해
        알려드릴게요!
      </Text>

      {data !== undefined && data.length !== 0 ? (
        <View className="p-[8px] pl-[16px] rounded-xl bg-white shadow-chipback">
          {data.map((rule, index) => (
            <View
              key={rule.ruleId}
              className="flex flex-row items-start justify-between gap-x-[6px]"
            >
              <View className="flex flex-row items-center gap-x-[8px] mt-[8px]">
                <View className="w-[24px] h-[24px] rounded-full bg-colorBox flex items-center justify-center">
                  <Text className="Medium12 text-colorFont text-center">{index + 1}</Text>
                </View>
              </View>

              <View className="flex-1 mt-[8px]">
                <Text className="Medium14 text-basicFont my-[3.5px]">{rule.content}</Text>

                {rule.memo !== '' && (
                  <Text className="Medium10 text-disabledFont mt-[2px]">{rule.memo}</Text>
                )}
              </View>

              <Pressable
                onPress={() => {
                  setSelectedItem((prev) => ({
                    ...prev,
                    id: rule.ruleId,
                    type: 'Rule',
                    content: rule.content,
                    ruleItem: rule,
                  }));
                  bottomSheetRef.current?.expand();
                }}
                className="p-[8px]"
              >
                <SettingIcon />
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View className="bg-white h-[144px] flex items-center justify-center rounded-xl shadow-chipback">
          <Text className="Medium14 text-disabledFont text-center">등록된 규칙이 없어요!</Text>
        </View>
      )}
    </View>
  );
};

export default RuleContainer;
