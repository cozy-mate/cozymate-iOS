import React, { useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';

import { useMailAuthenticationStore } from '@/zustand/mail/mail';

import MajorSelectModalComponent from '../majorSelectModal';

const MajorSelectBoxComponent: React.FC = () => {
  const { mailState, setMailState } = useMailAuthenticationStore();

  const [isMajorSelectModalOpen, setIsMajorSelectModalOpen] = useState<boolean>(false);

  const handleMajor = (majorName: string) => {
    setMailState({ majorName: majorName });

    setIsMajorSelectModalOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          if (mailState.universityId === 0) {
            Alert.alert('학교를 먼저 선택해주세요!');
          } else {
            setIsMajorSelectModalOpen(true);
          }
        }}
        className="border border-disabledColor rounded-xl px-[20px] py-[18.5px] h-[80px] gap-y-[6px]"
      >
        <Text className="text-12 font-600 leading-12 text-colorFont">학과</Text>

        <Text
          className={`text-14 font-500 ${mailState.majorName !== '' ? 'text-basicFont' : 'text-disabledFont'}`}
        >
          {mailState.majorName !== '' ? mailState.majorName : '학과를 선택해주세요'}
        </Text>
      </Pressable>

      <MajorSelectModalComponent
        isVisible={isMajorSelectModalOpen}
        universityId={mailState.universityId}
        handleValue={handleMajor}
        closeModal={() => setIsMajorSelectModalOpen(false)}
      />
    </>
  );
};

export default MajorSelectBoxComponent;
