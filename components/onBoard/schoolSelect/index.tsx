import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { useTracker } from '@/providers/TrackerProvider';
import { UniversityItem } from '@/type/university';
import { EventCategory, InputEvent } from '@/utils/ga/eventEnum';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';

import SchoolSelectModalComponent from '../schoolSelectModal';

const SchoolSelectBoxComponent: React.FC = () => {
  const { mailState, setMailState } = useMailAuthenticationStore();

  const { trackInput } = useTracker();

  const [isSchoolSelectModalOpen, setIsSchoolSelectModalOpen] = useState<boolean>(false);

  const handleUniversity = (item: UniversityItem) => {
    setMailState({ universityId: item.id, universityName: item.name, majorName: '' });

    setIsSchoolSelectModalOpen(false);

    trackInput(InputEvent.Univ, EventCategory.Onboarding, {
      universityName: item.name,
    });
  };

  return (
    <>
      <Pressable
        onPress={() => setIsSchoolSelectModalOpen(true)}
        className="border border-disabledColor rounded-xl px-[20px] py-[18.5px] h-[80px] gap-y-[6px]"
      >
        <Text className="text-12 font-600 leading-12 text-colorFont">학교</Text>

        <Text
          className={`text-14 font-500 ${mailState.universityName !== '' ? 'text-basicFont' : 'text-disabledFont'}`}
        >
          {mailState.universityName !== '' ? mailState.universityName : '학교를 선택해주세요'}
        </Text>
      </Pressable>

      <SchoolSelectModalComponent
        isVisible={isSchoolSelectModalOpen}
        handleValue={handleUniversity}
        closeModal={() => setIsSchoolSelectModalOpen(false)}
      />
    </>
  );
};

export default SchoolSelectBoxComponent;
