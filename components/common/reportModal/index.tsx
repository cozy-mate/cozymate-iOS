import { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedRadioIcon from '@/assets/images/room/selectedRadio.svg';
import { useCreateReport } from '@/hooks/report/report';

import LoadingComponent from '../loading';

interface ReasonItem {
  index: number;
  title: string;
  value: string;
  selected: boolean;
}

interface ReportModalProps {
  isVisible: boolean;
  memberId: number;
  source: string;
  closeModal: any;
}

const ReportModalComponent: React.FC<ReportModalProps> = ({
  isVisible,
  memberId,
  source,
  closeModal,
}) => {
  const [reason, setReason] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [reasonItems, setReasonItems] = useState<ReasonItem[]>([
    { index: 1, title: '음란성/선정성', value: 'OBSCENITY', selected: false },
    { index: 2, title: '욕설/인신공격', value: 'INSULT', selected: false },
    { index: 3, title: '영리목적/홍보성', value: 'COMMERCIAL', selected: false },
    { index: 4, title: '기타', value: 'OTHER', selected: false },
  ]);

  const handleItem = (item: ReasonItem) => {
    setReason(item.value);
    setReasonItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.index === item.index
          ? { ...prevItem, selected: true }
          : { ...prevItem, selected: false },
      ),
    );
  };

  const canSubmit = reason !== '' && (reason !== 'OTHER' || content !== '');

  const { mutateAsync: createReport, isPending } = useCreateReport(closeModal);

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      {isPending && <LoadingComponent />}
      <View
        onTouchEnd={closeModal}
        className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/60 px-5"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className={`flex flex-col justify-between rounded-xl bg-white px-[16px] pb-[20px] pt-[24px] gap-x-[8px]`}
        >
          <Text className="px-2 text-lg font-semibold text-emphasizedFont">신고사유</Text>
          <View className="flex flex-row flex-wrap gap-x-[7px] gap-y-[4px]">
            {reasonItems.map((item) => (
              <Pressable
                key={item.index}
                onPress={() => handleItem(item)}
                className="flex flex-row items-center"
              >
                <View className="p-[8px]">
                  {item.selected ? <SelectedRadioIcon /> : <RadioIcon />}
                </View>

                <Text
                  className={`text-14 font-500 leading-14 ${
                    item.selected ? 'text-mainColor' : 'text-basicFont'
                  }`}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>

          {reason === 'OTHER' && (
            <TextInput
              className="h-[160px] rounded-xl bg-colorBox p-[16px] pb-[20px]"
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해주세요"
            />
          )}

          <Pressable
            disabled={!canSubmit}
            onPress={() =>
              createReport({ memberId: memberId, source: source, reason: reason, content: content })
            }
            className={`${canSubmit ? 'bg-mainColor' : 'bg-[#C4C4C4]'} rounded-xl py-[17.5px] mt-[20px]`}
          >
            <Text className="text-16 font-600 leading-16 text-white text-center">신고하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModalComponent;
