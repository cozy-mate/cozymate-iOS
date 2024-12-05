import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Keyboard, Pressable, TextInput } from 'react-native';

import { createReport } from '@server/api/report';

import SelectedIcon from '@assets/report/selectedItem.svg';
import NotSelectedIcon from '@assets/report/notSelectedItem.svg';

interface ReportModalProps {
  isVisible: boolean;
  memberId: number;
  source: string;
  closeModal: any;
}

interface ReasonItem {
  index: number;
  title: string;
  value: string;
  selected: boolean;
}

const ReportModal: React.FC<ReportModalProps> = ({ isVisible, memberId, source, closeModal }) => {
  const [reason, setReason] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const sendReport = async () => {
    try {
      const response = await createReport({
        memberId: memberId,
        source: source,
        reason: reason,
        ...(reason === 'OTHER' && { content: content }),
      });

      console.log(response.result);
      closeModal();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleBackgroundPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      closeModal();
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View
        onTouchEnd={handleBackgroundPress}
        className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-modalBack px-5"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="flex flex-col justify-between rounded-xl bg-white px-4 pb-5 pt-6"
        >
          <Text className="mb-2 px-2 text-lg font-semibold text-emphasizedFont">신고사유</Text>
          <View className="mb-2 flex flex-row flex-wrap">
            {reasonItems.map((item) => (
              <Pressable
                key={item.index}
                onPress={() => handleItem(item)}
                className="mb-1 mr-[7px] flex flex-row items-center"
              >
                {item.selected ? <SelectedIcon /> : <NotSelectedIcon />}
                <Text
                  className={`text-sm font-medium ${
                    item.selected ? 'text-main1' : 'text-basicFont'
                  }`}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
          {reason === 'OTHER' && (
            <TextInput
              className="h-40 rounded-xl bg-colorBox p-4 pb-5"
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해주세요"
            />
          )}
          <Pressable
            disabled={!canSubmit}
            onPress={sendReport}
            className={`${reason === 'OTHER' ? 'mt-4' : 'mt-3'} ${
              canSubmit ? 'bg-main1' : 'bg-[#C4C4C4]'
            } rounded-lg px-7 py-3.5`}
          >
            <Text className="text-center text-sm font-semibold text-white">신고</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
