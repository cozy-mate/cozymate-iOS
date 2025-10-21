import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import OpacityPressable from '@/components/opacityPressable';
import { useUpdateRole } from '@/hooks/role/role';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { MateDetail } from '@/type/room';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

const items = ['월', '화', '수', '목', '금', '토', '일'];

type MateIdName = {
  mateId: number;
  nickname: string;
};

export default function UpdateRoleScene() {
  const { roomInfo } = useMemberStore();

  const { selectedItem } = useSelectedItemStore();

  const { mutateAsync: updateRole } = useUpdateRole({
    roomId: roomInfo.roomId,
    roleId: selectedItem.id,
  });

  const [content, setContent] = useState<string>(selectedItem.content);
  const [mateIdNameList, setMateIdNameList] = useState<MateIdName[]>(selectedItem.mateIdNameList);
  const [repeatDayList, setRepeatDayList] = useState<string[] | null>(selectedItem.repeatDayList);

  const { data: memberList, isLoading } = useGetMyRoomDetail(roomInfo.roomId);

  const mateToggleSelection = (item: MateDetail) => {
    const exists = mateIdNameList.some((v) => v.mateId === item.mateId);
    const updatedValue = exists
      ? mateIdNameList.filter((v) => v.mateId !== item.mateId)
      : [...mateIdNameList, { mateId: item.mateId, nickname: item.nickname }];
    setMateIdNameList(updatedValue);
  };

  const mateToggleAll = () => {
    if (mateIdNameList.length === memberList?.result.mateDetailList.length) {
      setMateIdNameList([]);
    } else {
      setMateIdNameList(
        memberList?.result.mateDetailList.map((item) => ({
          mateId: item.mateId,
          nickname: item.nickname,
        })) || [],
      );
    }
  };

  const dayToggleSelection = (itemValue: string) => {
    if (repeatDayList === null) {
      setRepeatDayList([itemValue]);
      return;
    }

    if (repeatDayList.includes(itemValue)) {
      const updatedValue = repeatDayList.filter((v) => v !== itemValue);
      setRepeatDayList(updatedValue.length === 0 ? null : updatedValue);
    } else {
      setRepeatDayList([...repeatDayList, itemValue]);
    }
  };

  const dayToggleAll = () => {
    if (repeatDayList === null || repeatDayList.length > 0) {
      setRepeatDayList([]);
    } else {
      setRepeatDayList(null);
    }
  };

  const isReady = !isLoading && memberList !== undefined;

  // 역할, 담당자, 정해진 요일이 모두 입력된 경우
  const isComplete = content !== '' && mateIdNameList.length > 0 && repeatDayList !== null;

  return (
    <View className="flex-1">
      {!isReady ? (
        <View className="flex-grow justify-center items-center">
          <LottieView
            source={require('@/assets/lotties/cozymateLoading.json')}
            style={{ width: 76, height: 94.24 }}
            loop={true}
          />
        </View>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 24,
            paddingHorizontal: 20,
            paddingBottom: 80,
            rowGap: 48,
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <CustomTextInput
            title="할 일을 입력해주세요"
            value={content}
            handleValue={setContent}
            placeholder="할 일을 입력해주세요"
            maxLength={20}
          />

          <View className="gap-y-[12px]">
            <Text className="Semibold16 text-emphasizedFont mx-[4px]">담당자를 선택해주세요</Text>
            <View className="gap-y-[8px]">
              <View className="flex flex-row flex-wrap gap-[8px]">
                {memberList.result.mateDetailList.map((item) => (
                  <Pressable
                    key={item.mateId}
                    onPress={() => mateToggleSelection(item)}
                    className={`px-[20px] py-[10px] rounded-md ${mateIdNameList.some((v) => v.mateId === item.mateId) ? 'bg-subColor1' : 'bg-colorBox'}`}
                  >
                    <Text
                      className={`${mateIdNameList.some((v) => v.mateId === item.mateId) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
                    >
                      {item.nickname}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="flex flex-row items-center">
                <Pressable onPress={mateToggleAll} className="p-[8px]">
                  {mateIdNameList.length === memberList.result.mateDetailList.length ? (
                    <CheckBoxIcon />
                  ) : (
                    <NotCheckBoxIcon />
                  )}
                </Pressable>

                <Text className="Medium14 text-disabledFont">모두</Text>
              </View>
            </View>
          </View>

          <View className="gap-y-[12px]">
            <Text className="Semibold16 text-emphasizedFont mx-[4px]">날짜를 선택해주세요</Text>
            <View className="gap-y-[8px]">
              <View className="flex flex-row flex-wrap gap-[8px]">
                {items.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => dayToggleSelection(item)}
                    className={`w-[32px] h-[32px] m-[4px] flex items-center justify-center rounded-full ${repeatDayList !== null && repeatDayList.includes(item) ? 'bg-subColor1' : 'bg-colorBox'}`}
                  >
                    <Text
                      className={`${repeatDayList !== null && repeatDayList.includes(item) ? 'Semibold12 text-mainColor' : 'Medium12 text-disabledFont'}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="flex flex-row items-center">
                <Pressable onPress={dayToggleAll} className="p-[8px]">
                  {repeatDayList !== null && repeatDayList.length === 0 ? (
                    <CheckBoxIcon />
                  ) : (
                    <NotCheckBoxIcon />
                  )}
                </Pressable>

                <Text className="Medium14 text-disabledFont">정해진 요일이 없어요</Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}

      <OpacityPressable
        onPress={() => updateRole({ content, mateIdNameList, repeatDayList })}
        disabled={!isComplete}
        className={`${
          isComplete ? 'bg-mainColor' : 'bg-[#C4C4C4]'
        } py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
      >
        <Text className="Semibold16 text-white text-center">확인</Text>
      </OpacityPressable>
    </View>
  );
}
