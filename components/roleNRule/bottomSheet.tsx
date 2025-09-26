import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Fragment, RefObject, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import { DeleteAxiosInstance } from '@/axios/axios.method';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

import TwoButtonModal from '../modal/twoButtonModal';
import { queries } from '@/server/index';

async function deleteItem({
  roomId,
  type,
  itemId,
}: {
  roomId: number;
  type: 'todos' | 'rules' | 'roles';
  itemId: number;
}) {
  return DeleteAxiosInstance(`/rooms/${roomId}/${type}/${itemId}`);
}

const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`/rooms/${variables.roomId}/${variables.type}`],
      });
    },
  });
};

interface RoleNRuleBottomSheetProps {
  type: 'todos' | 'roles' | 'rules';
  bottomSheetRef: RefObject<BottomSheet>;
}

const typeMap = {
  todos: 0,
  roles: 1,
  rules: 2,
};

export default function RoleNRuleBottomSheet({ type, bottomSheetRef }: RoleNRuleBottomSheetProps) {
  const router = useRouter();

  const { roomInfo } = useMemberStore();

  const { selectedItem } = useSelectedItemStore();
  const { mutateAsync: deleteItem } = useDeleteItem();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  return (
    <Fragment>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[216]}
          index={-1}
          enablePanDownToClose={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            // onPress={backdropFunc}
            />
          )}
        >
          <BottomSheetView className="px-[20px] pt-[24px] pb-[50px] gap-y-[24px]">
            <Text className="Bold18 text-emphasizedFont text-center">
              ‘ {selectedItem.content} ‘
            </Text>

            <View>
              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                  router.push(`/roleNRule/update?type=${typeMap[type]}`);
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
        </BottomSheet>
      </Portal>

      <TwoButtonModal
        isVisible={isDeleteModalVisible}
        title="삭제하시겠습니까?"
        closeFunc={() => setIsDeleteModalVisible(false)}
        leftButtonText="취소"
        leftButtonFunc={() => setIsDeleteModalVisible(false)}
        rightButtonText="삭제"
        rightButtonFunc={() =>
          deleteItem({ roomId: roomInfo?.roomId ?? 0, type, itemId: selectedItem.id })
        }
      />
    </Fragment>
  );
}
