import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';
import Check from '@/assets/images/onBoard/check.svg';
import NotCheck from '@/assets/images/onBoard/notCheck.svg';
import BottomButtonComponent from '@/components/common/bottomButton';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';

interface TermsAgreeComponentProps {
  isVisible: boolean;
  closeModal: () => void;
  confirmFunc: () => void;
}

const TermsAgreeComponent: React.FC<TermsAgreeComponentProps> = ({
  isVisible,
  closeModal,
  confirmFunc,
}) => {
  const [isUseTermsAgree, setIsUseTermsAgree] = useState<boolean>(false);
  const [isInformationTermsAgree, setIsInformationTermsAgree] = useState<boolean>(false);

  const { trackButton } = useTracker();

  const handleTotal = () => {
    trackButton(ButtonEvent.agree_all, EventCategory.onboarding4, {
      agree_all: isUseTermsAgree && isInformationTermsAgree,
    });
    if (isUseTermsAgree && isInformationTermsAgree) {
      setIsUseTermsAgree(false);
      setIsInformationTermsAgree(false);
    } else {
      setIsUseTermsAgree(true);
      setIsInformationTermsAgree(true);
    }
  };

  const handleUseTermsAgree = () => {
    setIsUseTermsAgree(!isUseTermsAgree);
    trackButton(ButtonEvent.agree_1, EventCategory.onboarding4, {
      agree_1: isUseTermsAgree,
    });
  };

  const handleInformationTermsAgree = () => {
    setIsInformationTermsAgree(!isInformationTermsAgree);
    trackButton(ButtonEvent.agree_2, EventCategory.onboarding4, {
      agree_2: isInformationTermsAgree,
    });
  };

  const isAllAgree = isUseTermsAgree && isInformationTermsAgree;

  return (
    <Modal visible={isVisible} transparent={true}>
      <View onTouchEnd={closeModal} className="w-full h-full bg-black/70 justify-end">
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl px-[20px] pt-[32px] pb-[120px] gap-y-[15px]"
        >
          <View className="gap-y-[20px]">
            <View className="gap-y-[6px]">
              <Text className="Bold18 text-emphasizedFont">cozymate와 함께하려면</Text>
              <Text className="Bold18 text-emphasizedFont">
                이용약관 및 개인정보 수집·이용에 동의해 주세요.
              </Text>
            </View>

            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="Semibold16 text-basicFont my-[11.5px]">약관 전체 동의</Text>
                <Pressable onPress={handleTotal} className="p-[8px]">
                  {isAllAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>

              <View className="h-[1px] bg-strokeColor rounded-sm my-[4px]" />

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-x-[8px]">
                  <Text className="Medium14 text-basicFont my-[12.5px]">이용약관 동의 (필수)</Text>
                  <Pressable
                    onPress={() =>
                      Linking.openURL(
                        'https://midi-effect-fab.notion.site/209b3552fe64800794eac92b71ee2b8e?source=copy_link',
                      )
                    }
                    className="flex flex-row items-center"
                  >
                    <Text className="Medium12 text-disabledFont">약관 보기</Text>
                    <GrayArrow />
                  </Pressable>
                </View>
                <Pressable onPress={handleUseTermsAgree} className="p-[8px]">
                  {isUseTermsAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-x-[8px]">
                  <Text className="Medium14 text-basicFont my-[12.5px]">
                    개인정보 수집 및 이용동의 (필수)
                  </Text>
                  <Pressable
                    onPress={() =>
                      Linking.openURL(
                        'https://midi-effect-fab.notion.site/209b3552fe6480358259fbfdcf828f78?source=copy_link',
                      )
                    }
                    className="flex flex-row items-center"
                  >
                    <Text className="Medium12 text-disabledFont">약관 보기</Text>
                    <GrayArrow />
                  </Pressable>
                </View>

                <Pressable onPress={handleInformationTermsAgree} className="p-[8px]">
                  {isInformationTermsAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <BottomButtonComponent
          buttonText="확인"
          disabled={!isAllAgree}
          color={isAllAgree ? 'BLUE' : 'GRAY'}
          onPress={confirmFunc}
        />
      </View>
    </Modal>
  );
};

export default TermsAgreeComponent;
