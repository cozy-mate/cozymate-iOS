import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useGetRuleList } from '@/hooks/rule/rule';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useHasRoomStore } from '@/zustand/room/room';

interface RuleComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RuleComponent: React.FC<RuleComponentProps> = ({ bottomSheetRef }) => {
  const { roomId } = useHasRoomStore();

  const { data } = useGetRuleList(roomId);

  const { setSelectedItem } = useSelectedItemStore();

  return (
    <View className="gap-y-[12px]">
      <View className="gap-y-0.5 mx-1">
        <Text className="text-18 font-600 leading-18 text-basicFont">
          <Text className="text-mainColor">{'피그말리온'}</Text>의
        </Text>
        <Text className="text-18 font-600 leading-18 text-basicFont">
          규칙에 대해 알려드릴게요!
        </Text>
      </View>

      {data.result.length !== 0 ? (
        <View className="p-2 pl-4 rounded-xl bg-white shadow-chipback gap-y-[4px]">
          {data.result.map((rule, index) => (
            <View key={rule.ruleId} className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-x-[8px]">
                <View className="w-6 h-6 rounded-full bg-colorBox flex items-center justify-center">
                  <Text className="text-12 font-500 leading-12 text-colorFont text-center">
                    {index + 1}
                  </Text>
                </View>
                <Text className="text-14 font-500 leading-12 text-basicFont">{rule.content}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setSelectedItem({ id: rule.ruleId, type: 'rule', content: rule.content });
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
        <View className="py-2 rounded-xl bg-white flex items-center justify-center h-36 shadow-chipback">
          <Text className="text-14 font-500 leading-14 text-disabledFont  text-center">
            등록된 규칙이 없어요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default RuleComponent;
