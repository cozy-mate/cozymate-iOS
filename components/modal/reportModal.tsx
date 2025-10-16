import { useState } from 'react';
import { Keyboard, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';

import ReportXIcon from '@/assets/icons/reportX.svg';
import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedRadioIcon from '@/assets/images/room/selectedRadio.svg';
import { useCreateReport } from '@/hooks/report/report';

import CustomTextarea from '../common/customInput/customTextarea';
import LoadingComponent from '../common/loading';

interface ReasonItem {
  index: number;
  title: string;
  value: string;
}

interface ReportModalProps {
  isVisible: boolean;
  memberId: number;
  source: string;
  closeModal: any;
  isFake?: boolean;
}

const ReportModalComponent: React.FC<ReportModalProps> = ({
  isVisible,
  memberId,
  source,
  closeModal,
  isFake = false,
}) => {
  const [reason, setReason] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [reasonItems, setReasonItems] = useState<ReasonItem[]>([
    { index: 1, title: '음란성/선정성', value: 'OBSCENITY' },
    { index: 2, title: '욕설/인신공격', value: 'INSULT' },
    { index: 3, title: '영리목적/홍보성', value: 'COMMERCIAL' },
    { index: 4, title: '기타', value: 'OTHER' },
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

  const canSubmit =
    reason !== '' && (reason !== 'OTHER' || (content !== '' && content.length <= 200));

  const { mutateAsync: createReport, isPending } = useCreateReport();

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      {isPending && <LoadingComponent />}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/60 px-[20px] gap-y-[8px]">
          <View
            className={`flex flex-col justify-between rounded-xl bg-white px-[16px] pb-[20px] pt-[24px] gap-y-[8px]`}
          >
            <View className="flex flex-row items-center justify-between">
              <Text className="px-[8px] Semibold18 text-emphasizedFont">신고사유</Text>
              <Pressable
                onPress={() => {
                  closeModal();
                  setReason('');
                  setContent('');
                }}
                className="self-end p-[13px]"
              >
                <ReportXIcon />
              </Pressable>
            </View>

            <View className="flex flex-row flex-wrap gap-x-[7px] gap-y-[4px]">
              {reasonItems.map((item) => (
                <Pressable
                  key={item.index}
                  onPress={() => handleItem(item)}
                  className="flex flex-row items-center"
                >
                  <View className="p-[8px]">
                    {reason === item.value ? <SelectedRadioIcon /> : <RadioIcon />}
                  </View>

                  <Text
                    className={`Medium14 ${reason === item.value ? 'text-mainColor' : 'text-basicFont'}`}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>

            {reason === 'OTHER' && (
              <CustomTextarea
                value={content}
                handleValue={(e: string) => setContent(e)}
                placeholder="내용을 입력해주세요"
                height="h-[160px]"
              />
            )}

            <Pressable
              disabled={!canSubmit}
              onPress={() => {
                !isFake && createReport({
                  memberId: memberId,
                  source: source,
                  reason: reason,
                  content: content,
                });
                closeModal();
              }}
              className={`${canSubmit ? 'bg-mainColor' : 'bg-[#C4C4C4]'} rounded-xl py-[17.5px] mt-[20px]`}
            >
              <Text className="Semibold16 text-white text-center">신고하기</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReportModalComponent;
