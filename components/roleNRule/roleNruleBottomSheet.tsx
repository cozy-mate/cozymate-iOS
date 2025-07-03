import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import { useDeleteRole } from '@/hooks/role/role';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useDeleteRule } from '@/hooks/rule/rule';
import { useDeleteTodo } from '@/hooks/todo/todo';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';

import TwoButtonModal from '../modal/twoButtonModal';

interface RoleNRuleBottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RoleNRuleBottomSheetComponent: React.FC<RoleNRuleBottomSheetComponentProps> = ({
  bottomSheetRef,
}) => {
  const router = useRouter();

  const { data: hasRoom } = useCheckHasRoom();

  const { selectedItem } = useSelectedItemStore();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const { mutateAsync: deleteTodo } = useDeleteTodo(hasRoom.result.roomId, selectedItem.id);
  const { mutateAsync: deleteRole } = useDeleteRole(hasRoom.result.roomId, selectedItem.id);
  const { mutateAsync: deleteRule } = useDeleteRule(hasRoom.result.roomId, selectedItem.id);

  const handleDelete = () => {
    if (selectedItem.type === 'To-do') deleteTodo();
    else if (selectedItem.type === 'Role') deleteRole();
    else deleteRule();

    setIsDeleteModalVisible(false);
  };

  return (
    <Fragment>
      <BottomSheetView className="px-[20px] pt-[24px] pb-[50px] gap-y-[24px]">
        <Text className="Bold18 text-emphasizedFont text-center">‘ {selectedItem.content} ‘</Text>

        <View>
          <Pressable
            onPress={() => {
              bottomSheetRef.current?.close();
              router.push(`/roleNRule/update/${selectedItem.type}`);
            }}
            className="py-[11.5px]"
          >
            <Text className="Medium16 text-basicFont mx-[4px]">수정하기</Text>
          </Pressable>

          <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />

          <Pressable
            onPress={() => {
              bottomSheetRef.current?.close();
              setIsDeleteModalVisible(true);
            }}
            className="py-[11.5px]"
          >
            <Text className="Medium16 text-basicFont mx-[4px]">삭제하기</Text>
          </Pressable>
        </View>
      </BottomSheetView>

      <TwoButtonModal
        isVisible={isDeleteModalVisible}
        title="삭제하시겠습니까?"
        closeFunc={() => setIsDeleteModalVisible(false)}
        leftButtonText="취소"
        leftButtonFunc={() => setIsDeleteModalVisible(false)}
        rightButtonText="삭제"
        rightButtonFunc={handleDelete}
      />
    </Fragment>
  );
};

export default RoleNRuleBottomSheetComponent;
