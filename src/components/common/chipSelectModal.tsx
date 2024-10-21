import React, { useRef, useState } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

interface ChipSelectModalProps {
  closeModal: () => void;
}

const ChipSelectModal: React.FC<ChipSelectModalProps> = ({ closeModal }) => {
  const modalRef = useRef<null>();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const [items, setItems] = useState([
    { index: 1, id: 'birthYear', name: '출생년도', select: false },
    { index: 2, id: 'admissionYear', name: '학번', select: false },
    { index: 3, id: 'major', name: '학과', select: false },
    { index: 4, id: 'acceptance', name: '합격여부', select: false },
    { index: 5, id: 'wakeUpTime', name: '기상시간', select: false },
    { index: 6, id: 'sleepingTime', name: '취침시간', select: false },
    { index: 7, id: 'turnOffTime', name: '소등시간', select: false },
    { index: 8, id: 'smoking', name: '흡연여부', select: false },
    { index: 9, id: 'sleepingHabit', name: '잠버릇', select: false },
    { index: 10, id: 'airConditioningIntensity', name: '에어컨', select: false },
    { index: 11, id: 'heatingIntensity', name: '히터', select: false },
    { index: 12, id: 'lifePattern', name: '생활패턴', select: false },
    { index: 13, id: 'intimacy', name: '친밀도', select: false },
    { index: 14, id: 'canShare', name: '물건공유', select: false },
    { index: 15, id: 'isPlayGame', name: '게임여부', select: false },
    { index: 16, id: 'isPhoneCall', name: '전화여부', select: false },
    { index: 17, id: 'studying', name: '공부여부', select: false },
    { index: 18, id: 'intake', name: '섭취여부', select: false },
    { index: 19, id: 'cleanSensitivity', name: '청결예민도', select: false },
    { index: 20, id: 'noiseSensitivity', name: '소음예민도', select: false },
    { index: 21, id: 'cleaningFrequency', name: '청소빈도', select: false },
    { index: 22, id: 'drinkingFrequency', name: '음주빈도', select: false },
    { index: 23, id: 'personality', name: '성격', select: false },
    { index: 24, id: 'mbti', name: 'MBTI', select: false },
  ]);

  return (
    <Modal transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-end bg-modalBack">
          <TouchableWithoutFeedback>
            <View className="flex h-3/5 flex-col justify-between rounded-t-[20px] bg-white pt-11">
              <CheckBoxContainer
                value={selectedChips}
                setValue={setSelectedChips}
                items={items}
                setItems={setItems}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChipSelectModal;
