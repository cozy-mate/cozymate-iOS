import { Modal, Text, View } from 'react-native';

import { getPersona } from '@/constants/items/characterItem';
import { ChipItem } from '@/type/room';

interface MemberStatModalComponentProps {
  isVisible: boolean;
  closeModal: () => void;
  item: ChipItem;
}

const MemberStatModalComponent: React.FC<MemberStatModalComponentProps> = ({
  isVisible,
  closeModal,
  item,
}) => {
  const translateTime = (value: number) => {
    if (value === 0) return '오전 12시';
    if (value === 12) return '오후 12시';
    if (value < 12) return `오전 ${value}시`;
    return `오후 ${value - 12}시`;
  };

  const translateAnswer = (value: string | number) => {
    if (item.title === '기상시간' || item.title === '취침시간' || item.title === '소등시간')
      return translateTime(value as number);
    else if (item.title === '신청실') return `${value}인 1실`;
    else if (item.title === '출생년도') return `${value}년`;
    else return value;
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View
        onTouchEnd={closeModal}
        className="flex h-screen w-screen items-center justify-center bg-black/55"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-[334px] gap-y-[16px] rounded-xl bg-white p-[16px] pt-[20px]"
        >
          <Text
            className={`Semibold16 text-center ${item.color === 'blue' ? 'text-mainColor' : item.color === 'red' ? 'text-warningColor' : 'text-emphasizedFont'}`}
          >
            {item.title}
          </Text>

          <View>
            {item.memberList.map((member, index) => (
              <View
                key={member.memberDetail.memberId}
                className={`flex flex-row flex-wrap items-start gap-x-[8px] py-[12px] border-b border-b-[#F1F2F4] ${
                  index === 0 ? 'pt-[8px]' : ''
                } ${index === item.memberList.length - 1 ? 'pb-[8px] border-b-0' : ''}`}
              >
                {/* 왼쪽: 이미지 + 닉네임 */}
                <View className="flex flex-row items-center gap-x-[6px] shrink-0">
                  {getPersona(member.memberDetail.persona, 24, 24)}
                  <Text className="Medium14 text-emphasizedFont">
                    {member.memberDetail.nickname}
                  </Text>
                </View>

                {/* 오른쪽: 번역된 답변 */}
                {Object.entries(member.memberStat).map(([key, value]) => (
                  <Text
                    key={key}
                    lineBreakStrategyIOS="standard"
                    className="Medium14 text-colorFont py-[3.5px]"
                  >
                    {translateAnswer(value)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MemberStatModalComponent;
