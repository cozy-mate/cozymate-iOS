import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';
import Check from '@/assets/images/onBoard/check.svg';
import NotCheck from '@/assets/images/onBoard/notCheck.svg';
import BottomButton from '@/components/common/bottomButton';

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

  const handleTotal = () => {
    if (isUseTermsAgree && isInformationTermsAgree) {
      setIsUseTermsAgree(false);
      setIsInformationTermsAgree(false);
    } else {
      setIsUseTermsAgree(true);
      setIsInformationTermsAgree(true);
    }
  };

  const isAllAgree = isUseTermsAgree && isInformationTermsAgree;

  return (
    <Modal visible={isVisible} transparent={true}>
      <View onTouchEnd={closeModal} className="w-full h-full bg-black/70 justify-end">
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl px-[20px] pt-[32px] pb-[40px] gap-y-[15px]"
        >
          <View className="gap-y-[20px]">
            <Text className="text-emphasizedFont text-18 font-700 leading-18">
              최종 가입을 위해서는{'\n'}개인정보 활용 동의가 필요해요
            </Text>

            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-16 font-600 leading-16 text-basicFont my-[11.5px]">
                  약관 전체 동의
                </Text>
                <Pressable onPress={handleTotal} className="p-[8px]">
                  {isAllAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>

              <View className="h-[1px] bg-strokeColor rounded-sm my-[4px]" />

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-x-[8px]">
                  <Text className="text-14 font-500 leading-14 text-basicFont my-[12.5px]">
                    이용약관 동의 (필수)
                  </Text>
                  {/* TODO: 약관 보기 연결 */}
                  <Pressable className="flex flex-row items-center">
                    <Text className="text-12 font-500 leading-12 text-disabledFont">약관 보기</Text>
                    <GrayArrow />
                  </Pressable>
                </View>
                <Pressable onPress={() => setIsUseTermsAgree(!isUseTermsAgree)} className="p-[8px]">
                  {isUseTermsAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-x-[8px]">
                  <Text className="text-14 font-500 leading-14 text-basicFont my-[12.5px]">
                    개인정보 수집 및 이용동의 (필수)
                  </Text>
                  {/* TODO: 약관 보기 연결 */}
                  <Pressable className="flex flex-row items-center">
                    <Text className="text-12 font-500 leading-12 text-disabledFont">약관 보기</Text>
                    <GrayArrow />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => setIsInformationTermsAgree(!isInformationTermsAgree)}
                  className="p-[8px]"
                >
                  {isInformationTermsAgree ? <Check /> : <NotCheck />}
                </Pressable>
              </View>
            </View>
          </View>

          <View className="h-[54px]">
            <BottomButton buttonText="확인" disabled={!isAllAgree} onPress={confirmFunc} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TermsAgreeComponent;
